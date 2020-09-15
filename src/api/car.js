// 车辆管理模块
import request from '@/utils/request'

export function InsertCar(params) {
    return request({
        url: '/api/services/Security/CarService/InsertCar', // 新增车辆
        method: 'POST',
        data: params
    })
}
export function GetByOrgIdPage(params) {
    return request({
        url: '/api/services/Security/CarService/GetByOrgIdPage', // 通过组织机构获取车辆列表(分页)
        method: 'POST',
        data: params
    })
}
export function GetByOrgId(params) {
    return request({
        url: '/api/services/Security/CarService/GetByOrgId', // 通过组织机构获取车辆列表(不分页)
        method: 'POST',
        data: params
    })
}
export function UpdateCar(params) {
    return request({
        url: '/api/services/Security/CarService/UpdateCar', // 修改车辆信息
        method: 'POST',
        data: params
    })
}
export function DeleteCar(params) {
    return request({
        url: '/api/services/Security/CarService/DeleteCar', // 删除车辆信息
        method: 'POST',
        data: params
    })
}
export function GetById(params) {
    return request({
        url: '/api/services/Security/CarService/GetById', // 获取车辆详情
        method: 'POST',
        data: params
    })
}
// 用车管理
export function GetByOrgIdCarUseRecord(params) {
    return request({
        url: '/api/services/Security/CarUseRecordService/GetByOrgId', // 根据组织机构获取用车列表
        method: 'POST',
        data: params
    })
}
export function AddCarUseRecord(params) {
    return request({
        url: '/api/services/Security/CarUseRecordService/InsertUseRecord', // 新增用车信息
        method: 'POST',
        data: params
    })
}
export function UpdateCarUseRecord(params) {
    return request({
        url: '/api/services/Security/CarUseRecordService/UpdateUseRecord', // 修改用车信息
        method: 'POST',
        data: params
    })
}
export function DeleteCarUseRecord(params) {
    return request({
        url: '/api/services/Security/CarUseRecordService/DeleteUseRecord', // 删除用车信息
        method: 'POST',
        data: params
    })
}
export function GetByIdCarUseRecord(params) {
    return request({
        url: '/api/services/Security/CarUseRecordService/GetById', // 获取用车详情
        method: 'POST',
        data: params
    })
}