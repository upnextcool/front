<template>
  <v-navigation-drawer
    absolute
    color="darker"
    dark
    permanent
    width="100%"
    touchless
  >
    <template v-slot:prepend>
      <v-toolbar class="elevation-0" color="transparent" fixed>
        <v-btn icon to="/" x-large>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <app-qr-scanner @code="codeScanned"></app-qr-scanner>
      </v-toolbar>
    </template>
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
            <h2 class="text-h3 text-uppercase font-weight-thin">upnext</h2>
            <p class="ma-10 text-left">
              Enter the party code and a nickname that will help people
              recognize you.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-slot:append>
      <v-form @submit.prevent="null" autocomplete="off" ref="form">
        <v-container class="ma-0 pa-0" fluid>
          <v-col class="ma-0 pa-0" cols="12">
            <v-row align="center" class="ma-0 pa-0 px-3" justify="center">
              <v-col class="ma-0 pa-0" cols="12" lg="4">
                <v-row align="center" class="ma-0 pa-0" justify="center">
                  <v-text-field
                    autofocus
                    class="ma-0"
                    label="Party code"
                    maxlength="4"
                    outlined
                    v-model="code"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row align="center" class="ma-0 pa-0 px-3" justify="center">
              <v-col class="ma-0 pa-0" cols="12" lg="4">
                <v-row align="center" class="ma-0 pa-0" justify="center">
                  <v-text-field
                    class="ma-0"
                    label="Your nickname"
                    maxlength="20"
                    outlined
                    v-model="nickname"
                  />
                </v-row>
              </v-col>
            </v-row>
            <v-row class="ma-0 pa-0 ma-0">
              <v-btn
                block
                class="ma-0 pa-0 elevation-0"
                color="primary"
                height="100"
                tile
                x-large
                @click="join"
              >
                Join
              </v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>
    </template>
  </v-navigation-drawer>
</template>

<script>
import AppQrScanner from "./qr-scan";
import { JOIN_PARTY } from "@/graphql";

export default {
  components: { AppQrScanner },
  data: () => ({
    code: null,
    nickname: null,
  }),
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/app");
    }
  },
  methods: {
    codeScanned(code) {
      this.code = code;
    },
    async join() {
      this.$apollo
        .mutate({
          mutation: JOIN_PARTY,
          variables: {
            username: this.nickname,
            partyCode: this.code,
            userId: localStorage.getItem("session"),
          },
        })
        .then(({ data }) => {
          console.log(data.token);
          localStorage.setItem("token", data.token);
          location.href = "/app";
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    },
  },
};
</script>

<style scoped></style>
