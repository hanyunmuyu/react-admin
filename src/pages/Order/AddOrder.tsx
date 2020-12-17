import React, {Component} from "react";
import {Button, Form, Select} from "antd";
import {getUserList} from "../../api/user";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IUser {
    id: number
    name: string
    mobile: string
}

interface IState {
    userList: IUser[]
    loading: boolean
    keyword: string
}

export default class AddOrder extends Component<any, IState> {
    state: IState = {
        userList: [],
        loading: false,
        keyword: '',
    }
    searchUser = (value: string) => {
        if (value === '') {
            return
        }
        this.getUserList(
            1,
            {
                name: value,
            }
        );
    }
    getUserList = (page: number = 1, search: any = '') => {
        getUserList(page, search).then(response => {
            const {data} = response.data.data
            this.setState({
                userList: data,
                loading: false
            })
        })
    }
    handleChange = (value: any) => {
        this.setState({
            keyword: value
        })
    };

    render() {
        return (
            <>
                <Form
                    initialValues={{
                        keyword: this.state.keyword
                    }}
                    {...layout}
                >
                    <Form.Item
                        name={'keyword'}
                        label={'选择用户'}
                        valuePropName={'value'}
                    >
                        <Select
                            showSearch
                            onChange={this.handleChange}
                            onSearch={this.searchUser}
                            // onChange={this.handleChange}
                            placeholder={'输入用户名或者手机号搜索'}
                            notFoundContent={null}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                        >
                            {
                                this.state.userList.map(user => (
                                    < Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                                ))
                            }
                        </Select>


                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType="submit">新增</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}