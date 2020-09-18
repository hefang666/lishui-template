import request from '@/utils/request';
import {gsApi} from './api';

// 获取地图上的管点和管线列表
export function getPointAndLine() {
  return request({
    url: gsApi + 'GisStyleIconService/GetStyleIcon',
    method: 'get'
  });
}
