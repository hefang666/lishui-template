<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from '@/layout'
import {baseURL} from '@/api/api'
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


    // console.log(baseURL);
    // 上传及预览图片地址设置
    this.$store.state.upload.httpUrl = baseURL;
    // console.log(this.$store.state.upload);
  },
};
</script>
