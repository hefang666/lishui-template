import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";

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
    path: "/about",
    name: "About",
    redirect: "/tr",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { title: "关于我们", icon: "el-icon-heavy-rain" },
    children: [
      {
        path: "/bb",
        name: "bb",
        redirect: "/tr",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "bb" },
        children: [
          {
            path: "/tr",
            name: "tr",
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/About.vue"),
            meta: { title: "tr" }
          },
          {
            path: "pa",
            name: "pa",
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/About.vue"),
            meta: { title: "pa" }
          }
        ]
      },
      {
        path: "/dd",
        name: "dd",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "dd" }
      },
      {
        path: "/ee",
        name: "ee",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "ee" }
      },
      {
        path: "/hh",
        name: "hh",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "hh" }
      },
      {
        path: "/ii",
        name: "ii",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "ii" }
      },
      {
        path: "/gg",
        name: "gg",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "gg" }
      },
      {
        path: "/vv",
        name: "vv",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "vv" }
      },
      {
        path: "/mm",
        name: "mm",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "mm" }
      },
      {
        path: "/nn",
        name: "nn",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "nn" }
      },
      {
        path: "/zz",
        name: "zz",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "zz" }
      },
      {
        path: "/pp",
        name: "pp",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "pp" }
      },
      {
        path: "/oo",
        name: "oo",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "oo" }
      },
      {
        path: "/tt",
        name: "tt",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "tt" }
      },
      {
        path: "/ww",
        name: "ww",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "ww" }
      },
      {
        path: "/qq",
        name: "qq",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "qq" }
      },
      {
        path: "/ss",
        name: "ss",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: { title: "ss" }
      },
      {
        path: "/cc",
        name: "cc",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          title: "cc"
        }
      }
    ]
  },
  {
    path: "/contact",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { title: "联系我们", icon: "el-icon-heavy-rain" }
  }
];

const router = new VueRouter({
  routes
});
export { routes };
export default router;
