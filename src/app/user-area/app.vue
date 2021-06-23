<template>
  <v-app>
    <router-view></router-view>
    <app-bottom-nav />
  </v-app>
</template>

<script>
import AppBottomNav from "./shared/bottom-nav";
import { VALID_TOKEN } from "../../graphql";

export default {
  components: { AppBottomNav },
  watch: {
    validToken(val) {
      if (val === false) {
        this.$router.push("/logout");
      }
    },
  },
  apollo: {
    validToken: {
      query: VALID_TOKEN,
      pollInterval: 60 * 1000,
      error(err) {
        const cleanError = JSON.parse(JSON.stringify(err));
        if (cleanError.message.includes("Access denied")) {
          this.$router.push("/logout");
        }
      },
    },
  },
};
</script>
