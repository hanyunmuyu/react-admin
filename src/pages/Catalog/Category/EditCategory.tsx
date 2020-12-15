import React, {Component, ReactNode} from "react";
import {withRouter} from "react-router-dom";
import {getAllCategory, getCategoryDetail, updateCategory} from "../../../api/category";
import {Button, Form, Input, message, Switch, TreeSelect} from "antd";
import TextArea from "antd/lib/input/TextArea";

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
    description: string
    id: number
    status: number
    parentId: number
    children?: ICategory[]
}


interface IState {
    categoryList: ICategory[]
    category?: ICategory

}

class EditCategory extends Component<any, IState> {
    state: IState = {
        categoryList: []
    }

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getAllCategory()
        this.getCategoryDetail()
    }

    getAllCategory = () => {
        getAllCategory().then(response => {
            const {data} = response.data
            this.setState({
                categoryList: data
            })
        })
    }
    getCategoryDetail = () => {
        getCategoryDetail(this.props.match.params.categoryId).then(response => {
            const {data} = response.data
            this.setState({
                category: data
            })
        })
    }
    updateCategory = (category: any) => {
        let categoryId = this.props.match.params.categoryId;
        if (category.parent_id === categoryId) {
            message.error('父级分类不可以是自身')
        } else {
            updateCategory(categoryId, category).then(response => {
                const {code, msg} = response.data
                if (code === 0) {
                    message.success('更新成功')
                    this.props.history.goBack()
                } else {
                    message.error(msg)
                }
            })
        }
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
                {
                    this.state.category ?
                        <Form
                            onFinish={this.updateCategory}
                            initialValues={{
                                category_name: this.state.category?.categoryName,
                                description: this.state.category?.description,
                                status: this.state.category?.status === 1,
                                parent_id: this.state.category?.parentId
                            }}
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
                                name={'description'}
                                label='描述'
                            >
                                <TextArea/>
                            </Form.Item>
                            <Form.Item
                                name={'parent_id'}
                                label='父级分类'
                                valuePropName='value'
                            >

                                <TreeSelect
                                    showSearch
                                    placeholder="选择分类"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    {this.generateTreeNode(this.state.categoryList)}
                                </TreeSelect>
                            </Form.Item>
                            <Form.Item
                                label='状态'
                                name={'status'}
                                valuePropName='checked'
                            >
                                <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked/>
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type='primary' htmlType='submit'>保存</Button>
                            </Form.Item>
                        </Form>
                        :
                        null
                }
            </>

        )
    }
}

export default withRouter(EditCategory)