import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

const store = new Vuex.Store({
    state: {
        permission: [] // 权限集合
    },
    mutations: {
        SET_PERMISSION(state, permission) { // permissions 为传入的权限标识集合
            // 传入的权限集合 赋值给状态中的 permission
            state.permissions = permission;
        }
    },
    actions: {
        SET_PERMISSION(context, permission) {
            // 提交到 mutation 中的 SET_PERMISSION 函数
            context.commit("SET_PERMISSION", permission);
        }
    },
    modules,
    getters
});

export default store;