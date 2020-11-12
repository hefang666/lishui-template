import request from '@/utils/request';
import {gsApi, api} from './api';

// 获取地图上的管点和管线列表
export function getPointAndLine() {
  return request({
    url: gsApi + 'GisStyleIconService/GetStyleIcon',
    method: 'get'
  });
}

// 新增片区
export function insetArea(data) {
  return request({
    url: api + 'AreaService/InsertArea',
    method: 'post',
    timeout: 300000,
    data
  });
}

// 编辑片区
export function updateArea(data) {
  return request({
    url: api + 'AreaService/UpdateArea',
    method: 'post',
    timeout: 300000,
    data
  });
}

// 获取片区列表
export function getAreaList(data) {
  return request({
    url: api + 'AreaService/GetAreaLists',
    method: 'post',
    data
  });
}

// 删除片区
export function deleteArea(data) {
  return request({
    url: api + 'AreaService/DeleteArea',
    method: 'post',
    timeout: 300000,
    data
  });
}

// 根据片区id获取片区详细信息
export function getAreaDetail(data) {
  // console.log(data)
  return request({
    url: api + 'AreaService/GetGetAreaDetails',
    method: 'post',
    data,
    timeout: 10 * 1000
  });
}
