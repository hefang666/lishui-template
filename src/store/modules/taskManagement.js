import {
  getTaskList,
  addTask,
  GetTaskDetails,
  UpdateTaskStatus,
  deleteTask,
  GetInspectionPointList,
  GetPointDetails,
  GetAreaByTaskId,
  UpdateTask
} from '@/api/task';
import {parseTime} from '@/utils/index.js';
var state = {
  taskList: [
    // {
    //   id: 1,
    //   name: '巡检任务',
    //   type: '临时任务',
    //   typeStr: '任务类型文本',
    //   person: '张三',
    //   participants: '李四、王五',
    //   planTime: '2019-01-01 9:00',
    //   planEndTime: '2019-01-01 17:00',
    //   endTime: '2019-01-01 17:00',
    //   stopTime: '3小时20分',
    //   status: '待完成',
    //   statusStr: '任务状态文本',
    //   startTime: '',
    //   OverdueTime: '',
    //   SuspendTime: '',
    //   finishTime: ''
    // }
  ],
  taskStatus: '',
  searchText: '',
  currentPage: 1,
  listTotalCount: 1, // 数据总数
  pageData: [30, 40, 50, 100], // 分页的数据

  messageText: '', // 提示信息

  editModalVisble: false,
  addModalVisible: false,
  checkModalVisible: false,
  // 任务详情内容
  taskDetail: {
    areaId: '',
    areaName: '',
    closeReason: null,
    endTime: null,
    id: '',
    name: '',
    participantIds: [],
    participants: [],
    pauseTime: null,
    person: '',
    personId: '',
    planEndTime: '',
    planStartTime: '',
    remark: '',
    resourcelist: [],
    startTime: null,
    status: '',
    statusStr: '',
    stopReason: null,
    type: '',
    typeStr: ''
  },
  // 修改任务的任务详情
  taskDetails: {
    areaId: '',
    areaName: '',
    closeReason: null,
    endTime: null,
    id: '',
    name: '',
    participantIds: [],
    participants: [],
    pauseTime: null,
    person: '',
    personId: '',
    planEndTime: '',
    planStartTime: '',
    remark: '',
    resourcelist: [],
    startTime: null,
    status: '',
    statusStr: '',
    stopReason: null,
    type: '',
    typeStr: ''
  },
  // 设备点巡检信息列表
  inspectionPointList: [],
  // 设备点巡检列表总数
  inspectionPointTotal: 1,
  // 设备点巡检page
  inspectionPointPage: [30, 40, 50, 100],
  // 设备点详情
  pointDetails: {},
  // 任务详情中的巡检路线信息
  areaDetail: {},

  // 请求列表时的加载状态
  loading: true
};

var mutations = {
  set_task_list: function(state, data) {
    state.taskList = data;
  },
  update_modal_status: function(state, modal) {
    state[modal.name] = modal.status;
  },
  // 更新选中的状态（全部、未完成、已完成...）
  update_taskStatus: function(state, data) {
    state.taskStatus = data;
    console.log(state.taskStatus);
  },
  // 更新搜索条件
  update_search: function(state, data) {
    state.taskName = data.taskName;
    state.startTime = data.startTime;
    state.endTime = data.endTime;
  },
  // 更新列表总条数
  set_listTotal: function(state, data) {
    state.listTotalCount = data;
  },
  // 更新提示消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置任务详情信息
  set_taskDetail: function(state, data) {
    state.taskDetail = data;
    state.taskDetails = data;
  },
  // 设置设备点巡检信息列表
  set_inspectionPointList: function(state, data) {
    state.inspectionPointList = data;
    console.log(state.inspectionPointList);
  },
  // 设置设备点巡检列表总数
  set_inspectionPointTotal: function(state, data) {
    state.inspectionPointTotal = data;
  },
  // 设置设备点详情
  set_pointDetails: function(state, data) {
    state.pointDetails = data;
    console.log(state.pointDetails);
  },
  // 设置任务详情中的片区信息
  set_areaDetail: function(state, data) {
    state.areaDetail = data;
    console.log(state.areaDetail);
  },
  // 改变加载状态
  set_loading: function(state, data) {
    state.loading = data;
  }
};

