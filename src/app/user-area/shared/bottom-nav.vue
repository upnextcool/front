<template>
  <v-bottom-navigation
    v-if="shown"
    class="elevation-4"
    :background-color="background"
    grow
    shift
    color="primary"
    app
  >
    <v-btn color="transparent" height="100%" to="/app/home">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn color="transparent" height="100%" to="/app/search">
      <span>Search</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn color="transparent" height="100%" to="/app/queue">
      <span>Queue</span>
      <v-icon>mdi-playlist-music</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: "app-bottom-nav",
  computed: {
    shown() {
      return this.$route.path !== "/app/cast";
    },
    background() {
      return this.$route.path === "/app/home" ? "transparent" : "black";
    },
  },
};
</script>
