// 访客管理模块
import request from '@/utils/request'

export function GetPageList(params) {
    return request({
        url: '/api/services/Security/VisitPointService/GetPageList', // 访客列表
        method: 'POST',
        data: params
    })
}