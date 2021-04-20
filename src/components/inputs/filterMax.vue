<template>
  <v-text-field
    v-model="filterMax"
    type="number"
    label="max confidence"
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
    filterMax: {
      get() {
        return this.$store.state.filterMax;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_FILTER_MAX, val);
      },
    },
  },
};
</script>

<style>
</style>