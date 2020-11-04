// 访客管理模块
import request from '@/utils/request'

export function PostUserList(params) {
    return request({
        url: '/api/services/app/User/PostUserList', // 用户列表
        method: 'POST',
        data: params
    })
}
export function GetOrgUserList(params) {
    return request({
        url: '/api/services/app/User/GetOrgUserList', // 根据组织机构获取当前租户用户
        method: 'GET',
        params: params
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
        url: '/api/services/Security/VisitRecordService/GetPageList', // 获取访客列表
        method: 'POST',
        data: params
    })
}
export function GetById(params) {
    return request({
        url: '/api/services/Security/VisitRecordService/GetById', // 获取访客详情
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
export function DeleteVisitPoint(params) {
    return request({
        url: '/api/services/Security/VisitPointService/DeleteVisitPoint', // 删除访客登记点
        method: 'POST',
        data: params
    })
}
export function GetByCode(params) {
    return request({
        url: '/api/services/Security/VisitPointService/GetByCode', // 根据访客点code查询访客点信息
        method: 'POST',
        data: params
    })
}
export function GetRoleTree(params) {
    return request({
        url: '/api/services/app/Role/GetRoleTree', // 获取角色树
        method: 'GET',
        params: params
    })
}
export function GetPowerToRole(params) {
    return request({
        url: '/api/services/Security/VisitPointService/PowerToRole', // 给访客点新增或修改角色的权限
        method: 'POST',
        data: params
    })
}
export function GetByIdSearch(params) {
    return request({
        url: '/api/services/Security/VisitPointService/GetById', // 根据访客点Id查询访客登记点及机构和角色权限
        method: 'POST',
        data: params
    })
}