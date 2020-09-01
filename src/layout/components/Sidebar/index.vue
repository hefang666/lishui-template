<template>
  <div @mouseenter="expandSidebar" @mouseleave="hideSideBar">
    <div class="sidebar-top">
      <span @click="changeSideBarStatus" class="snt-icon-list"></span>
      GIS巡检系统
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from "@/styles/variables.scss";
import { routes } from '@/router';

export default {
  data() {
    return {
      routes
    };
  },
  components: {
    SidebarItem
  },
  computed: {
    variables() {
      return variables;
    }
  },
  methods: {
    changeSideBarStatus () {
      var status = this.$store.state.sideBar.sideBarStatus;
      console.log(status)
      if(status) {
        status = 0;
      } else {
        status = 1;
      }
      this.$store.dispatch("sideBar/changeSideBarStatus", status);
    },
    expandSidebar () {
      var status = this.$store.state.sideBar.sideBarStatus;
      console.log(status)
      if(status == 1) {
          this.$store.dispatch("sideBar/changeSideBarStatus", 2);
      }
    },
    hideSideBar () {
      var status = this.$store.state.sideBar.sideBarStatus;
      if(status == 2) {
          this.$store.dispatch("sideBar/changeSideBarStatus", 1);
      }
    }
  }
};
</script>
<style lang="scss">
  .sidebar-top {
    width: 190px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #fff;
    padding-left: 20px;
    background: #4b77be;
    .snt-icon-list {
      vertical-align: -1px;
      margin-right: 8px;
      cursor: pointer;
      font-size: 14px;
      width: 24px;
      height: 24px;
      text-align: center;
    }
  }
  .scrollbar-wrapper {
    /deep/ .el-menu-item{
        height: 47px;
        line-height: 47px;
      }
    
  } 
</style>
