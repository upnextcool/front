<template>
  <v-app dark>
    <v-main>
      <transition name="scroll-y-transition">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
