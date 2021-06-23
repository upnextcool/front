<template>
  <v-main>
    <v-app-bar fixed elevate-on-scroll color="darker">
      <h1 class="text-h4 font-weight-light ellipsis">History</h1>
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-main>
</template>

<script>
import { HISTORY } from "../../../graphql";

export default {
  name: "history",
  data: () => ({
    history: null,
  }),
  apollo: {
    history: {
      query: HISTORY,
    },
  },
};
</script>
