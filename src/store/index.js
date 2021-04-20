import Vue from "vue";
import Vuex from "vuex";
import levenstein from "../services/levenshtein/levenshtein";

Vue.use(Vuex);

export const STORE_ACTIONS = {
  SET_NAME_A: "SET_NAME_A",
  SET_NAME_B: "SET_NAME_B",
  SET_COMPARES: "SET_COMPARES",
  SET_EDIT_DISTANCE: "SET_EDIT_DISTANCE",
  SET_CONFIDENCE: "SET_CONFIDENCE",
  SET_ONLY_FIRST_LAST_NAME: "SET_ONLY_FIRST_LAST_NAME",
  SET_MAKE_LOWER_CASE: "SET_MAKE_LOWER_CASE",
  SET_REPLACE_SPECIALS: "SET_REPLACE_SPECIALS",
  SET_REMOVE_VOWELS: "SET_REMOVE_VOWELS",
  SET_FILTER_NAME: 'SET_FILTER_NAME',
  SET_FILTER_MIN: 'SET_FILTER_MIN',
  SET_FILTER_MAX: 'SET_FILTER_MAX',
  CHECK_DISTANCE: "CHECK_DISTANCE",
  RECALCULATE: "RECALCULATE",
};

export default new Vuex.Store({
  state: {
    nameA: "",
    nameB: "",
    compares: [],
    editDistance: null,
    confidence: 0,
    onlyFirstLastName: false,
    makeLowerCase: false,
    replaceSpecials: false,
    removeVowels: false,
    filterName: "",
    filterMin: 0,
    filterMax: 100,
  },
  getters: {
    filteredCompares: (state) => {
      let min = parseFloat(state.filterMin) || 0;
      let max = parseFloat(state.filterMax) || 100;

      return state.compares.filter(
        (d) =>
          d.nameA.toLowerCase().includes(state.filterName.toLowerCase()) &&
          d.confidence >= min &&
          d.confidence <= max
      );
    },
  },
  mutations: {
    SET_NAME_A(state, nameA) {
      state.nameA = nameA;
    },
    SET_NAME_B(state, nameB) {
      state.nameB = nameB;
    },
    SET_COMPARES(state, compares) {
      state.compares = compares;
    },
    SET_EDIT_DISTANCE(state, editDistance) {
      state.editDistance = editDistance;
    },
    SET_CONFIDENCE(state, confidence) {
      state.confidence = confidence;
    },
    SET_ONLY_FIRST_LAST_NAME(state, onlyFirstLastName) {
      state.onlyFirstLastName = onlyFirstLastName;
    },
    SET_MAKE_LOWER_CASE(state, makeLowerCase) {
      state.makeLowerCase = makeLowerCase;
    },
    SET_REPLACE_SPECIALS(state, replaceSpecials) {
      state.replaceSpecials = replaceSpecials;
    },
    SET_REMOVE_VOWELS(state, removeVowels) {
      state.removeVowels = removeVowels;
    },
    SET_FILTER_NAME(state, filterName) {
      state.filterName = filterName;
    },
    SET_FILTER_MIN(state, filterMin) {
      state.filterMin = filterMin;
    },
    SET_FILTER_MAX(state, filterMax) {
      state.filterMax = filterMax;
    },
  },
  actions: {
    RECALCULATE({ state, commit, dispatch }) {
      dispatch(STORE_ACTIONS.CHECK_DISTANCE);

      let opts = {
        onlyFirstLastName: state.onlyFirstLastName,
        makeLowerCase: state.makeLowerCase,
        replaceSpecials: state.replaceSpecials,
        removeVowels: state.removeVowels,
      };
      function checkDistanceData(data) {
        let nameA = data.nameA;
        let nameB = data.nameB;

        return levenstein(nameA, nameB, opts);
      }

      console.log("recalculated");
      state.compares.forEach((c) => {
        c.distance = checkDistanceData(c);
        c.confidence = checkConfidence(c.nameA, c.nameB, c.distance, opts);
      });
    },
    CHECK_DISTANCE({ state, commit }) {
      let nameA = state.nameA.trim();
      let nameB = state.nameB.trim();
      let opts = {
        onlyFirstLastName: state.onlyFirstLastName,
        makeLowerCase: state.makeLowerCase,
        replaceSpecials: state.replaceSpecials,
        removeVowels: state.removeVowels,
      };

      let editDistance = levenstein(nameA, nameB, opts);
      commit(STORE_ACTIONS.SET_EDIT_DISTANCE, editDistance);
      commit(
        STORE_ACTIONS.SET_CONFIDENCE,
        checkConfidence(
          state.nameA,
          state.nameB,
          editDistance,
          opts.onlyFirstLastName
        )
      );
    },
  },
  modules: {},
});

function checkConfidence(nameA, nameB, distance, onlyFirstLastName) {
  if (!nameA || distance === undefined) return 0;
  let name = nameA;
  if (onlyFirstLastName) {
    let n = name.split(" ");
    name = n[0] + " " + n[n.length - 1];
  }
  let confidence = ((1 - distance / name.trim().length) * 100).toFixed(2);

  if (name.split(" ").length != 2) {
    confidence *= 0.5;
  }

  if (confidence < 0) confidence = 0.0;
  return confidence || 0.0;
}
