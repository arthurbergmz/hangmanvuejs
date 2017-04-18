<style lang="scss">
@import "./style/_build.scss";
</style>

<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'app'
}
</script>
