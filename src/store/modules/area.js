import {areaList} from '../data.js';
import {Message} from 'element-ui';
import {
  getPointAndLine,
  insetArea,
  updateArea,
  getAreaList,
  getAreaDetail,
  deleteArea
} from '@/api/area';
let state = {
  // 片区是新增状态还是编辑状态 1表示新增  2表示编辑
  handleStatus: '',
  // 区域列表
  areaList: areaList.result.items,
  // 区域管理当前页及当前页显示数量和总数
  areaListInfo: {
    pageIndex: 1,
    maxResultCount: 30,
    totalCount: 1
  },
  // 搜索区域的名称
  searchName: '',
  // 选中区域的id
  chooseAreaId: [],
  // totalCount: areaList.totalCount,
  // 片区信息
  areaInfo: {},
  // 生成设备列表在设备和管道中渲染的列表
  selectPoint: [],
  selectLine: [],
  // 所有的管线列表 复选框
  pointList: [],
  // 所有的管点列表 复选框
  lineList: [],
  // 复选框选中的管线和管点
  checkedPoint: [],
  checkedLine: [],
  areaDetailsInfo: {}
};

let mutations = {
  update_point_and_line: function(state, data) {
    state.pointList = data.point;
    state.lineList = data.line;
  },
  update_checked_point: function(state, data) {
    state.checkedPoint = data;
  },
  update_checked_line: function(state, data) {
    state.checkedLine = data;
  },
  update_area_info: function(state, data) {
    state.areaInfo = data;
    state.selectPoint = data.selectPoint;
    state.selectLine = data.selectLine;
  },
  update_handle_status: function(state, data) {
    state.handleStatus = data;
  },
  update_area_list: function(state, data) {
    state.areaList = data.items;
    state.areaListInfo.totalCount = data.totalCount;
  },
  update_page_count: function(state, data) {
    state.areaListInfo.maxResultCount = data;
  },
  update_current_page: function(state, data) {
    state.areaListInfo.pageIndex = data;
  },
  update_search_name: function(state, data) {
    state.searchName = data;
  },
  update_choose_id: function(state, data) {
    state.chooseAreaId = data;
  },
  set_areaDetailsInfo: function(state, data) {
    state.areaDetailsInfo = data;
  },
  delete_device_single: function(state, index) {
    state.areaInfo.selectPoint.splice(index, 1);
    state.selectPoint.splice(index, 1);
  },
  delete_Line_single: function(state, index) {
    state.areaInfo.selectLine.splice(index, 1);
    state.selectLine.splice(index, 1);
  }
};

let actions = {
  // 获取地图上管点  管线列表
  getPointAndLine({commit}, data) {
    return new Promise((resolve, reject) => {
      getPointAndLine(data)
        .then(response => {
          if (response.success) {
            resolve(response);
            commit('update_point_and_line', {
              line: response.result.lines,
              point: response.result.points
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 改变选中的管点
  changeCheckedPoint({commit}, data) {
    commit('update_checked_point', data);
  },
  // 改变选中的管线
  changeCheckedLine({commit}, data) {
    commit('update_checked_line', data);
  },
  // 改变选中区域中的信息
  changeAreaInfo({commit}, data) {
    commit('update_area_info', data);
  },

  // 该表操作路线的状态
  changeHandleStatus({commit}, data) {
    commit('update_handle_status', data);
  },
  // 修改搜索内容
  changeSearchName({commit}, data) {
    commit('update_search_name', data);
  },
  // 获取区域列表
  getAreaListFunc({commit, state}) {
    return new Promise((resolve, reject) => {
      getAreaList({
        pageIndex: state.areaListInfo.pageIndex,
        maxResultCount: state.areaListInfo.maxResultCount,
        name: state.searchName
      })
        .then(response => {
          if (response.success) {
            commit('update_area_list', response.result);
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // 新增区域
  addAreaFunc({commit, dispatch}, data) {
    return new Promise((resolve, reject) => {
      insetArea(data)
        .then(resp => {
          if (resp.success) {
            Message({
              message: '新增片区成功',
              type: 'success',
              duration: 2 * 1000
            });
            resolve(resp);
            commit('update_handle_status', '');
            dispatch('getAreaListFunc');
          } else {
            Message({
              message: resp.error.message || '新增片区失败',
              type: 'error',
              duration: 2 * 1000
            });
            reject(resp);
          }
        })
        .catch(error => {
          Message({
            message: error.message || '新增片区失败',
            type: 'error',
            duration: 2 * 1000
          });
          reject(error);
        });
    });
  },

  // 编辑区域
  updataAreaFunc({commit, dispatch}, data) {
    return new Promise((resolve, reject) => {
      updateArea(data)
        .then(response => {
          if (response.success) {
            resolve(response);
            Message({
              message: '修改片区成功',
              type: 'success',
              duration: 2 * 1000
            });
            commit('update_handle_status', '');
            dispatch('getAreaListFunc');
          } else {
            reject(response);
            Message({
              message: response.error.message || '修改片区成功',
              type: 'error',
              duration: 2 * 1000
            });
          }
        })
        .catch(error => {
          reject(error);
          Message({
            message: error.message || '修改片区成功',
            type: 'error',
            duration: 2 * 1000
          });
        });
    });
  },

  // 删除区域
  deleteAreaFunc({commit, dispatch}, data) {
    console.log(commit);
    return new Promise((resolve, reject) => {
      console.log(deleteArea);
      deleteArea(data)
        .then(response => {
          if (response.success) {
            resolve(response);
            dispatch('getAreaListFunc');
          } else {
            reject(response);
            Message({
              type: 'error',
              message: response.error.message
            });
          }
        })
        .catch(error => {
          reject(error);
          Message({
            type: 'error',
            message: error.message
          });
        });
    });
  },

  // 根据id获取当前当前区域详细信息
  getAreaDetailInfo({commit}, data) {
    console.log(commit);
    console.log(data);
    return new Promise((resolve, reject) => {
      getAreaDetail(data)
        .then(response => {
          if (response.success) {
            commit('set_areaDetailsInfo', response.result);
            resolve(response);
          } else {
            reject(response);
            Message({
              type: 'error',
              message: response.error.message
            });
          }
        })
        .catch(error => {
          reject(error);
          Message({
            type: 'error',
            message: error.message
          });
        });
    });
  },

  // 改变选中表格的id列表
  chooseAreaId({commit}, data) {
    commit('update_choose_id', data);
  },

  // 改变表格显示数据
  changePageCount({commit}, data) {
    commit('update_page_count', data);
  },
  // 翻页
  changeCurrentPage({commit}, data) {
    commit('update_current_page', data);
  },

  // 删除设备触发
  deleteDeviceSigle({commit}, data) {
    if (data.type == 1) {
      commit('delete_device_single', data.index);
    } else {
      commit('delete_Line_single', data.index);
    }
  }
};

let getters = {
  lineLength(state) {
    let selectLine = state.selectLine || [];
    let lineLength = 0;
    for (let i = 0; i < selectLine.length; i++) {
      lineLength += selectLine[i].lineLength;
    }
    return lineLength;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
