<template>
  <v-main>
    <v-toolbar flat color="transparent">
      <h1 class="text-h4 font-weight-light ellipsis">Queue</h1>
      <v-spacer></v-spacer>
      <app-queue-menu />
    </v-toolbar>
    <v-list dense v-if="queue" color="transparent" class="ma-0 pa-0">
      <template v-for="(item, index) in sortedQueue">
        <app-vote-dialog :key="index" :item="item" />
      </template>
    </v-list>
    <v-list dense v-else color="transparent" class="ma-0 pa-0">
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
import AppQueueMenu from "./queue-menu";

export default {
  components: { AppQueueMenu, AppVoteDialog },
  data: () => ({
    queue: null,
  }),
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
      pollInterval: 3000,
    },
  },
};
</script>
