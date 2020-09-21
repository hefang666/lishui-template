import request from '@/utils/request';
import {api} from '@/api/api.js';

// 获取任务列表
export function getTaskList(data) {
  return request({
    url: api + 'InspectionTaskService/GetTaskList',
    method: 'post',
    data
  });
}

// 新增任务
export function addTask(data) {
  return request({
    url: api + 'InspectionTaskService/InsertTask',
    method: 'post',
    data
  });
}

// 任务详情（查看、修改）
export function GetTaskDetails(data) {
  console.log(data);
  return request({
    url: api + 'InspectionTaskService/GetTaskDetails',
    method: 'post',
    data
  });
}

// 修改任务状态
export function UpdateTaskStatus(data) {
  return request({
    url: api + 'InspectionTaskService/UpdateTaskStatus',
    method: 'post',
    data
  });
}

// 删除任务
export function deleteTask(data) {
  return request({
    url: api + 'InspectionTaskService/DeleteTaskById',
    method: 'post',
    data
  });
}

// 获取设备点巡检信息列表
export function GetInspectionPointList(data) {
  return request({
    url: api + 'InspectionTaskService/GetInspectionPointList',
    method: 'post',
    data
  });
}

// 获取设备点巡检信息详情
export function GetPointDetails(data) {
  return request({
    url: api + 'InspectionTaskService/GetPointDetails',
    method: 'post',
    data
  });
}

// 获取片区信息
export function GetAreaByTaskId(data) {
  return request({
    url: api + 'InspectionTaskService/GetAreaByTaskId',
    method: 'post',
    data
  });
}
