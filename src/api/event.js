import request from '@/utils/request';
import {api} from '@/api/api.js';

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