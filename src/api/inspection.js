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
