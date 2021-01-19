import React, {Component} from "react";
import {Button, Form, Input, Modal, Space} from "antd";

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IUser {
    id: number
    name: string
    mobile: string
    avatar: string
    email: string
}

interface IProps {
    visible: boolean
    user?: IUser
    callback: (visible: boolean, user?: IUser) => void
}

interface IState {
    user?: IUser
}

class EditUser extends Component<IProps, IState> {
    handleCancel = () => {
        this.props.callback(false)
    }
    saveUser = (user: IUser) => {
        user.id = this.props.user?.id as number
        this.props.callback(false, user)
    }

    render() {
        return (
            <>
                <Modal
                    title="编辑管理员信息"
                    visible={this.props.visible}
                    onCancel={this.handleCancel}
                    cancelText='取消'
                    okText='确认'
                    footer={null}
                >
                    {
                        this.props.user ?
                            <Form
                                onFinish={this.saveUser}
                                initialValues={{
                                    ...this.props.user
                                }}
                            >
                                <Form.Item
                                    label='姓名'
                                    name='name'
                                    rules={[{required: true, message: '用户姓名不可以为空'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    label='手机号'
                                    name='mobile'
                                    rules={[{required: true, message: '手机号不可以为空'}]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            提交
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                            :
                            null
                    }
                </Modal>
            </>
        )
    }
}

export default EditUser
