<template>
  <v-data-table
    :headers="headers"
    :items="filteredCompares"
    class="elevation-1"
    :hide-default-footer="true"
    disable-pagination
  >
    <template v-slot:items="props">
      <td class="text-xs-right">{{ props.item.nameA }}</td>
      <td class="text-xs-right">{{ props.item.nameB }}</td>
      <td class="text-xs-right">{{ props.item.distance }}</td>
      <td class="text-xs-right">{{ props.item.confidence }}%</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "nameA",
          align: "left",
          sortable: false,
          value: "nameA",
        },
        {
          text: "nameB",
          align: "left",
          sortable: false,
          value: "nameB",
        },
        { text: "distance", value: "distance", sortable: true },
        { text: "confidence", value: "confidence", sortable: true },
      ],
    };
  },
  methods: {},
  computed: {
    filteredCompares() {
      return this.$store.getters.filteredCompares;
    },
  },
};
</script>

<style>
</style>