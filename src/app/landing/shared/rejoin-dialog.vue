<template>
  <v-dialog persistent v-model="dialog" width="450">
    <v-card color="darker">
      <v-toolbar dark>
        <v-toolbar-title>Already partying!</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="mt-6" v-if="alreadyJoined">
        Looks like you are already a part of a party! <br /><br />
        Party: {{ alreadyJoined.name }}<br />
        Code: {{ alreadyJoined.code }}<br />
        Your name: {{ alreadyJoined.nickName }}<br />
        <br />
        If you want to hop back in, just click on the "Get Back to the Party"
        button.<br /><br />
        <v-btn @click="getBackToTheParty" block color="primary"
          >Get Back to the Party</v-btn
        >
        <br />
        If you want to join a new party, click on "I understand" and join a
        party as normal... but be aware that you and your songs in your current
        party's queue will be deleted!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false" block>I Understand</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "app-rejoin-dialog",
  data: () => ({
    dialog: false,
    alreadyJoined: null,
  }),
  methods: {
    getBackToTheParty() {
      console.log("REJOIN");
    },
  },
};
</script>

<style scoped></style>
