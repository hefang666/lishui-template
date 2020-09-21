import {
  GetEventList,
  GetEventDetails
} from '@/api/event';
import {parseTime} from '@/utils/index.js';

var state = {
  // 事件列表
  eventList: [
    {
      creationName: 'NJLS',
      creationTime: '2020-09-17 15:59',
      creatorUserId: 10294,
      errorType: '漏损',
      id: 1,
      predictWaterLoss: '0.2',
      status: 2,
      statusStr: '转工单',
      type: 1,
      typeStr: '漏损事件'
    }
  ],
  exceptionTypeData: [
    {
      value: 0,
      label: '全部'
    },
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
  eventDetails: ''
};

var mutations = {
  // 设置事件列表
  set_eventList: function(state, data) {
    state.eventList = data;
  },
  // 设置事件详情
  set_eventDetails: function(state, data) {
    state.eventDetails = data;
  }
};

var actions = {
  // 获取事件列表
  GetEventList({commit}, param) {
    console.log(param);
    var data = '';
    if (param.status == 0) {
      data = {
        pageIndex: param.pageIndex,
        maxResultCount: param.maxResultCount
      };
    } else {
      data = {
        status: param.status,
        pageIndex: param.pageIndex,
        maxResultCount: param.maxResultCount
      };
    }
    console.log(data);
    return new Promise((resolve, reject) => {
      GetEventList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            response.result.items.forEach(item => {
              item.creationTime = parseTime(
                item.creationTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            });
            commit('set_eventList', response.result.items);
            // commit('set_listTotal', response.result.totalCount);
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
  // 获取事件详情
  GetEventDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetEventDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            resolve(response);
          } else {
            commit('set_message', response.error.message);
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
