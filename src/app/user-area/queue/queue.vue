<template>
  <v-main>
    <v-app-bar fixed elevate-on-scroll color="darker">
      <h1 class="text-h4 font-weight-light ellipsis">Queue</h1>
      <v-spacer></v-spacer>
      <app-queue-menu />
    </v-app-bar>
    <v-container v-if="queue && queue.length === 0" fluid class="fill-height">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-sheet class="text-center" elevation="0" color="transparent">
            <v-icon color="primary" size="120">mdi-emoticon-sad-outline</v-icon>
            <h1 class="text-h4 font-weight-light my-3">Empty Queue</h1>
            <v-btn to="/app/search" text small>
              <v-icon left>mdi-magnify</v-icon>
              Search for music
            </v-btn>
          </v-sheet>
        </v-row>
      </v-col>
    </v-container>
    <v-list dense v-if="queue" color="transparent" class="ma-0 pa-0 mt-16">
      <template v-for="(item, index) in sortedQueue">
        <app-vote-dialog :key="index" :item="item" />
      </template>
    </v-list>
    <v-list dense v-else color="transparent" class="ma-0 pa-0 mt-16">
      <v-skeleton-loader
        tile
        v-for="(_, index) in Array(3).fill(0)"
        :key="index"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
    </v-list>
  </v-main>
</template>

<script>
import { QUEUE } from "../../../graphql";
import AppVoteDialog from "./vote-dialog";
import AppQueueMenu from "./menu";

export default {
  components: { AppQueueMenu, AppVoteDialog },
  data: () => ({
    queue: null,
  }),
  mounted() {
    this.queue = null;
  },
  computed: {
    sortedQueue() {
      return this.queue
        .map((q) => ({ ...q, score: this.processVotes(q.votes) }))
        .sort((a, b) => b.score - a.score);
    },
  },
  methods: {
    processVotes(votes) {
      return votes
        .map((e) => (e.type === "UP_VOTE" ? 1 : -1))
        .reduce((p, c) => p + c, 0);
    },
  },
  apollo: {
    queue: {
      query: QUEUE,
      pollInterval: 1000,
    },
  },
};
</script>
