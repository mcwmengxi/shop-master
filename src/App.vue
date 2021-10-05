<template>
  <div id="app">
    <router-view/>
    <FooterNav v-if="this.$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav.vue'

export default {
  name: 'App',
  components: {
    FooterNav
  },
  mounted(){
    this.$store.dispatch('getUserinfo')
  }
}
</script>

<style lang="scss" scoped>
body {
  line-height: 1;
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  height: 100%;
}
</style>
