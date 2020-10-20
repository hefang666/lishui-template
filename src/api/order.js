import request from '@/utils/request';
import {api} from '@/api/api.js';

// 获取工单列表
export function GetWorkOrderList(data) {
  console.log(data);
  return request({
    url: api + 'WorkOrderService/GetWorkOrderList',
    method: 'post',
    data
  });
}

// 获取工单详情
export function GetWorkOrderDetails(data) {
  return request({
    url: api + 'WorkOrderService/GetWorkOrderDetails',
    method: 'post',
    data
  });
}

// 删除工单
export function DeleteWorkOrder(data) {
  return request({
    url: api + 'WorkOrderService/DeleteWorkOrder',
    method: 'post',
    data
  });
}

// 关闭工单
export function CloseWorkOrder(data) {
  return request({
    url: api + 'WorkOrderService/CloseWorkOrder',
    method: 'post',
    data
  });
}

// 新增工单
export function InsertWorkOrder(data) {
  return request({
    url: api + 'WorkOrderService/InsertWorkOrder',
    method: 'post',
    data
  });
}
