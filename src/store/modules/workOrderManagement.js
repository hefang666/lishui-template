import {
  GetWorkOrderList,
  GetWorkOrderDetails,
  DeleteWorkOrder,
  CloseWorkOrder,
  InsertWorkOrder,
  UpdateWorkOrder
} from '@/api/order';
import {parseTime} from '@/utils/index.js';

var state = {
  orderList: [
    // {
    //   id: 1,
    //   type: '临时任务',
    //   typeStr: '任务类型文本',
    //   person: '张三',
    //   creationTime: '2019-01-01 9:00',
    //   planCompleteTime: '2019-01-01 17:00',
    //   completeTime: '2019-01-01 17:00',
    //   status: 3,
    //   statusStr: '已关闭'
    // }
  ],
  // 工单总数
  orderListTotal: 1,
  // 工单类型
  orderTypeData: [
    {
      value: 1,
      label: '查漏'
    },
    {
      value: 2,
      label: '查漏延伸'
    },
    {
      value: 3,
      label: '维修管道'
    },
    {
      value: 4,
      label: '维修管道延伸'
    },
    {
      value: 5,
      label: '违章罚款'
    },
    {
      value: 6,
      label: '贫水区改造'
    }
  ],
  // 提示消息
  messageText: '',

  // 修改工单详情
  orderDetails: {
    eventDetails: {}
  },
  // 工单详情
  orderDetail: {
    eventDetails: {},
    workTranfer: [],
    deviceDetails: {}
  },

  // 请求列表时的加载状态
  loading: true
};

var mutations = {
  // 设置工单列表
  set_orderList: function(state, data) {
    state.orderList = data;
    console.log(state.orderList);
  },
  // 设置消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置工单列表总数
  set_orderListTotal: function(state, data) {
    state.orderListTotal = data;
  },
  // 设置工单详情
  set_orderDetails: function(state, data) {
    state.orderDetails = data;
    state.orderDetail = data;
  },
  // 改变加载状态
  set_loading: function(state, data) {
    state.loading = data;
  }
};

var actions = {
  // 获取工单列表
  GetWorkOrderList({commit}, data) {
    console.log(data);
    commit('set_loading', true);
    return new Promise((resolve, reject) => {
      GetWorkOrderList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            response.result.items.forEach(item => {
              if (item.creationTime != null || item.creationTime != ''){
                item.creationTime = parseTime(
                  item.creationTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
              }
              if (item.completeTime != null || item.completeTime != ''){
                item.completeTime = parseTime(
                  item.completeTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
              }
              if (
                item.planCompleteTime != null ||
                item.planCompleteTime != ''
              ) {
                item.planCompleteTime = parseTime(
                  item.planCompleteTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
              }
            });
            commit('set_orderList', response.result.items);
            commit('set_orderListTotal', response.result.totalCount);
            commit('set_loading', false);
            resolve(response);
          }
        })
        .catch(error => {
          console.log(error);
          commit('set_message', error.message || error);
          commit('set_loading', false);
          reject(error);
        });
    });
  },
  // 获取工单详情
  GetWorkOrderDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetWorkOrderDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            let details = response.result;
            console.log(details);
            if (details.completeTime != '' || details.completeTime != null) {
              details.completeTime = parseTime(
                details.completeTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }

            if (details.creationTime != '' || details.creationTime != null) {
              details.creationTime = parseTime(
                details.creationTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }

            if (
              details.planCompleteTime != '' ||
              details.planCompleteTime != null
            ) {
              details.planCompleteTime = parseTime(
                details.planCompleteTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }

            if (details.time != '' || details.time != null) {
              details.time = parseTime(details.time, '{y}-{m}-{d} {h}:{i}');
            }

            if (details.eventDetails != null) {
              if (
                details.eventDetails.creationTime != '' ||
                details.eventDetails.creationTime != null
              ) {
                details.eventDetails.creationTime = parseTime(
                  details.eventDetails.creationTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
              }

              if (
                details.eventDetails.planCompleteTime != '' ||
                details.eventDetails.planCompleteTime != null
              ) {
                details.eventDetails.planCompleteTime = parseTime(
                  details.eventDetails.planCompleteTime,
                  '{y}-{m}-{d} {h}:{i}'
                );
              }
            }

            commit('set_orderDetails', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          console.log('error :>> ', error);
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 删除工单
  DeleteWorkOrder({commit}, data) {
    return new Promise((resolve, reject) => {
      DeleteWorkOrder(data)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 关闭工单 CloseWorkOrder
  closeWorkOrder({commit}, data) {
    return new Promise((resolve, reject) => {
      CloseWorkOrder(data)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 设置提示消息
  setMessage({commit}, data) {
    commit('set_message', data);
  },
  // 新增工单
  InsertWorkOrder({commit}, data) {
    return new Promise((resolve, reject) => {
      InsertWorkOrder(data)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          commit('set_message', error.message || error);
          reject(error);
        });
    });
  },
  // 修改工单
  updateWorkOrder({commit}, data) {
    return new Promise((resolve, reject) => {
      UpdateWorkOrder(data)
        .then(response => {
          console.log(response);
          resolve(response);
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
