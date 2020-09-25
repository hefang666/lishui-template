import {GetWorkOrderList, GetWorkOrderDetails, DeleteWorkOrder} from '@/api/order';
import {parseTime} from '@/utils/index.js';

var state = {
  orderList: [
    {
      id: 1,
      type: '临时任务',
      typeStr: '任务类型文本',
      person: '张三',
      creationTime: '2019-01-01 9:00',
      planCompleteTime: '2019-01-01 17:00',
      completeTime: '2019-01-01 17:00',
      status: '待完成',
      statusStr: '任务状态文本'
    }
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
  // 工单详情
  orderDetails: ''
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
  }
};

var actions = {
  GetWorkOrderList({commit}, data) {
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
            resolve(response);
          } else {
            commit('set_message', response.error.message);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetWorkOrderDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetWorkOrderDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            // response.result.items.forEach(item => {
            //   if (item.creationTime != null || item.creationTime != ''){
            //     item.creationTime = parseTime(
            //       item.creationTime,
            //       '{y}-{m}-{d} {h}:{i}'
            //     );
            //   }
            //   if (item.completeTime != null || item.completeTime != ''){
            //     item.completeTime = parseTime(
            //       item.completeTime,
            //       '{y}-{m}-{d} {h}:{i}'
            //     );
            //   }
            //   if (
            //     item.planCompleteTime != null ||
            //     item.planCompleteTime != ''
            //   ) {
            //     item.planCompleteTime = parseTime(
            //       item.planCompleteTime,
            //       '{y}-{m}-{d} {h}:{i}'
            //     );
            //   }
            // });
            commit('set_orderDetails', response.result);
            resolve(response);
          } else {
            commit('set_message', response.error.message);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  DeleteWorkOrder(data) {
    return new Promise((resolve, reject) => {
      DeleteWorkOrder(data)
        .then(response => {
          console.log(response);
          resolve(response);
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
