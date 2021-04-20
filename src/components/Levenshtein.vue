<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs6>
        <distribution />
      </v-flex>
      <v-flex xs6>
        <algo-options />
      </v-flex>
      <v-flex xs12>
        <v-layout justify-space-between>
          <name-a />
          <name-b />
          <save-entry />
        </v-layout>
      </v-flex>
      <v-flex xs12 class="mb-5">
        <v-layout justify-space-around>
          <v-flex xs3>Distance: {{ editDistance }}</v-flex>
          <v-flex xs3> Confidence: {{ confidence }}% </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 class="pa-2">
        <generate-names />
      </v-flex>
      <v-flex xs3>
        <filter-name />
      </v-flex>
      <v-flex xs3>
        <filter-min />
      </v-flex>
      <v-flex xs3>
        <filter-max />
      </v-flex>
      <v-flex xs3 class="pa-2 pt-3">
        Showing {{ filteredCompares.length }} / {{ compares.length }} rows ({{
          displayPercentage
        }}%)
      </v-flex>
      <v-flex xs12>
        <datatable />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { STORE_ACTIONS } from "../store/index";
import GenerateNames from "./buttons/generateNames.vue";
import AlgoOptions from "./buttons/algoOptions.vue";
import Distribution from "./stats/distribution.vue";
import Datatable from "./Datatable.vue";
import FilterName from "./inputs/filterName.vue";
import FilterMin from "./inputs/filterMin.vue";
import FilterMax from "./inputs/filterMax.vue";
import NameA from "./inputs/nameA.vue";
import NameB from "./inputs/nameB.vue";
import SaveEntry from './buttons/saveEntry.vue';

export default {
  components: {
    GenerateNames,
    AlgoOptions,
    Distribution,
    Datatable,
    FilterName,
    FilterMin,
    FilterMax,
    NameA,
    NameB,
    SaveEntry,
  },
  data() {
    return {};
  },
  methods: {
    checkDistance() {
      this.$store.dispatch(STORE_ACTIONS.CHECK_DISTANCE);
    }
  },
  created() {},
  computed: {
    displayPercentage() {
      let value = (
        (this.filteredCompares.length / this.compares.length) *
        100
      ).toFixed(2);
      if (isNaN(value)) return 0;
      return value;
    },
    filteredCompares() {
      return this.$store.getters.filteredCompares;
    },
    compares: {
      get() {
        return this.$store.state.compares;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_COMPARES, val);
      },
    },
    editDistance: {
      get() {
        return this.$store.state.editDistance;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_EDIT_DISTANCE, val);
      },
    },
    confidence: {
      get() {
        return this.$store.state.confidence;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_CONFIDENCE, val);
      },
    },
    nameA: {
      get() {
        return this.$store.state.nameA;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_NAME_A, val);
      },
    },
    nameB: {
      get() {
        return this.$store.state.nameB;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_NAME_B, val);
      },
    },
  }
};
</script>

<style>
.list-entry {
  border-top: 1px solid rgb(206, 206, 206);
}
.closer:hover {
  cursor: pointer;
}
</style>