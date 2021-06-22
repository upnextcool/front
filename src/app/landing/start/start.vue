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
            <p class="ma-10">
              Let's get the party started! <br /><br />Enter a name for the
              party, and a name for yourself.
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
                    label="Party name"
                    maxlength="20"
                    outlined
                    v-model="partyName"
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
                @click="startParty"
                block
                class="ma-0 pa-0 elevation-0"
                color="primary"
                height="100"
                tile
                x-large
              >
                Start
              </v-btn>
            </v-row>
          </v-col>
        </v-container>
      </v-form>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { JOIN_PARTY, START_AUTH, START_PARTY } from "../../../graphql";

export default {
  data: () => ({
    partyName: "",
    nickname: "",
  }),
  mounted() {
    if (localStorage.getItem("token")) {
      this.$router.push("/app");
    }
  },
  methods: {
    async startParty() {
      const { data: partyData } = await this.$apollo.mutate({
        mutation: START_PARTY,
        variables: {
          partyName: this.partyName,
        },
      });
      console.log(partyData);
      const { data: memberData } = await this.$apollo.mutate({
        mutation: JOIN_PARTY,
        variables: {
          username: this.nickname,
          partyCode: partyData.party.code,
          userId: localStorage.getItem("session"),
        },
      });
      localStorage.setItem("token", memberData.token);
      const { data: authData } = await this.$apollo.mutate({
        mutation: START_AUTH,
        variables: {
          userId: localStorage.getItem("session"),
          partyId: partyData.party.id,
        },
      });
      console.log(authData);
      location.href = authData.url;
    },
  },
};
</script>

<style scoped></style>
