import request from '@/utils/request';
import {api, personApi} from '@/api/api.js';

// 获取事件列表
export function GetEventList(data) {
  return request({
    url: api + 'EventService/GetEventList',
    method: 'post',
    data
  });
}

// 获取事件详情
export function GetEventDetails(data) {
  return request({
    url: api + 'EventService/GetEventDetails',
    method: 'post',
    data
  });
}

// 改变事件状态
export function UpdateEventById(data) {
  return request({
    url: api + 'EventService/UpdateEventById',
    method: 'post',
    data
  });
}

// 获取事件类型
export function getEventType(data) {
  console.log(data);
  return request({
    url: personApi + 'Dictionary/GetDictionaryByCateCode',
    method: 'get',
    params: data
  });
}
