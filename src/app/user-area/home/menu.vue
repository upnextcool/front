<template>
  <v-bottom-sheet v-if="party" overlay-opacity="0.95" v-model="sheet">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-sheet elevation="10" color="darker">
      <v-toolbar flat color="transparent">
        <h1 class="text-h5 font-weight-light ellipsis">{{ party.name }}</h1>
        <v-spacer></v-spacer>
        <h1
          class="text-h5 font-weight-light"
          style="
            font-family: Consolas, monospace !important;
            letter-spacing: 0.25em !important;
          "
        >
          {{ party.code }}
        </h1>
      </v-toolbar>
      <v-divider></v-divider>
      <v-img></v-img>
      <v-list color="transparent">
        <v-list-item @click="share">
          <v-list-item-icon>
            <v-icon>mdi-share</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Share party link</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-dialog max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon>
                <v-icon>mdi-qrcode</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Show party QR code</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-card
            ><v-img
              :src="`${$apiUrl}/party/qr.png?code=${party.code}&back=${qrBack}&front=${qrFront}`"
              alt="qrcode"
              class="elevation-0"
              max-width="400"
            ></v-img
          ></v-card>
        </v-dialog>
        <v-list-item to="/app/users">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-run</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Leave party</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
import { PARTY } from "../../../graphql";

export default {
  name: "app-home-menu",
  data: () => ({
    sheet: false,
    party: null,
    qrBack: "ffffff",
    qrFront: "000000",
  }),
  methods: {
    async share() {
      const shareData = {
        title: this.party.name,
        text: "Join the party!",
        url: `${this.$frontUrl}join?c=${this.party.code}`,
      };
      await navigator.share(shareData);
    },
  },
  apollo: {
    party: {
      query: PARTY,
    },
  },
};
</script>
