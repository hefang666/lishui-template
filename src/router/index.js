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
const routes = [{
        path: "",
        component: Home,
        redirect: 'index',
        name: "home",
        children: [{
            path: 'index',
            component: () =>
                import ('../views/index/Index.vue'),
            name: 'index',
            meta: { title: '首页', icon: 'el-icon-s-home', noCache: true, affix: true }
        }]
    },
    {
        path: "/staffaccess",
        name: "staffaccess",
        redirect: "/staffaccess/AccessRecords.vue",
        component: Home,
        meta: { title: "员工出入", icon: "el-icon-user" },
        children: [{
                path: "AccessRecords",
                name: "AccessRecords",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/staffaccess/AccessRecords.vue"
                    ),
                meta: { title: "出入记录" }
            },
            {
                path: "RecordImport",
                name: "RecordImport",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/staffaccess/RecordImport.vue"
                    ),
                meta: { title: "记录导入" }
            }
        ]
    },
    {
        path: "/visitor",
        name: "visitor",
        redirect: "/visitor/VisitorRegister",
        component: Home,
        meta: { title: "访客管理", icon: "el-icon-printer" },
        children: [{
                path: "VisitorRegister",
                name: "VisitorRegister",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/visitor/VisitorRegister.vue"
                    ),
                meta: { title: "访客登记" }
            },
            {
                path: "VisitorManage",
                name: "VisitorManage",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/visitor/VisitorManage.vue"
                    ),
                meta: { title: "访客管理" }
            },
            {
                path: "VisitorPointManage",
                name: "VisitorPointManage",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/visitor/VisitorPointManage.vue"
                    ),
                meta: { title: "访客地点管理" }
            }
        ]
    },
    {
        path: "/car",
        name: "car",
        redirect: "/car/CarRegister",
        component: Home,
        meta: { title: "车辆管理", icon: "el-icon-truck" },
        children: [{
                path: "CarRegister",
                name: "CarRegister",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/car/CarRegister.vue"
                    ),
                meta: { title: "车辆登记" }
            },
            {
                path: "CarManage",
                name: "CarManage",
                component: () =>
                    import ( /* webpackChunkName: "about" */ "../views/car/CarManage.vue"),
                meta: { title: "车辆管理" }
            },
            {
                path: "UseCarManage",
                name: "UseCarManage",
                component: () =>
                    import ( /* webpackChunkName: "about" */ "../views/car/UseCarManage.vue"),
                meta: { title: "用车管理" }
            },
            {
                path: "CarGps",
                name: "CarGps",
                component: () =>
                    import ( /* webpackChunkName: "about" */ "../views/car/CarGps.vue"),
                meta: { title: "车辆定位" }
            }
        ]
    },
    {
        path: "/patrolrecord",
        name: "patrolrecord",
        redirect: "/patrolrecord/PatrolRecordManage",
        component: Home,
        meta: { title: "巡更记录管理", icon: "el-icon-edit-outline" },
        children: [{
                path: "PatrolRecordManage",
                name: "PatrolRecordManage",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/patrolrecord/PatrolRecordManage.vue"
                    ),
                meta: { title: "巡更记录查询" }
            },
            {
                path: "TourRecordImport",
                name: "TourRecordImport",
                component: () =>
                    import (
                        /* webpackChunkName: "about" */
                        "../views/patrolrecord/TourRecordImport.vue"
                    ),
                meta: { title: "巡更记录导入" }
            }
        ]
    }
];

const router = new VueRouter({
    routes
});
export { routes };
export default router;