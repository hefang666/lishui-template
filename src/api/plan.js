import request from '@/utils/request';
import {api} from '@/api/api.js';

// 获取列表
export function getPlanList(data) {
  return request({
    url: api + 'PlanService/GetPlanList',
    method: 'post',
    data
  });
}

// 新增计划
export function addPlan(data) {
  return request({
    url: api + 'PlanService/InsertPlan',
    method: 'post',
    data
  });
}

// 获取详情
export function getPlanDetails(data) {
  return request({
    url: api + 'PlanService/GetPlanDetailsById',
    method: 'post',
    data
  });
}
