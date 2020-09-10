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
        url: '/api/services/Security/VisitRecordService/InsertRecord', // 新增访客记录
        method: 'POST',
        data: params
    })
}
export function getInsertLeaveTime(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/InsertLeaveTime', // 添加离开时间
        method: 'POST',
        data: params
    })
}
export function DeleteRecord(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/DeleteRecord', // 删除访客记录
        method: 'POST',
        data: params
    })
}
export function GetPointPower(params) {
    return request({
        url: '/api/services/Security/VisitPointService/GetPointPower', // 当前登录人的访客点权限
        method: 'POST',
        data: params
    })
}
export function GetPagePointList(params) {
    return request({
        url: '/api/services/Security/VisitPointService/GetPageList', // 访客登记点列表
        method: 'POST',
        data: params
    })
}
export function InsertVisitPoint(params) {
    return request({
        url: '/api/services/Security/VisitPointService/InsertVisitPoint', // 新增访客登记点
        method: 'POST',
        data: params
    })
}
export function UpdateVisitPoint(params) {
    return request({
        url: '/api/services/Security/VisitPointService/UpdateVisitPoint', // 修改访客登记点
        method: 'POST',
        data: params
    })
}