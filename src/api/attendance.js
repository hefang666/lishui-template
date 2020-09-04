// 考勤管理模块api
import request from '@/utils/request'

export function GetPageListAsync(params) {
    return request({
        url: '/api/services/app/AppVersionService/AddAppVersion', // 考勤列表
        method: 'POST',
        data: params
    })
}