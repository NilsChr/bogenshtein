<template>
  <v-text-field
    v-model="nameA"
    @input="checkDistance"
    outlined
    hide-details
    dense
    class="pa-4"
  ></v-text-field>
</template>

<script>
import { STORE_ACTIONS } from "../../store";
export default {
  methods: {
    checkDistance() {
      this.$store.dispatch(STORE_ACTIONS.CHECK_DISTANCE);
    },
  },
  computed: {
    nameA: {
      get() {
        return this.$store.state.nameA;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_NAME_A, val);
      },
    },
  },
};
</script>

<style>
</style>