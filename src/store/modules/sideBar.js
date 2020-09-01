const state = {
  // 0 表示展开，1 表示收缩， 2 表示一上去的状态
  sideBarStatus: 0
};

const mutations = {
  update_sidebar_status: (state, status) => {
    console.log(status)
    state.sideBarStatus = status;
  }
};

const actions = {
  changeSideBarStatus ({ commit }, status) {
    commit("update_sidebar_status", status);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
