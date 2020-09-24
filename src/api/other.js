import request from '@/utils/otherRequest';

// 获取人员
export function getPeopleList(data) {
  return request({
    url: 'services/app/User/GetPersonnelSelector',
    method: 'get',
    params: data
  });
}

// 获取组织树信息
export function getOrganizationData() {
  return request({
    url: 'services/app/Orgagency/GetOrgagencyTreeByPersonnel',
    method: 'get'
  });
}

// 获取角色树信息
export function getRoleData() {
  return request({
    url: 'services/app/Role/GetRoleTree',
    method: 'get'
  });
}
