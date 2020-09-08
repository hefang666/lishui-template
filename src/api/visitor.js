// 访客管理模块
import request from '@/utils/request'

export function PostUserList(params) {
    return request({
        url: '/api/services/app/User/PostUserList', // 用户列表
        method: 'POST',
        data: params
    })
}
export function getUpload(params) {
    return request({
        url: '/api/UploadFiles/UploadProfilePicture', // 上传文件
        method: 'POST',
        data: params
    })
}
export function GetPageList(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/GetPageList', // 访客列表
        method: 'POST',
        data: params
    })
}
export function GetById(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/GetById', // 访客详情
        method: 'POST',
        data: params
    })
}
export function GetInsertRecord(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/InsertRecord', // 访客新增
        method: 'POST',
        data: params
    })
}