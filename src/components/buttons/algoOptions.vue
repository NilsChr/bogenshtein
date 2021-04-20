<template>
  <v-layout>
    <v-flex xs4>
      <v-checkbox
        v-model="onlyFirstLastName"
        label="Check only first and last name"
      ></v-checkbox>
    </v-flex>
    <v-flex xs4>
      <v-checkbox v-model="makeLowerCase" label="Ignore Case"></v-checkbox>
    </v-flex>
    <v-flex xs4>
      <v-checkbox
        v-model="replaceSpecials"
        label="Replace Special Characters"
      ></v-checkbox>
    </v-flex>
    <v-flex xs4>
      <v-checkbox v-model="removeVowels" label="Remove Vowels"></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
import { STORE_ACTIONS } from "../../store";
export default {
  computed: {
    onlyFirstLastName: {
      get() {
        return this.$store.state.onlyFirstLastName;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_ONLY_FIRST_LAST_NAME, val);
        this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
      },
    },
    makeLowerCase: {
      get() {
        return this.$store.state.makeLowerCase;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_MAKE_LOWER_CASE, val);
        this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
      },
    },
    replaceSpecials: {
      get() {
        return this.$store.state.replaceSpecials;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_REPLACE_SPECIALS, val);
        this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
      },
    },
    removeVowels: {
      get() {
        return this.$store.state.removeVowels;
      },
      set(val) {
        this.$store.commit(STORE_ACTIONS.SET_REMOVE_VOWELS, val);
        this.$store.dispatch(STORE_ACTIONS.RECALCULATE);
      },
    },
  },
};
</script>

<style>
</style>