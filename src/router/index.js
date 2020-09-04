import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home/index.vue";

Vue.use(VueRouter);

/**
 * Note: 当子路由children的长度大于等于1的时候子导航才会显示
 * 详细参考下面配置
 *
 * hidden: true                   为真的时当前路由不会显示在侧导航中
 * alwaysShow: true               为真时根路由会显示在侧导航中
 *                                
 *                                
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
const routes = [
  {
    path: "/",
    component: Home,
    name: "home",
    meta: { title: "首页", icon: "el-icon-user", affix: true }
  },
  {
    path: "/plan",
    component: () => import("@/views/taskManagement"),
    name: "plan",
    meta: { title: "任务管理", icon: "el-icon-user" },
  }
];

const router = new VueRouter({
  routes
});
export { routes };
export default router;
