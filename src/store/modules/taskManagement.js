import {
  getTaskList,
  addTask,
  GetTaskDetails,
  UpdateTaskStatus
} from '@/api/task';
import {parseTime} from '@/utils/index.js';
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
  listTotalCount: 1, // 数据总数
  messageText: '', // 提示信息
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
  },
  // 更新列表总条数
  set_listTotal: function(state, data) {
    console.log(data);
    state.listTotalCount = data;
    console.log(state.listTotalCount);
  },
  // 更新提示消息
  set_message: function(state, data) {
    state.messageText = data;
    console.log(state.messageText);
  }
};

var actions = {
  // 获取数据
  getTaskList({commit, state}, param) {
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
          console.log(response);
          if (response.success) {
            response.result.items.forEach(item => {
              console.log(item);
              item.planStartTime = parseTime(
                item.planStartTime,
                '{y}-{m}-{d} {h}:{i}'
              );
              item.planEndTime = parseTime(
                item.planEndTime,
                '{y}-{m}-{d} {h}:{i}'
              );
              if (item.endTime != null) {
                item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
              }
            });
            commit('set_task_list', response.result.items);
            commit('set_listTotal', response.result.totalCount);
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
  // 搜索
  searchTask({commit}, param) {
    var data = {
      pageIndex: param.pageIndex,
      maxResultCount: param.maxResultCount,
      startTime: param.startTime,
      endTime: param.endTime,
      name: param.taskName
    };
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
  // 新建
  addTask({commit}, data) {
    return new Promise((resolve, reject) => {
      addTask(data)
        .then(response => {
          console.log(response);
          if (response.success) {
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
  },
  // 查看、修改
  GetTaskDetails({commit}, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      GetTaskDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            // commit('set_message', '新增任务成功！');
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
  // 修改任务状态
  UpdateTaskStatus({commit}, data) {
    console.log(commit);
    return new Promise((resolve, reject) => {
      UpdateTaskStatus(data)
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
