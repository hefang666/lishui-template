import request from '@/utils/otherRequest';

export function getPeopleList(data) {
  return request({
    url: '/Personnel/GetPersonnelPagedList',
    method: 'post',
    data
  });
}

export function getOrganizationData() {
  return request({
    url: 'Orgagency/GetOrgagencyTreeByPersonnel',
    method: 'get'
  });
}
