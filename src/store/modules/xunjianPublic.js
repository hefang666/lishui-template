import {getPeopleList, getOrganizationData} from '@/api/other';
// import { reject } from 'core-js/fn/promise';

var state = {
  // 组织数据
  organizationData: [
    {
      id: 10294,
      orgCode: 'njls',
      orgName: '溧水智慧水务',
      orgType: 1,
      parentId: 0
    },
    {
      id: 10295,
      orgCode: 'njls',
      orgName: '溧水智慧水务1',
      orgType: 1,
      parentId: 0
    },
    {
      id: 10296,
      orgCode: 'njls',
      orgName: '溧水智慧水务2',
      orgType: 1,
      parentId: 0
    },
    {
      id: 10297,
      orgCode: 'njls',
      orgName: '溧水智慧水务子集1层1',
      orgType: 1,
      parentId: 10294
    },
    {
      id: 10298,
      orgCode: 'njls',
      orgName: '溧水智慧水务子集2层1',
      orgType: 1,
      parentId: 10297
    },
    {
      id: 10299,
      orgCode: 'njls',
      orgName: '溧水智慧水务1子集1层2',
      orgType: 1,
      parentId: 10295
    }
  ],
  personList: [
    {
      dingding: '',
      email: '',
      id: 10398,
      loginAccount: 'OK2',
      logoUrl: null,
      mobile: '12345678910',
      nickName: 'ok2',
      orgId: 10251,
      orgName: '调度中心',
      qq: '',
      spell: 'ok2',
      tel: '',
      trueName: 'ok2',
      wexin: ''
    },
    {
      dingding: '',
      email: '',
      id: 10399,
      loginAccount: 'test',
      logoUrl: null,
      mobile: '12345678910',
      nickName: 'ABCD',
      orgId: 10251,
      orgName: '调度中心',
      qq: '',
      spell: 'ok2',
      tel: '',
      trueName: 'ok2',
      wexin: ''
    }
  ],
  personPageIndex: 1,
  personMaxResultCount: 30,

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
  // 设置人员数据
  set_person_list: function(state, list) {
    state.personList = list;
  },
  // 设置组织数据
  set_organizationData: function(state, data) {
    state.organizationData = data;
  }
};

var actions = {
  getPeopleList({commit, state}) {
    var data = {
      pageIndex: state.personPageIndex,
      maxResultCount: state.personMaxResultCount
    };
    return new Promise((resolve, reject) => {
      getPeopleList(data)
        .then(response => {
          console.log(response);
          if (response.code) {
            commit('set_person_list', response);
            console.log(state.personList);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrganizationData({commit, state}) {
    return new Promise((resovle, reject) => {
      getOrganizationData()
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_organizationData', response.result);
            console.log(state.organizationData);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
