import {areaList} from '../data.js';
let state = {
  // 区域列表
  areaList: areaList.result.items,
  totalCount: areaList.totalCount
};

let mutations = {};

let actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
