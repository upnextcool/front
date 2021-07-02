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
      <v-overlay :value="loading" opacity="0.8" color="black">
        <v-progress-circular
          indeterminate
          size="150"
          color="primary"
        ></v-progress-circular>
      </v-overlay>
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
            <v-icon color="primary" size="80">mdi-music-note-plus</v-icon>
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
      <v-form
        @submit.prevent="null"
        autocomplete="off"
        ref="form"
        v-model="valid"
      >
        <v-container class="ma-0 pa-0" fluid>
          <v-col class="ma-0 pa-0" cols="12">
            <v-row align="center" class="ma-0 pa-0 px-3" justify="center">
              <v-col class="ma-0 pa-0" cols="12" lg="4">
                <v-row align="center" class="ma-0 pa-0" justify="center">
                  <v-text-field
                    class="ma-0"
                    label="Party code"
                    maxlength="4"
                    outlined
                    v-model="code"
                    :rules="[rules.required, rules.requiredLength]"
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
                    :rules="[rules.required, rules.limit, rules.minimum]"
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
                :disabled="invalid"
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
    valid: null,
    rules: {
      required: (value) => !!value || "Required",
      limit: (value) =>
        (value ? value.length : 0) <= 20 || "Nickname less than 20 chars",
      minimum: (value) =>
        (value ? value.length : 0) > 1 || "Nickname 2 or more chars",
      requiredLength: (value) =>
        (value ? value.length : 0) === 4 || "Party code is 4 chars long",
    },
    loading: false,
  }),
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/app");
    }
    if (
      this.$route.query &&
      this.$route.query.c &&
      this.$route.query.c.length === 4
    ) {
      this.code = this.$route.query.c;
    }
  },
  computed: {
    invalid() {
      return !this.valid;
    },
  },
  methods: {
    codeScanned(code) {
      this.code = code;
    },
    async join() {
      this.loading = true;
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
          localStorage.setItem("token", data.token);
          location.href = `${this.$frontUrl}app`;
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
