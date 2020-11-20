import {
  GetByDay,
  GetByUserId,
  GetGeneralSituation,
  GetTaskList,
  GetPlanByUserId,
  GetWorkOrderByUserId,
  ExportMonthList,
  GetLocationList
} from '@/api/personnel';
import {parseTime} from '@/utils/index';
import {downloadApi} from '@/api/api.js';

var state = {
  // 人员列表
  personList: [],

  // 人员列表总数
  personTotal: 1,

  // 根据id获得人员出勤的列表
  attendanceList: [],

  // 人员出勤列表总数
  attendanceTotal: 1,

  // 综合情况
  details: {},

  // 任务
  taskList: [],
  taskTotal: 1,

  // 计划
  planList: [],
  planTotal: 1,

  // 工单
  orderList: [],
  orderTotal: 1,

  // 选择的人员id
  checkedId: '',

  // 下载文件地址
  httpUrl: 'http://192.168.9.44:9090/',
  // 请求列表时的加载状态
  loading: false,

  // 轨迹列表
  localList: []
};

var mutations = {
  // 设置人员列表
  set_personList: function(state, data) {
    state.personList = data;
  },
  // 设置人员列表总数
  set_personTotal: function(state, data) {
    state.personTotal = data;
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置人员出勤列表
  set_attendanceList: function(state, data) {
    state.attendanceList = data;
  },
  // 设置人员出勤列表总数
  set_attendanceTotal: function(state, data) {
    state.attendanceTotal = data;
  },
  // 设置详细信息
  set_details: function(state, data) {
    state.details = data;
  },
  // 设置计划列表
  set_planList: function(state, data) {
    state.planList = data;
  },
  // 设置计划信息
  set_planInfo: function(state, data) {
    state.planTotal = data;
  },
  // 设置任务列表
  set_taskList: function(state, data) {
    state.taskList = data;
  },
  // 设置任务信息
  set_taskInfo: function(state, data) {
    state.taskTotal = data;
  },
  // 设置工单列表
  set_orderList: function(state, data) {
    state.orderList = data;
  },
  // 设置工单信息
  set_orderInfo: function(state, data) {
    state.orderTotal = data;
  },
  // 设置选中的人员id
  set_checkedId: function(state, data) {
    state.checkedId = data;
  },
  // 改变加载状态
  set_loading: function(state, data) {
    state.loading = data;
  },
  // 设置位置列表
  set_localList: function(state, data) {
    state.localList = data;
  }
};

var actions = {
  // 获取今天的列表
  GetByDay({commit}, data) {
    commit('set_loading', true);
    return new Promise((resolve, reject) => {
      GetByDay(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_personList', response.result.items);
            commit('set_personTotal', response.result.totalCount);
            commit('set_loading', false);
            resolve(response);
          }
        })
        .catch(error => {
          console.log(error);
          commit('set_loading', false);
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 通过人员获取
  GetByUserId({commit}, data) {
    return new Promise((resolve, reject) => {
      GetByUserId(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_attendanceList', response.result.items);
            commit('set_attendanceTotal', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 获取综合情况
  getDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetGeneralSituation(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_details', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 根据人员id获取任务
  getTask({commit}, data) {
    return new Promise((resolve, reject) => {
      GetTaskList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_taskList', response.result.items);
            commit('set_taskInfo', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 根据id获取计划
  getPlan({commit}, data) {
    return new Promise((resolve, reject) => {
      GetPlanByUserId(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_planList', response.result.items);
            commit('set_planInfo', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 根据id获取工单
  getOrder({commit}, data) {
    return new Promise((resolve, reject) => {
      GetWorkOrderByUserId(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.creationTime != null || item.creationTime != '') {
                  item.creationTime = parseTime(
                    item.creationTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
                if (item.completeTime != null || item.completeTime != '') {
                  item.completeTime = parseTime(
                    item.completeTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
              });
            }
            commit('set_orderList', response.result.items);
            commit('set_orderInfo', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 设置选择人员的id
  setCheckedId({commit}, data) {
    commit('set_checkedId', data);
  },
  // 导出某人某月的出勤记录
  ExportMonthList({commit}, data) {
    return new Promise((resolve, reject) => {
      ExportMonthList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            var downLoadUrl = downloadApi + response.result.dataUrl;
            window.open(downLoadUrl);
          }
          resolve(response);
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 获取人员某天的所有轨迹
  GetLocationList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetLocationList(data)
        .then(response => {
          console.log(response);
          commit('set_localList', response.result);
          resolve(response);
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
