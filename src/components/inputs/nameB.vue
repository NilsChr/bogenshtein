<template>
  <v-text-field
    v-model="nameB"
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
    nameB: {
      get() {
        return this.$store.state.nameB;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_NAME_B, val);
      },
    },
  },
};
</script>

<style>
</style>