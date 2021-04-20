<template>
  <v-sheet
    class="v-sheet--offset mx-auto"
    color="grey darken-3"
    elevation="12"
    max-width="calc(50% - 32px)"
  >
    <v-sparkline
      :value="compares"
      color="white"
      line-width="1"
      padding="16"
    ></v-sparkline>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    compares: {
      get() {
        let sorted = this.$store.state.compares.sort((a,b) => { return a.confidence - b.confidence}).map(m => {
            return parseFloat(m.confidence)
        })
        if(sorted.length ==0) sorted.push(0);
        return sorted;
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