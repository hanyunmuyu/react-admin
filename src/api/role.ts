import request from '../utils/request'

export const getRoleList = () => {
    return request({
        url: '/admin/role/list',
        method: 'GET'
    })
}
export const deleteRole = (roleId: number) => {
    return request({
        url: '/admin/role/delete/' + roleId,
        method: 'delete'
    })
}

export const getRoleDetail = (roleId: number) => {
    return request({
        url: '/admin/role/detail/' + roleId
    })
}
export const saveRole = (roleId: number, roleName: string, permissionList: number[]) => {
    return request({
        url: '/admin/role/update/' + roleId,
        method: 'put',
        data: {
            roleName: roleName,
            permissionList: permissionList
        }
    })
}
export const addRole = (data: any) => {
    return request({
        url: '/admin/role/add',
        data: data,
        method: 'post'
    })
}
