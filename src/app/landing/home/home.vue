<template>
  <v-navigation-drawer
    absolute
    color="darker"
    dark
    permanent
    width="100%"
    touchless
  >
    <template v-slot:default>
      <v-container class="fill-height ma-0 pa-0" fluid>
        <v-row align="center" class="ma-0 pa-0" justify="center">
          <v-col
            align="center"
            class="ma-0 pa-0"
            cols="12"
            justify="center"
            lg="6"
            md="8"
            sm="8"
          >
            <v-icon color="primary" size="120">mdi-music-note-plus</v-icon>
            <h1 class="text-h2 text-uppercase font-weight-thin">UpNext</h1>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-slot:append>
      <v-btn
        block
        elevation="0"
        color="primary"
        height="150"
        tile
        to="/join"
        x-large
      >
        <span>Join a Party</span>
      </v-btn>
      <v-btn
        block
        elevation="0"
        color="secondary"
        height="150"
        tile
        to="/start"
        x-large
      >
        <span>Start a Party</span>
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {};
</script>

<style scoped></style>
