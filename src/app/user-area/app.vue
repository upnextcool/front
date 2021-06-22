<template>
  <v-app>
    <router-view></router-view>
    <app-bottom-nav />
  </v-app>
</template>

<script>
import AppBottomNav from "./shared/bottom-nav";

export default {
  components: { AppBottomNav },
};
</script>
