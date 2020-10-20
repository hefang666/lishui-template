<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from '@/layout'
export default {
  name: "App",
  components: {
    layout
  },
  created() {
    let querytoken = this.$cookie.get('Authorization');
    console.log('querytoken :>> ', querytoken);
    localStorage.setItem('token',querytoken)
    this.$store.commit('add_token',querytoken)
  },
};
</script>
