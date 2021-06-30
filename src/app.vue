<template>
  <router-view></router-view>
</template>

<script>
import { CONFIG, REGISTER_FINGERPRINT } from "@/graphql";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default {
  name: "app",
  async mounted() {
    const { data } = await this.$apollo.query({
      query: CONFIG,
      fetchPolicy: "no-cache",
    });
    const version = data.config.version;
    const storedVersion = Number.parseInt(localStorage.getItem("version"));
    if (storedVersion && storedVersion < version) {
      location.href = `${location.href}`;
    }
    localStorage.setItem("version", version);

    const fpAgent = await FingerprintJS.load();
    const result = await fpAgent.get();
    const x = await this.$apollo.mutate({
      mutation: REGISTER_FINGERPRINT,
      variables: {
        fingerprint: result.visitorId,
      },
    });
    localStorage.setItem("session", x.data.user.id);
  },
};
</script>

<style lang="scss">
@import "styles";
</style>
