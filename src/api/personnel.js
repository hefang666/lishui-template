import request from '@/utils/request';
import {api} from '@/api/api.js';

export function GetByDay(data) {
  return request({
    url: api + 'PersonService/GetByDay',
    method: 'post',
    data
  });
}

// 导出某人某月的出勤记录
export function ExportMonthList(data) {
  return request({
    url: api + 'PersonService/ExportMonthList',
    method: 'post',
    data
  });
}

// 导出
export function ExportList(data) {
  return request({
    url: api + 'PersonService/ExportList',
    method: 'post',
    data
  });
}

// 根据人员ID获取考勤信息
export function GetByUserId(data) {
  return request({
    url: api + 'PersonService/GetByUserId',
    method: 'post',
    data
  });
}

//查询某人某天的所有位置信息
export function GetLocationList(data) {
  return request({
    url: api + 'PersonService/GetLocationList',
    method: 'post',
    data
  });
}

// 通过id获取人员综合情况
export function GetGeneralSituation(data) {
  return request({
    url: api + 'PersonService/GetGeneralSituation',
    method: 'post',
    data
  });
}

// 通过人员id获取该人员负责的任务
export function GetTaskList(data) {
  return request({
    url: api + 'PersonService/GetTaskList',
    method: 'post',
    data
  });
}

// 通过人员id获取该人员负责的计划
export function GetPlanByUserId(data) {
  return request({
    url: api + 'PersonService/GetPlanByUserId',
    method: 'post',
    data
  });
}

// 通过人员id获取该人员负责的工单
export function GetWorkOrderByUserId(data) {
  return request({
    url: api + 'PersonService/GetWorkOrderByUserId',
    method: 'post',
    data
  });
}
