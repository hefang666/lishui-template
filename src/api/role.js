// 角色权限模块
import request from '@/utils/request'

export function GetOrgagencyTree(params) {
    return request({
        url: '/api/services/app/Orgagency/GetOrgagencyTree', // 获取组织机构树
        method: 'GET',
        params: params
    })
}
export function GetRoleList(params) {
    return request({
        url: '/api/services/app/Role/GetRoleList', // 获取角色列表
        method: 'GET',
        params: params
    })
}