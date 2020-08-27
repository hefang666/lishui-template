<template>
  <div>
      <!--<el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
            <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
          </el-menu>
        </el-scrollbar>
        -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :background-color="variables.menuBg" :text-color="variables.menuText" :unique-opened="false" :active-text-color="variables.menuActiveText" :collapse-transition="false" mode="vertical">
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
  }
};
</script>
