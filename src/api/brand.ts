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
export const getBrandDetail = (brandId: number) => {
    return request({
        url: '/admin/brand/' + brandId
    })
}
export const updateBrand = (brandId: number, brand: any) => {

    return request({
        url: '/admin/brand/' + brandId,
        data: brand,
        method: 'put'
    })
}
export const getAllBrand = () => {
    return request({
        url: '/admin/brand/all'
    })
}