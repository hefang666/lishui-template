// 考勤管理模块
import request from '@/utils/request'

export function GetPageListAsync(params) {
    return request({
        url: '/api/WorkRecordService/GetPageListAsync', // 考勤列表
        method: 'POST',
        data: params
    })
}