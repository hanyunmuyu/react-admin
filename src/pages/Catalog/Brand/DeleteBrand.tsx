import React, {Component} from "react";
import {Button, message, Popconfirm} from "antd";
import { deleteBrand } from "../../../api/brand";

interface IProps {
    brandId: number
    callback: (brandId: number) => void
}

export default class DeleteBrand extends Component<IProps, any> {
    deleteBrand = () => {
        deleteBrand(this.props.brandId).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('删除成功！')
                this.props.callback(this.props.brandId)
            } else {
                message.error(msg)
            }
        })
    }

    cancel = () => {
        message.info('取消删除')
    }

    render() {
        return (
            <>
                <Popconfirm
                    title='你确定要删除么？删除后不可以恢复！'
                    okText='确认'
                    cancelText='取消'
                    onConfirm={this.deleteBrand}
                    onCancel={this.cancel}
                >
                    <Button type='primary' danger>删除</Button>
                </Popconfirm>
            </>
        )
    }
}