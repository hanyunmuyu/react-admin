import {ReactNode} from "react";

export interface IRoute {
    id: string,//唯一标识
    exact?: boolean//是否精确匹配
    path: string//路由地址
    title: string//标题
    parentId?: number//父级id
    isMenu?: number//是否是菜单
    component?: ReactNode//路由的内容主体，有于显示该条路由的内容
    routes?: IRoute[]//子路由
    redirect?: string//重定向地址
    icon?: ReactNode//图标
}

export interface PermissionState {
    loading: boolean
    permissionList: IRoute[]
}
