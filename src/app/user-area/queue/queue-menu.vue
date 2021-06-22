<template>
  <v-bottom-sheet overlay-opacity="0.95" v-model="sheet">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-sheet elevation="10" color="darker">
      <v-list color="transparent">
        <v-list-item
          href="spotify:playlist:1ChAdx8ECHDTCbGwsYGWMF"
          target="_blank"
        >
          <v-list-item-icon>
            <v-icon>mdi-spotify</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>View playlist in Spotify</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>mdi-open-in-new</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list-item to="/app/history">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Playback history</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
export default {
  name: "app-queue-menu",
  data: () => ({
    sheet: false,
  }),
};
</script>
