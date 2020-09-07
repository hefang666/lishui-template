import request from '@/utils/request';

export function getPlanList(data) {
  return request({
    url: 'GetPlanList',
    method: 'post',
    data
  });
}
