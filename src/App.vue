<template>
  <v-app>
    <v-app-bar app color="secondary" dark style="z-index: 1;">
      <div class="d-flex align-center">
          <img class="mr-3" :src="require('./assets/logo_2.svg')" height="60"/>

        <label> Bogenshtein </label>

      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Levenshtein />
    </v-main>
  </v-app>
</template>

<script>
import Levenshtein from "./components/Levenshtein";

export default {
  name: "App",

  components: {
    Levenshtein,
  },

  data: () => ({
    //
  }),
};
</script>
