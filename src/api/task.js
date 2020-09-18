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
