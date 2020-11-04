<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from '@/layout'
// import { getTokens } from '@/utils/auth'
export default {
  name: "App",
  components: {
    layout
  },
  created(){
    // 获取token
    let querytoken = this.$cookie.get('Authorization');
    // console.log('querytoken :>> ', querytoken);
    localStorage.setItem('token',querytoken)
    this.$store.commit('set_token',querytoken)
    // 获取权限集合
    this.getPermission()
  },
  methods: {
    // 获取权限数据集合
    getPermission() { 
      // 定义有哪些权限
      let perms = [
        'Security.Visitor.Point.Search',
        'Security.Visitor.Point.Add',
        'Security.Visitor.Point.Delete',
        'Security.Visitor.Point.JoinRole',
        'Security.Visitor.Point.SearchByCode',
        'Security.Visitor.Point.SearchPower',
        'Security.Visitor.Point.Detail',
        'Security.Visitor.Point.Edit',
        'Security.Visitor.Management.Search',
        'Security.Visitor.Management.Delete',
        'Security.Visitor.Management.Detail',
        'Security.Visitor.Management.Leave',
        'Security.Visitor.Management.Check',
        'Security.Visitor.Register.Add',
        'Security.Vehicle.Management.Search',
        'Security.Vehicle.Management.Delete',
        'Security.Vehicle.Management.Edit',
        'Security.Vehicle.Management.Detail',
        'Security.Vehicle.Management.SearchAll',
        'Security.Vehicle.Register.Add',
        'Security.Vehicle.Use.Search',
        'Security.Vehicle.Use.Add',
        'Security.Vehicle.Use.Edit',
        'Security.Vehicle.Use.Delete',
        'Security.Vehicle.Use.Detail'

      ];
      // 把权限集合提交到 actions 中的 SET_PERMISSION 函数
      this.$store.dispatch("SET_PERMISSION",perms);
    }
  }
};
</script>
<style>

</style>
