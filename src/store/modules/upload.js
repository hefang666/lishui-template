var state = {
  fileListData: [],
  actionUrl: 'http://192.168.9.44:9090/api/UploadFiles/UploadProfilePicture',
  httpUrl: 'http://192.168.9.44:9090/'
};

var mutations = {
  set_fileListData: function(state, data) {
    state.fileListData = data;
  }
};

var actions = {
  setFileListData({commit}, data) {
    commit('set_fileListData', data);
  },
  // 下载（图片）
  downloadFile({state}, data) {
    console.log(data);
    var downLoadUrl =
      state.httpUrl +
      'api/UploadFiles/DownloadFile?fileName=' +
      data.fileName +
      '&downLoadName=' +
      data.downLoadName;
    window.open(downLoadUrl);
  },
  // 删除（图片）
  delFil({commit}, data) {
    console.log(commit);
    console.log(data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
