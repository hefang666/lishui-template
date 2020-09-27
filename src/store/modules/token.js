const state = {
    token: ''
};

const mutations = {
    set_token: (state, token) => {
        state.token = token
    }
};


export default {
    state,
    mutations,
};