import request from '@/utils/request';

export function getTaskList(data) {
  return request({
    url: 'InspectionTaskService/GetTaskList',
    method: 'post',
    data
  });
}