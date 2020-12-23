import request from '@/utils/request';
import {personApi, api} from '@/api/api.js';

// 获取人员
export function getPeopleList(data) {
  return request({
    url: personApi + 'User/GetPersonnelSelector',
    method: 'get',
    params: data
  });
}

// 获取组织树信息
export function getOrganizationData() {
  return request({
    url: personApi + 'Orgagency/GetOrgagencyTreeByPersonnel',
    method: 'get'
  });
}

// 获取角色树信息
export function getRoleData() {
  return request({
    url: personApi + 'Role/GetRoleTree',
    method: 'get'
  });
}

// 获取片区列表
export function GetAreaLists(data) {
  return request({
    url: api + 'AreaService/GetAreaLists',
    method: 'post',
    data
  });
}

// 获取当前登录用户信息
export function getCurrentUserInfo() {
  return request({
    url: personApi + 'User/GetCurrentUserDetail',
    method: 'get'
  });
}
