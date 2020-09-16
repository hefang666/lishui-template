var state = {
    map: {},
    memberList: [{
            id: 1,
            number: '渝A88888',
            status: '正常行驶',
            signal: '强',
            name: '张三',
            location: '106.548293, 29.565552',
            speed: '60km/h'
        },
        {
            id: 2,
            number: '渝B66666',
            status: '离线',
            signal: '强',
            name: '李四',
            location: '106.612974, 29.614178',
            speed: '80km/h'
        },
        {
            id: 3,
            number: '渝c77777',
            status: '休眠',
            signal: '弱',
            name: '王五',
            location: '106.482974, 29.614178',
            speed: '100km/h'
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