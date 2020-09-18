import request from '@/utils/otherRequest';

export function getPeopleList(data) {
  return request({
    url: 'User/GetPersonnelSelector',
    method: 'get',
    params: data
  });
}

export function getOrganizationData() {
  return request({
    url: 'Orgagency/GetOrgagencyTreeByPersonnel',
    method: 'get'
  });
}

export function getRoleData() {
  return request({
    url: 'Role/GetRoleTree',
    method: 'get'
  });
}
