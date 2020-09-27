import {getPlanList, addPlan, getPlanDetails} from '@/api/plan';
import {mGetDate} from '@/utils/index';
var state = {
  // 计划列表
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
  // 每周数据
  weeklyData: [
    {
      label: '周一',
      value: 1
    },
    {
      label: '周二',
      value: 2
    },
    {
      label: '周三',
      value: 3
    },
    {
      label: '周四',
      value: 4
    },
    {
      label: '周五',
      value: 5
    },
    {
      label: '周六',
      value: 6
    },
    {
      label: '周日',
      value: 0
    }
  ],
  // 每月数据
  monthlyData: [],
  // 提示消息
  messageText: '',
  // 计划详情
  planDetails: '',

  planStatus: 0,
  searchText: '',
  pageIndex: 1,
  maxResultCount: 10,
  editModalVisble: false,
  addModalVisible: false,
  checkModalVisible: false
};

var mutations = {
  // 设置计划列表
  set_plan_list: function(state, list) {
    state.planList = list;
  },
  // 设置当前月份信息
  set_monthlyData: function(state, data) {
    state.monthlyData = data;
  },
  // 设置消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置计划详情
  set_planDetails: function(state, data) {
    state.planDetails = data;
  }
  // update_modal_status: function(state, modal) {
  //   state[modal.name] = modal.status;
  // }
};

var actions = {
  // changePlanList({commit}, list) {
  //   commit('set_plan_list', list);
  // },
  // changeModalStatus: function({commit}, modal) {
  //   commit('update_modal_status', modal);
  // },
  // 获取计划列表
  getPlanList({commit}, data) {
    return new Promise((resolve, reject) => {
      getPlanList(data)
        .then(response => {
          if (response.success) {
            commit('set_plan_list', response.result.items);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取当月天数
  getMounthDate({commit}) {
    let day = mGetDate();
    let monthData = [];
    for (let i = 1; i <= day; i++) {
      monthData.push({
        label: i + '天',
        value: i
      });
    }
    commit('set_monthlyData', monthData);
  },
  // 新增任务
  addPlan({commit}, data) {
    return new Promise((resolve, reject) => {
      addPlan(data)
        .then(response => {
          if (response.success) {
            commit('set_message', '添加成功');
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 根据id获取任务详情
  getPlanDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      getPlanDetails(data)
        .then(response => {
          if (response.success) {
            commit('set_planDetails', response.result);
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
