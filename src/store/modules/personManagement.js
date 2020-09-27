import {GetByDay, GetByUserId} from '@/api/personnel';

var state = {
  // 人员列表
  personList: [],
  // 人员列表总数
  personTotal: 1,
  // 根据id获得人员出勤的列表
  attendanceList: [],
  // 人员出勤列表总数
  attendanceTotal: 1
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
  }
};

var actions = {
  GetByDay({commit}, data) {
    return new Promise((resolve, reject) => {
      GetByDay(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_personList', response.result.items);
            commit('set_personTotal', response.result.totalCount);
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
  GetByUserId({commit}, data) {
    return new Promise((resolve, reject) => {
      GetByUserId(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_attendanceList', response.result.items);
            commit('set_attendanceTotal', response.result.totalCount);
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
