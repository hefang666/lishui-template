import {
  GetDeviceInspectionList,
  GetDeviceInspectionDetails,
  GetDeviceTaskList,
  GetDeviceEventList
} from '@/api/inspection';
import { parseTime } from '../../utils';

var state = {
  equipmentList: [
    // {
    //   id: 1,
    //   name: '设备名',
    //   number: '编号',
    //   cishu: '1',
    //   chufa: '0',
    //   order: '0'
    // }
  ],
  // 设备列表总数
  equipmentTotal: 1,
  // 设备列表分页信息
  equipmentPage: [30, 40, 50, 100],

  // 基本信息
  equipmentDetails: '',

  // 任务列表
  equipmentTaskList: [
    // {
    //   endTime: null,
    //   id: 401,
    //   personInChargeId: 10261,
    //   personInChargeName: '仁寿供排水有限责任公司管理员用户',
    //   suspendTime: 10172952602982,
    //   suspendTimeString: '282小时34分',
    //   taskName: '每月计划任务20200502',
    //   taskStatus: 5,
    //   taskStatusString: '已关闭',
    //   taskType: 1,
    //   taskTypeString: '计划任务'
    // }
  ],
  // 任务总数量条数
  equipmentTaskTotal: 1,

  // 设备信息分页数据
  equipmentTaskPage: [30, 40, 50, 100],

  // 事件列表
  equipmentEventList: [],

  // 事件总数量信息
  equipmentEventTotal: 1,

  // 事件分页数据
  equipmentEventPage: [30, 40, 50, 100]
};

var mutations = {
  // 设置列表
  set_equipmentList: function(state, data) {
    state.equipmentList = data;
  },
  // 设置列表总数
  set_equipmentTotal: function(state, data) {
    state.equipmentTotal = data;
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置详情
  set_equipmentDetails: function(state, data) {
    state.equipmentDetails = data;
  },
  // 设置任务列表
  set_equipmentTaskList: function(state, data) {
    state.equipmentTaskList = data;
  },
  // 设置事件列表
  set_equipmentEventList: function(state, data) {
    state.equipmentEventList = data;
  },
  // 设置任务page信息
  set_equipmentTaskPageInfo: function(state, data) {
    state.equipmentTaskTotal = data;
  },
  // 设置事件page信息
  set_equipmentEventPageInfo: function(state, data) {
    state.equipmentEventTotal = data;
  }
};

var actions = {
  // 获取列表
  GetDeviceInspectionList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetDeviceInspectionList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_equipmentList', response.result.items);
            commit('set_equipmentTotal', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 获取详情
  GetDeviceInspectionDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetDeviceInspectionDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_equipmentDetails', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 获取任务列表
  GetDeviceTaskList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetDeviceTaskList(data)
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

            commit('set_equipmentTaskList', response.result.items);
            commit('set_equipmentTaskPageInfo', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 获取事件列表
  GetDeviceEventList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetDeviceEventList(data)
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
              });
            }
            commit('set_equipmentEventList', response.result.items);
            commit('set_equipmentEventPageInfo', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message || error);
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
