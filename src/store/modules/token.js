const state = {
  token: ''
};

const mutations = {
  add_token: (state, tokens) => {
    state.token = tokens;
  }
};

export default {
  state,
  mutations
};
