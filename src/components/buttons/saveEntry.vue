<template>
  <v-btn color="secondary" class="pa-4 ma-1 mt-4" depressed @click="saveEntry"
    >Save</v-btn
  >
</template>

<script>
import { STORE_ACTIONS } from "../../store";
export default {
  methods: {
    saveEntry() {
      if (this.nameA == "" || this.nameB == "") return;
      let data = {
        nameA: this.nameA,
        nameB: this.nameB,
        distance: 0,
        confidence: 0,
      };
      this.compares = [...this.compares, data];
      this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
    },
  },
  computed: {
    nameA() {
      return this.$store.state.nameA;
    },
    nameB() {
      return this.$store.state.nameB;
    },
    compares: {
      get() {
        return this.$store.state.compares;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_COMPARES, val);
      },
    },
  },
};
</script>

<style>
</style>