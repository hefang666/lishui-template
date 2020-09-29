import {
  getPeopleList,
  getOrganizationData,
  getRoleData,
  GetAreaLists
} from '@/api/other';
import {filterArray, addIcon, processingNodes} from '@/utils/index';

var state = {
  // 组织树数据
  organizationData: [
    {
      id: 10294,
      orgCode: 'njls',
      orgName: '溧水智慧水务',
      orgType: 1,
      parentId: 0
    }
  ],
  // 按人员选择数据
  pinData: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ],
  // 角色树数据
  roleData: [],
  // 人员详情列表
  personList: [],
  persontotalCount: 1, // 人员总数据条数
  persontotalPages: 1, // 人员总页数

  // message提示消息
  messageText: '',
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
    ],
    areaTotal: 1
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
  },
  // 设置选择人员搜索到的数据
  set_personPage: function(state, data) {
    state.persontotalCount = data.totalCount;
    state.persontotalPages = data.totalPages;
  },
  // 设置角色树数据
  set_roleData: function(state, data) {
    state.roleData = data;
    console.log(state.roleData);
  },
  // 设置提示消息
  set_message: function(state, data) {
    state.messageText = data;
  },
  // 设置片区列表信息
  set_areaList: function(state, data) {
    state.areaList = data;
  },
  // 设置片区页数信息
  set_areaPagesInfo: function(state, data) {
    state.areaTotal = data;
    console.log(state.areaTotal);
  }
};

var actions = {
  getPeopleList({commit}, data) {
    return new Promise((resolve, reject) => {
      getPeopleList(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_person_list', response.result.items);
            commit('set_personPage', {
              totalCount: response.result.totalCount,
              totalPages: response.result.totalPages
            });
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getOrganizationData({commit}) {
    return new Promise((resolve, reject) => {
      getOrganizationData()
        .then(response => {
          console.log(response);
          if (response.success) {
            var orgData = filterArray(response.result);
            orgData = addIcon(orgData);
            commit('set_organizationData', orgData);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getRoleData({commit}) {
    return new Promise((resolve, reject) => {
      getRoleData()
        .then(response => {
          console.log(response);
          if (response.success) {
            for (var i = 0; i < response.result.length; i++) {
              response.result[i].roleName = response.result[i].orgName;
            }
            var data = [
              {
                id: 10249,
                orgName: '仁寿供排水有限责任公司',
                orgType: 1,
                orgTypeToString: null,
                parentId: 0,
                roleItems: [
                  {
                    roleId: 163151,
                    roleName: '仁寿供排水有限责任公司管理员角色'
                  }
                ]
              },
              {
                id: 10251,
                orgName: '调度中心',
                orgType: 2,
                orgTypeToString: null,
                parentId: 10249,
                roleItems: [
                  {
                    roleId: 163159,
                    roleName: '121'
                  }
                ]
              }
            ];
            var roles = filterArray(data);
            roles = processingNodes(roles);
            roles = addIcon(roles);
            commit('set_roleData', roles);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 获取片区列表
  getAreaLists({commit}, data) {
    return new Promise((resolve, reject) => {
      GetAreaLists(data)
        .then(response => {
          console.log(response);
          if (response.success) {
            commit('set_areaList', response.result.items);
            commit('set_areaPagesInfo', response.result.totalCount);
            resolve(response);
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
