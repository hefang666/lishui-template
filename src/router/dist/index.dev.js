"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.routes = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("@/views/Home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);
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


var routes = [{
  path: "/",
  redirect: "/cc",
  component: _Home["default"],
  meta: {
    title: "首页",
    icon: "el-icon-user"
  },
  alwaysShow: true,
  children: [{
    path: "/cc",
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/About.vue"));
      });
    },
    meta: {
      title: "cc"
    }
  }]
}, {
  path: "/about",
  name: "About",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/About.vue"));
    });
  },
  meta: {
    title: "关于我们",
    icon: "el-icon-heavy-rain"
  },
  hidden: true
}, {
  path: "/contact",
  name: "About",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/About.vue"));
    });
  },
  meta: {
    title: "联系我们",
    icon: "el-icon-heavy-rain"
  }
}];
exports.routes = routes;
var router = new _vueRouter["default"]({
  routes: routes
});
var _default = router;
exports["default"] = _default;