import request from '@/utils/request';
import {api} from '@/api/api.js';

// 获取列表
export function GetDeviceInspectionList(data) {
  return request({
    url: api + 'DeviceService/GetDeviceInspectionList',
    method: 'post',
    data
  });
}

// 获取基本信息
export function GetDeviceInspectionDetails(data) {
  return request({
    url: api + 'DeviceService/GetDeviceInspectionDetails',
    method: 'post',
    data
  });
}

// 获取任务列表
export function GetDeviceTaskList(data) {
  return request({
    url: api + 'DeviceService/GetDeviceTaskList',
    method: 'post',
    data
  });
}

// 获取事件列表
export function GetDeviceEventList(data) {
  return request({
    url: api + 'DeviceService/GetDeviceEventList',
    method: 'post',
    data
  });
}
