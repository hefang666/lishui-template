import {areaList} from '../data.js';
import {getPointAndLine} from '@/api/area';
let state = {
  // 区域列表
  areaList: areaList.result.items,
  totalCount: areaList.totalCount,
  // 片区管线列表
  pointList: [],
  // 片区管点列表
  lineList: [],
  // 选中的管线和管点
  checkedPoint: [],
  checkedLine: []
};

let mutations = {
  update_point_and_line: function(state, data) {
    state.pointList = data.line;
    state.lineList = data.point;
  },
  update_checked_point: function(state, data) {
    state.checkedPoint = data;
  },
  update_checked_line: function(state, data) {
    state.checkedLine = data;
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
