var state = {
  personList: [
    {
      id: 1,
      name: '测试人员1',
      mobile: '12345678910',
      deptName: '仁寿供排水有限责任公司',
      nowDayEndTime: null,
      nowDayEndTimeString: '',
      nowDayStartTime: null,
      nowDayStartTimeString: '',
      positionName: '仁寿供排水有限责任公司管理员角色'
    },
    {
      id: 2,
      name: '测试人员1',
      mobile: '12345678910',
      deptName: '仁寿供排水有限责任公司',
      nowDayEndTime: null,
      nowDayEndTimeString: '',
      nowDayStartTime: null,
      nowDayStartTimeString: '',
      positionName: '仁寿供排水有限责任公司管理员角色'
    }
  ],
  areaList: [
    {
      id: 53,
      mustPoints: '104.1574,30.0169;',
      pipelineLength: 5.66,
      pointCount: '51',
      routeArea: '104.1639518737793,30.02238392829895;104.160475730896,30.021783113479614;104.15903806686401,30.025023221969604;104.15594816207886,30.02485156059265;104.15742874145508,30.0210964679718;104.15792226791382,30.018199682235718;104.15590524673462,30.01764178276062;104.15815830230713,30.01287817955017;104.16603326797485,30.014058351516724;104.16489601135254,30.01888632774353;104.1639518737793,30.02238392829895;',
      routeName: '每月巡检路线'
    }
  ],
  equipData: {
    devDtos: [
      {
        address: '城北路',
        deviceCode: 'JS50576',
        deviceName: '蝶阀',
        devicePoint: '104.15880336,30.01392323',
        deviceStatus: 0,
        deviceStatusString: '未知',
        deviceType: 0,
        id: 11339
      }
    ],
    pipDtos: [
      {
        address: '柏林路',
        deviceCode: 'JL16318',
        deviceName: '球墨铸铁',
        devicePoint: '104.157949755,30.017052704999998',
        deviceStatus: 0,
        deviceStatusString: '未知',
        deviceType: 1,
        id: 11340
      }
    ]
  }
};

var mutations = {
  set_person_list: function(state, list) {
    state.personList = list;
  }
};

var actions = {
  changePersonList({commit}, list) {
    commit('set_person_list', list);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
