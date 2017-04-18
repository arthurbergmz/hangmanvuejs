<style lang="scss">
#loading-screen {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    span {
        margin: 1vh;
        text-align: center;
        font-size: 1.65vh;
    }
}
</style>

<template>
  <div id="loading-screen">
      <p class="lazy-load"></p>
      <span>Loading...</span>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    this.fetchRoom()
  },
  methods: {
    fetchRoom () {
      setTimeout(() => {
        this.$router.push('play')
      }, (Math.floor(Math.random() * 1000)) + 500)
    }
  }
}
</script>
