<template>
  <v-text-field
    v-model="filterName"
    label="search"
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
    filterName: {
      get() {
        return this.$store.state.filterName;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_FILTER_NAME, val);
      },
    },
  },
};
</script>

<style>
</style>