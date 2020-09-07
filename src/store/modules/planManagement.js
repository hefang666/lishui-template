var state = {
  planList: [
    {
      taskName: '巡检任务',
      taskType: '临时任务',
      inCharge: '张三',
      player: '李四、王五',
      estimatedStartTime: '2019-01-01 9:00',
      estimatedEndTime: '2019-01-01 17:00',
      actualCompletionTime: ' ',
      timeOut: '3小时20分',
      missionStatus: '待完成'
    }
  ]
};

var mutations = {
  set_plan_list: function(state, list) {
    state.planList = list;
  }
};

var actions = {
  changePlanList({commit}, list) {
    commit('set_plan_list', list);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
