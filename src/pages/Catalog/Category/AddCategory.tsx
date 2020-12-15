import React, {Component, ReactNode} from "react";
import {Button, Form, Input, message, Switch, TreeSelect} from 'antd';
import TextArea from "antd/lib/input/TextArea";
import {addCategory, getAllCategory} from "../../../api/category";

const {TreeNode} = TreeSelect;


const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface ICategory {
    categoryName: string
    id: number
    parentId: number
    children?: ICategory[]
}

interface IState {
    categoryList: []
}

class AddCategory extends Component<any, IState> {
    state: IState = {
        categoryList: []
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getAllCategory()
    }

    addCategory = (category: any) => {
        addCategory(category).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('添加成功！')
            } else {
                message.error(msg)
            }
        })
    }
    getAllCategory = () => {
        getAllCategory().then(response => {
            const {data} = response.data
            this.setState({
                categoryList: data
            })
        })
    }
    failed = (e: any) => {
        console.log(e.errorFields)
    }
    generateTreeNode = (categoryList?: ICategory[]): ReactNode => {
        return (
            <>
                {
                    categoryList?.map((category: ICategory) => {
                        return <TreeNode
                            value={category.id}
                            title={category.categoryName}
                            key={category.id}
                        >
                            {this.generateTreeNode(category.children)}
                        </TreeNode>
                    })
                }
            </>
        )

    }

    render() {
        return (
            <>
                <Form
                    onFinish={this.addCategory}
                    onFinishFailed={this.failed}
                    initialValues={{category_name: '', description: '', status: true, parent_id: undefined}}
                    {...layout}
                >
                    <Form.Item
                        name={'category_name'}
                        label='分类名称'
                        rules={[
                            {
                                required: true,
                                type: "string",
                                message: '分类名称不可以为空'
                            }
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name={'parent_id'}
                        label='父级分类'
                        valuePropName='value'
                    >

                        <TreeSelect
                            showSearch
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="选择分类"
                            allowClear
                            treeDefaultExpandAll
                        >
                            {this.generateTreeNode(this.state.categoryList)}
                        </TreeSelect>
                    </Form.Item>


                    <Form.Item
                        name={'description'}
                        label='描述'
                    >
                        <TextArea/>
                    </Form.Item>

                    <Form.Item
                        label='状态'
                        name={'status'}
                        valuePropName='checked'
                    >
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType='submit'>新增</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default AddCategory