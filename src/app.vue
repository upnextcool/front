<template>
  <transition name="scroll-y-transition">
    <router-view></router-view>
  </transition>
</template>

<script>
import { REGISTER_FINGERPRINT } from "@/graphql";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default {
  name: "app",
  async mounted() {
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
