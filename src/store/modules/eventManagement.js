import {
  GetEventList,
  GetEventDetails,
  UpdateEventById,
  getEventType
} from '@/api/event';
import {getCurrentUserInfo} from '@/api/other';
import {parseTime} from '@/utils/index.js';

var state = {
  // 事件列表
  eventList: [
    // {
    //   creationName: 'NJLS',
    //   creationTime: '2020-09-17 15:59',
    //   creatorUserId: 10294,
    //   errorType: '漏损',
    //   id: 1,
    //   predictWaterLoss: '0.2',
    //   status: 2,
    //   statusStr: '转工单',
    //   type: 1,
    //   typeStr: '漏损事件'
    // }
  ],
  // 异常类型
  exceptionTypeData: [
    {
      value: 1,
      label: '外观损坏'
    },
    {
      value: 2,
      label: '噪音异响'
    },
    {
      value: 3,
      label: '渗水漏水'
    },
    {
      value: 4,
      label: '杂物堵塞'
    },
    {
      value: 5,
      label: '设备损坏'
    },
    {
      value: 6,
      label: '其他异常'
    }
  ],
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
  // 事件详情
  eventDetails: '',
  // 提示消息
  messageText: '',
  // 事件总数
  eventListTotal: 1,
  // 请求列表时的加载状态
  loading: false,
  // 事件page
  eventPageData: [30, 40, 50, 100],
  //事件类型
  eventTypeData: []
};

var mutations = {
  // 设置事件列表
  set_eventList: function(state, data) {
    state.eventList = data;
  },
  // 设置事件详情
  set_eventDetails: function(state, data) {
    state.eventDetails = data;
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置数据总量
  set_eventListTotal: function(state, data) {
    state.eventListTotal = data;
  },
  // 改变加载状态
  set_loading: function(state, data) {
    state.loading = data;
  },
  // 设置事件类型
  set_eventTypeData: function(state, data) {
    state.eventTypeData = data;
  }
};

var actions = {
  // 获取事件列表
  GetEventList({commit}, data) {
    commit('set_loading', true);
    return new Promise((resolve, reject) => {
      GetEventList(data)
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
            commit('set_eventList', response.result.items);
            commit('set_eventListTotal', response.result.totalCount);
            commit('set_loading', false);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_loading', false);
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 获取事件详情
  GetEventDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetEventDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            let data = response.result;
            if (data.creationTime != null || data.creationTime != '') {
              data.creationTime = parseTime(
                data.creationTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }
            if (data.planCompleteTime != null || data.planCompleteTime != '') {
              data.planCompleteTime = parseTime(
                data.planCompleteTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }
            if (data.time != null || data.time != '') {
              data.time = parseTime(data.time, '{y}-{m}-{d} {h}:{i}');
            }
            commit('set_eventDetails', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 改变事件状态
  UpdateEvent({commit}, data) {
    return new Promise((resolve, reject) => {
      UpdateEventById(data)
        .then(response => {
          // console.log(response.success);
          if (response.success) {
            commit('set_message', '操作成功！');
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 改变消息内容
  setMessage({commit}, data) {
    commit('set_message', data);
  },
  //获取事件类型
  getEventTypeData({commit}, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      getEventType(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            var result = [
              {
                name: '请选择事件类型',
                value: 0
              }
            ];
            if (response.result.length != 0) {
              response.result.forEach(item => {
                result.push(item);
              });
            }
            commit('set_eventTypeData', result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 获取当前用户信息
  getCurrentUser({commit}) {
    return new Promise((resolve, reject) => {
      getCurrentUserInfo()
        .then(response => {
          console.log(response);
          if (response.success) {
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
