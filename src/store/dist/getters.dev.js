"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getters = {
  sidebar: function sidebar(state) {
    return state.app.sidebar;
  },
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  permission_routes: function permission_routes(state) {
    return state.permission.routes;
  } // errorLogs: state => state.errorLog.logs

};
var _default = getters;
exports["default"] = _default;