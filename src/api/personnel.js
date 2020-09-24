import request from '@/utils/request';
import {api} from '@/api/api.js';

export function GetByDay(data) {
  return request({
    url: api + 'PersonService/GetByDay',
    method: 'post',
    data
  });
}

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
// 根据人人员ID获取考勤信息
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
