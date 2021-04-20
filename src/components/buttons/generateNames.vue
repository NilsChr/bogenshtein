<template>
  <v-layout>
    <v-flex xs2 class="pa-1 mt-3">
      <v-text-field
        outlined
        type="number"
        label="Typo Chance %"
        dense
        hide-details
        v-model="typoChance"
      >
      </v-text-field>
    </v-flex>
    <v-flex xs8 class="pa-1">
      <v-btn
        color="secondary"
        class="pa-4 ma-1 mt-4"
        depressed
        @click="addRandomNames"
        >Generate 100</v-btn
      >
      <v-btn
        color="secondary"
        class="pa-4 ma-1 mt-4"
        depressed
        @click="clearNames100"
        >Clear names with 100%</v-btn
      >
      <v-btn
        color="secondary"
        class="pa-4 ma-1 mt-4"
        depressed
        @click="compares = []"
        >Clear names</v-btn
      >
    </v-flex>
  </v-layout>
</template>

<script>
import nameGenerator from "../../services/nameGenerator/nameGenerator";
import { STORE_ACTIONS } from "../../store";
export default {
    data() {
        return {
            typoChance: 0
        }
    },
  methods: {
    addRandomNames() {
      let names = nameGenerator.generateNamePairs(100, this.typoChance/100);
      this.compares = [
        ...this.compares,
        ...names.map((n) => {
          return {
            nameA: n.nameA,
            nameB: n.nameB,
            distance: 0,
            confidence: 0,
          };
        }),
      ];
      //this.recalculate();
    },
    clearNames100() {
      this.compares = this.compares.filter((n) => n.confidence < 100);
    },
  },
  computed: {
    compares: {
      get() {
        return this.$store.state.compares;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_COMPARES, val);
        this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
      },
    },
  },
};
</script>

<style>
</style>