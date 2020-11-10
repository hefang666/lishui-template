import {
  getPlanList,
  addPlan,
  updatePlan,
  getPlanDetails,
  UpdatePlanStatuById,
  DeletePlanById
} from '@/api/plan';
import {mGetDate, parseTime} from '@/utils/index';
var state = {
  // 计划列表
  planList: [
    // {
    //   id: -73151446,
    //   name: 'ad aute ex sed non',
    //   status: -74806858,
    //   areaId: 76229918,
    //   participant: 'Duis eiusmod esse',
    //   person: 'reprehenderit tempor proident in nulla',
    //   personId: -31908519,
    //   cycle: -90439625,
    //   cycleStr: 'dolore',
    //   statuStr: 'ad elit',
    //   planEndTime: 'sunt dolor ea pariatur'
    // }
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
  planDetails: {},
  // 修改计划详情
  editPlanDetails: {
    name: '测试',
    id: 2,
    cycle: 2,
    cycleStr: '每月',
    personId: 1,
    person: '张三',
    areaId: 1,
    participant: '张三、李四',
    status: 1,
    statusStr: '待接收',
    endTime: '2020',
    taskLists: [
      {
        beginTime: '2020-01-12',
        endTime: '2020-02-13'
      }
    ]
  },
  // 计划列表总数
  planTotal: 1,

  planStatus: 0,
  searchText: '',
  pageIndex: 1,
  maxResultCount: 10,
  editModalVisble: false,
  addModalVisible: false,
  checkModalVisible: false,
  // 请求列表时的加载状态
  loading: false
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
  },
  // 设置修改计划详情
  set_editPlanDetails: function(state, data) {
    state.editPlanDetails = data;
  },
  // 设置计划列表总数
  set_planTotal: function(state, data) {
    state.planTotal = data;
  },
  // 改变加载状态
  set_loading: function(state, data) {
    state.loading = data;
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
    commit('set_loading', true);
    return new Promise((resolve, reject) => {
      getPlanList(data)
        .then(response => {
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_plan_list', response.result.items);
            commit('set_planTotal', response.result.totalCount);
            commit('set_loading', false);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          commit('set_loading', false);
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
        label: i + '号',
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
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 修改任务
  updatePlan({commit}, data){
    return new Promise((resolve, reject) => {
      updatePlan(data)
        .then(response => {
          if (response.success) {
            commit('set_message', '修改成功');
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
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
            if (
              response.result.planCompleteTime != null ||
              response.result.planCompleteTime != ''
            ) {
              response.result.planCompleteTime = parseTime(
                response.result.planCompleteTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }

            if (
              response.result.endTime != null ||
              response.result.endTime != ''
            ) {
              response.result.endTime = parseTime(
                response.result.endTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }

            if (response.result.taskLists.length != 0) {
              response.result.taskLists.forEach(item => {
                item.beginTime = parseTime(
                  item.beginTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
                item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
              });
            }
            // let details = response.result;
            // let arr = details.participant.split('、');
            // let array = [];
            // arr.forEach(item => {
            //   array.push({
            //     trueName: item
            //   });
            // });
            // console.log(arr);
            // console.log(array);
            // details.participant = array;
            // console.log('details :>> ', details.user);
            commit('set_planDetails', response.result);
            commit('set_editPlanDetails', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 设置修改计划的详情
  changeEdit({commit}, data) {
    commit('set_editPlanDetails', data);
  },
  // 修改计划状态（重启、暂停）
  UpdatePlanStatuById({commit}, data) {
    return new Promise((resolve, reject) => {
      UpdatePlanStatuById(data)
        .then(response => {
          if (response.success) {
            commit('set_message', '操作成功');
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 删除计划
  deletePlan({commit}, data) {
    return new Promise((resolve, reject) => {
      DeletePlanById(data)
        .then(response => {
          if (response.success) {
            commit('set_message', '删除成功');
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 设置消息信息
  setMessage({commit}, data) {
    commit('set_message', data);
  },
  // 查询
  searchPlan({commit}, data) {
    return new Promise((resolve, reject) => {
      getPlanList(data)
        .then(response => {
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_plan_list', response.result.items);
            commit('set_planTotal', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
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
