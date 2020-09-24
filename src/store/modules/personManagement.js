import {GetByDay} from '@/api/personnel';

var state = {
  // 人员列表
  personList: []
};

var mutations = {
  // 设置人员列表
  set_personList: function(state, data) {
    state.personList = data;
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  }
};

var actions = {
  GetByDay({commit}, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      GetByDay(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_personList', response.result.items);
            commit('set_message', '新增任务成功！');
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
