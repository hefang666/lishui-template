import {getPlanList} from '@/api/plan';
var state = {
  planList: [
    {
      id: -73151446,
      name: 'ad aute ex sed non',
      status: -74806858,
      areaId: 76229918,
      participant: 'Duis eiusmod esse',
      person: 'reprehenderit tempor proident in nulla',
      personId: -31908519,
      cycle: -90439625,
      cycleStr: 'dolore',
      statuStr: 'ad elit',
      planEndTime: 'sunt dolor ea pariatur'
    }
  ],
  planStatus: 0,
  searchText: '',
  pageIndex: 1,
  maxResultCount: 10,
  editModalVisble: false,
  addModalVisible: false,
  checkModalVisible: false
};

var mutations = {
  set_plan_list: function(state, list) {
    state.planList = list;
  },
  update_modal_status: function(state, modal) {
    state[modal.name] = modal.status;
  }
};

var actions = {
  changePlanList({commit}, list) {
    commit('set_plan_list', list);
  },
  changeModalStatus: function({commit}, modal) {
    commit('update_modal_status', modal);
  },
  getPlanList({commit, state}) {
    var data = {
      status: state.statuStr,
      name: state.searchText,
      pageIndex: state.pageIndex,
      maxResultCount: state.maxResultCount
    };
    return new Promise((resolve, reject) => {
      getPlanList(data)
        .then(response => {
          if (response.code) {
            commit('set_plan_list', response);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
