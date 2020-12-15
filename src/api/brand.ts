import request from '../utils/request'

export const getBrandList = (page: number = 1) => {
    return request({
        url: '/admin/brand/list',
        params: {
            page: page
        }
    })
}
export const deleteBrand = (brandId: number) => {
    return request({
        url: '/admin/brand/' + brandId,
        method: 'delete'
    })
}