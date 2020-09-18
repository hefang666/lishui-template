import request from '@/utils/request';

export function getTaskList(data) {
  return request({
    url: 'InspectionTaskService/GetTaskList',
    method: 'post',
    data
  });
}

export function addTask(data) {
  console.log(data)
  return request({
    url: 'InspectionTaskService/InsertTask',
    method: 'post',
    data
  });
}
