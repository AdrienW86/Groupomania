<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(
      rgba(255, 254, 254, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("./assets/wall.jpg") no-repeat;
  background-size: cover;
}
</style>