var actions = {
  // 获取数据
  getTaskList({commit}, param) {
    commit('set_loading', true);
    let data = '';
    console.log(param);
    if (param.status == 0) {
      data = {
        pageIndex: param.currentPage,
        maxResultCount: param.maxResultCount
      };
    } else {
      data = {
        status: param.status,
        pageIndex: param.currentPage,
        maxResultCount: param.maxResultCount
      };
    }
    return new Promise((resolve, reject) => {
      getTaskList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.planStartTime != null || item.planStartTime != '') {
                  item.planStartTime = parseTime(
                    item.planStartTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
                if (item.planEndTime != null || item.planEndTime != '') {
                  item.planEndTime = parseTime(
                    item.planEndTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_task_list', response.result.items);
            commit('set_listTotal', response.result.totalCount);
            // setTimeout(() => {
            //   commit('set_loading', false);
            // }, 3000);
            commit('set_loading', false);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          commit('set_loading', false);
          reject(error);
        });
    });
  },
  // 搜索
  searchTask({commit}, param) {
    console.log(param);
    let data = {
      pageIndex: param.currentPage,
      maxResultCount: param.maxResultCount,
      startTime: param.startTime,
      endTime: param.endTime,
      name: param.taskName
    };
    return new Promise((resolve, reject) => {
      getTaskList(data)
        .then(response => {
          if (response.success) {
            if (response.result.items.length != 0) {
              response.result.items.forEach(item => {
                if (item.planEndTime != null || item.planEndTimeTime != '') {
                  item.planEndTime = parseTime(
                    item.planEndTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
                if (item.planStartTime != null || item.planStartTime != '') {
                  item.planStartTime = parseTime(
                    item.planStartTime,
                    '{y}-{m}-{d} {h}:{i}'
                  );
                }
                if (item.endTime != null || item.endTime != '') {
                  item.endTime = parseTime(item.endTime, '{y}-{m}-{d} {h}:{i}');
                }
              });
            }
            commit('set_task_list', response.result.items);
            commit('set_listTotal', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
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
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 获取任务详情（查看、修改）
  GetTaskDetails({commit}, data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      GetTaskDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            let data = response.result;
            if (data.planStartTime != null || data.planStartTime != '') {
              data.planStartTime = parseTime(
                data.planStartTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }
            if (data.planEndTime != null || data.planEndTime != '') {
              data.planEndTime = parseTime(
                data.planStartTime,
                '{y}-{m}-{d} {h}:{i}'
              );
            }
            if (data.startTime != null || data.startTime != '') {
              data.startTime = parseTime(data.startTime, '{y}-{m}-{d} {h}:{i}');
            }
            if (data.endTime != null || data.endTime != '') {
              data.endTime = parseTime(data.endTime, '{y}-{m}-{d} {h}:{i}');
            }
            commit('set_taskDetail', data);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 修改任务状态
  UpdateTaskStatus({commit}, data) {
    return new Promise((resolve, reject) => {
      UpdateTaskStatus(data)
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
  },
  // 删除任务
  deleteTask({commit}, data) {
    return new Promise((resolve, reject) => {
      deleteTask(data)
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
  },
  // 设备点巡检信息列表
  GetInspectionPointList({commit}, data) {
    return new Promise((resolve, reject) => {
      GetInspectionPointList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_inspectionPointList', response.result.items);
            commit('set_inspectionPointTotal', response.result.totalCount);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 设备点巡检信息详情
  GetPointDetails({commit}, data) {
    return new Promise((resolve, reject) => {
      GetPointDetails(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            if (response.result != null) {
              commit('set_pointDetails', response.result);
            }
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 任务详情中的片区信息
  GetAreaByTaskId({commit}, data) {
    return new Promise((resolve, reject) => {
      GetAreaByTaskId(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_areaDetail', response.result);
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  UpdateTask({commit}, data) {
    return new Promise((resolve, reject) => {
      UpdateTask(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_message', '修改成功');
            resolve(response);
          }
        })
        .catch(error => {
          commit('set_message', error.message);
          reject(error);
        });
    });
  },
  // 设置提示语
  setMessage({commit}, data) {
    commit('set_message', data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
