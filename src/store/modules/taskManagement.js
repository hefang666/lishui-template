import {getTaskList} from '@/api/task';
var state = {
  taskList: [
    {
      id: 1,
      name: '巡检任务',
      type: '临时任务',
      typeStr: '任务类型文本',
      person: '张三',
      participants: '李四、王五',
      planTime: '2019-01-01 9:00',
      planEndTime: '2019-01-01 17:00',
      endTime: '2019-01-01 17:00',
      stopTime: '3小时20分',
      status: '待完成',
      statusStr: '任务状态文本',
      startTime: '',
      OverdueTime: '',
      SuspendTime: '',
      finishTime: ''
    }
  ],
  taskStatus: '',
  searchText: '',
  currentPage: 1,
  maxResultCount: 30, // 每条页数
  editModalVisble: false,
  addModalVisible: false,
  checkModalVisible: false,
  // 当前状态
  currentState: '',
  // 筛选时输入框的输入的任务名称
};

var mutations = {
  set_task_list: function(state, list) {
    state.taskList = list;
  },
  update_modal_status: function(state, modal) {
    state[modal.name] = modal.status;
  },
  // 更新选中的状态（全部、未完成、已完成...）
  update_taskStatus: function(state, data) {
    state.taskStatus = data;
    console.log(state.sta);
  },
  // 更新搜索条件
  update_search: function(state, data) {
    state.taskName = data.taskName;
    state.startTime = data.startTime;
    state.endTime = data.endTime;
  }
};

var actions = {
  getTaskList({commit, state}, param) {
    console.log(param);
    console.log(state.taskStatus);
    var data = '';
    if (state.taskStatus == 0) {
      data = {
        pageIndex: param.currentPage,
        maxResultCount: param.maxResultCount
      };
    } else {
      data = {
        status: state.taskStatus - 1,
        pageIndex: param.currentPage,
        maxResultCount: param.maxResultCount
      };
    }
    return new Promise((resolve, reject) => {
      getTaskList(data)
        .then(response => {
          if (response.code) {
            commit('set_task_list', response);
            console.log(state.taskList);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  searchTask({commit}, param) {
    var data = {
      pageIndex: param.pageIndex,
      maxResultCount: param.maxResultCount,
      startTime: param.startTime,
      endTime: param.endTime,
      name: param.taskName
    }
    return new Promise((resolve, reject) => {
      getTaskList(data)
        .then(response => {
          if (response.code) {
            commit('set_task_list', response);
            console.log(state.taskList);
            resolve(response);
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
