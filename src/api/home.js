import request from '@/utils/request';
import {api} from '@/api/api';

// 获取人员列表,包含人员信息 任务 工单
export function getMemberList(data) {
  return request({
    url: api + 'PersonService/GetAllLocationAndTaskAndWorkOrderLists',
    method: 'post',
    data,
    timeout: 300000
  });
}
