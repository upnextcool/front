<template>
  <v-main>
    <v-container v-if="recommendations" class="px-4" fluid>
      <v-col cols="12">
        <v-row class="pb-4" justify="center" align="center">
          <h1 class="text-h4 font-weight-light ellipsis">Popular</h1>
          <v-spacer></v-spacer>
        </v-row>
        <v-row class="mt-4">
          <div class="playlist-grid-container">
            <v-card
              tile
              max-width="28vw"
              :key="item.id"
              elevation="0"
              color="transparent"
              class="mb-2"
              v-for="item in recommendationPlaylists"
              :to="`/app/view/playlist/${item.id}`"
            >
              <v-img class="rounded-xl" :src="item.images[0].url"></v-img>
              <p class="text-caption py-2">{{ item.name }}</p>
            </v-card>
          </div>
        </v-row>
      </v-col>
    </v-container>
  </v-main>
</template>

<script>
import { SPOTIFY_RECOMMENDATIONS } from "../../../graphql";

export default {
  name: "app-popular-playlists",
  data: () => ({
    recommendations: null,
  }),
  computed: {
    recommendationPlaylists() {
      return this.recommendations.playlists.items;
    },
  },
  apollo: {
    recommendations: {
      query: SPOTIFY_RECOMMENDATIONS,
    },
  },
};
</script>

<style scoped>
.playlist-grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  justify-items: center;
  align-items: center;
}
</style>
