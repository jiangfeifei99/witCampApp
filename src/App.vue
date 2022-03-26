<template>
  <div id="app">
    <!-- <router-view /> -->
    <keep-alive>
      <router-view v-if="$route.meta.nav" />
    </keep-alive>
    <router-view v-if="!$route.meta.nav" />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  beforeMount() {},
  components: {},
  created() {},
  methods: {},
  mounted() {},
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // width: 375px;
  // margin: 0 auto;
  // overflow: hidden;
   height: 100%;
}
 html,body{
  height: 100%;
}
</style>
