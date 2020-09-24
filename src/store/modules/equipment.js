import {GetDeviceInspectionList} from '@/api/inspection';

var state = {
  equipmentList: [
    {
      id: 1,
      name: '设备名',
      number: '编号',
      cishu: '1',
      chufa: '0',
      order: '0'
    }
  ],
  equipmentTaskList: [
    {
      endTime: null,
      id: 401,
      personInChargeId: 10261,
      personInChargeName: '仁寿供排水有限责任公司管理员用户',
      suspendTime: 10172952602982,
      suspendTimeString: '282小时34分',
      taskName: '每月计划任务20200502',
      taskStatus: 5,
      taskStatusString: '已关闭',
      taskType: 1,
      taskTypeString: '计划任务'
    }
  ]
};

var mutations = {
  set_equipmentList: function(state, data) {
    state.equipmentList = data;
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  }
};

var actions = {
  GetDeviceInspectionList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetDeviceInspectionList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_equipmentList', response.result.items);
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
