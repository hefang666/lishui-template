var state = {
    map: {},
    memberList: [{
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
    }
};

var actions = {
    changeMap({ commit }, map) {
        commit('update_map', map);
    },
    changeMenberList({ commit }, list) {
        commit('update_memberList', list);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};