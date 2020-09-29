import {getMemberList} from '@/api/home';
var state = {
  map: {},
  searchName: '',
  pageNum: 1,
  pageCount: 10,
  pageTotal: 10,
  memberList: [
    {
      id: 1,
      name: '李四四',
      phone: '133-3333-3333',
      location: '106.548293, 29.565552'
    },
    {
      id: 2,
      name: '张三',
      phone: '133-3333-3333',
      location: '106.552974, 29.567178'
    }
  ]
};

var mutations = {
  update_map: (state, map) => {
    state.map = map;
  },
  update_memberList: (state, list) => {
    state.memberList = list;
  },
  update_search_word: (state, word) => {
    state.searchName = word;
  },
  update_page_count: (state, word) => {
    state.pageCount = word;
  },
  update_page_num: (state, word) => {
    state.pageNum = word;
  },
  update_page_total: (state, word) => {
    state.pageTotal = word;
  }
};

var actions = {
  changeMap({commit}, map) {
    commit('update_map', map);
  },
  // changeMenberList({commit}, list) {
  // },

  // 获取人员列表
  getMemberList({commit, state}) {
    let options = {
      userName: state.searchName,
      pageIndex: state.pageNum,
      maxResultCount: state.pageCount,
      status: 0
    };
    return new Promise((resolve, reject) => {
      getMemberList(options)
        .then(response => {
          if (response.success) {
            resolve(response);
            commit('update_memberList', response.result.items);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
    // commit('update_memberList', list);
  },

  // 改变搜索文本
  changeSearchName({commit}, word) {
    commit('update_search_word', word);
  },
  // 改变搜索页面
  changePageNum({commit}, num) {
    commit('update_page_num', num);
  },
  // 改变搜索每页的数量
  changePageCount({commit}, num) {
    commit('update_page_count', num);
  },
  changePageTotal({commit}, num) {
    commit('update_page_total', num);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
