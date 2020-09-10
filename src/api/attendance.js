// 考勤管理模块
import request from '@/utils/request'

export function GetPageList(params) {
    return request({
        url: '/api/services/Security/WorkRecordService/GetPageList', // 考勤列表
        method: 'POST',
        data: params
    })
}