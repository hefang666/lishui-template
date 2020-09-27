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
  created(){
    let querytoken = this.getUrl('token');
    localStorage.setItem('token',querytoken)
    this.$store.commit('set_token',querytoken)
  },
  methods: {
    // 获取地址栏参数
    getUrl(name) {
      let after = window.location.search;
      // key存在先通过search取值如果取不到就通过hash来取
      after = after.substr(1) || window.location.hash.split('?')[1];
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      if (after) {
        const r = after.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      } else {
        return null;
      }
    }
  }
};
</script>
<style>

</style>
