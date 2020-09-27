import { GetOrgagencyTree } from '@/api/role';
const state = {
    tree: [
        { id: '' }
    ]
}

// getters
const getters = {

}

// actions
const actions = {
    async loadTreeData({ commit }) {
        GetOrgagencyTree().then(res => {
            if (res.success) {
                commit("SET_TREE", res.result)
            }
        })
    }
}

// mutations
const mutations = {
    SET_TREE(state, data) {
        state.tree = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}