<template>
  <v-text-field
    v-model="filterMin"
    type="number"
    label="min confidence"
    outlined
    hide-details
    dense
    class="pa-1"
  ></v-text-field>
</template>

<script>
import { STORE_ACTIONS } from "../../store";
export default {
  computed: {
    filterMin: {
      get() {
        return this.$store.state.filterMin;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_FILTER_MIN, val);
      },
    },
  },
};
</script>

<style>
</style>