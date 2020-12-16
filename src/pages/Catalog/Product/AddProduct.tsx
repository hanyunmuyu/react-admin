import React, {Component} from "react";
import {Button, Form, Input, InputNumber, message, Select, Tabs, TreeSelect, Upload} from "antd";
import TextArea from "antd/es/input/TextArea";
import {PlusOutlined} from '@ant-design/icons';
import {UploadFile} from "antd/es/upload/interface";
import {RcFile, UploadChangeParam} from "antd/lib/upload/interface";
import {get} from "../../../utils/storage";
import {addProduct} from "../../../api/product";
import {getAllCategory} from "../../../api/category";
import {TreeNode} from "antd/es/tree-select";
import AddGoods from "./AddGoods";
import {FormInstance} from "antd/lib/form";
import {withRouter} from "react-router-dom";
import {getAllBrand} from "../../../api/brand";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};
const {TabPane} = Tabs;

interface IProduct {
    product_ame: string
    description: string
    model: string
    price: number
    quantity: number
    imgList: string[]
}

interface ICategory {
    categoryName: string
    description: string
    id: number
    status: number
    parentId: number
    children?: ICategory[]
}

interface IBrand {
    id: number
    name: string
}

interface IState {
    fileList: UploadFile[]
    product?: IProduct
    categoryList: ICategory[]
    brandList: IBrand[]
}

class AddProduct extends Component<any, IState> {
    state: IState = {
        fileList: [],
        categoryList: [],
        brandList: []
    }
    formRef = React.createRef<FormInstance>();

    constructor(props: Readonly<any> | any) {
        super(props);
        this.getAllCategory()
        this.getAllBrand()
    }

    getAllBrand = () => {
        getAllBrand().then(response => {
            const {data} = response.data
            this.setState({
                brandList: data
            })
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
    change = (key: any) => {
    }
    handleChange = (info: UploadChangeParam) => {
        this.setState({
            fileList: info.fileList
        });
    }
    addProduct = (product: any) => {
        let optionList: any[] = [];
        product.optionList?.forEach((v: any) => {
            if (v === undefined) {
                return
            }
            v.forEach((v1: any) => {
                optionList.push(v1);
            });
        })
        product.optionList = optionList;
        let imgList: string[] = []
        this.state.fileList.forEach((f) => {
            if (f.response !== undefined) {
                imgList.push(f.response.url)
            }
        })
        product.imgList = imgList
        addProduct(product).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('添加成功！')
                this.props.history.goBack()
            } else {
                message.error(msg)
            }
        })
    }
    beforeUpload = (file: RcFile, FileList: RcFile[]): boolean => {
        let imgSet = new Set();
        imgSet.add('image/png')
        imgSet.add('image/jpg')
        imgSet.add('image/jpeg')
        imgSet.add('image/gif')
        if (!imgSet.has(file.type)) {
            message.error(`文件类型不允许`);
            return false
        }
        return true;
    }

    render() {
        return (
            <>
                <Form
                    ref={this.formRef}
                    {...layout}
                    initialValues={{
                        product_name: 'product',
                        description: 'description',
                        model: 'model',
                        price: 0,
                        quantity: 0,
                        categoryIds: [],
                        valueList: [],
                        optionList: []
                    }}
                    onFinish={this.addProduct}
                >
                    <Tabs defaultActiveKey="1" onChange={this.change}>
                        <TabPane tab="通用属性" key="1">
                            <Form.Item
                                name='product_name'
                                label='名称'
                                rules={[{
                                    type: "string",
                                    message: '产品名称不可以为空',
                                    required: true
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label='产品型号'
                                name='model'
                                rules={[
                                    {
                                        type: "string",
                                        required: true,
                                        message: '产品型号不可以为空'
                                    }
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label={'品牌'}
                                name={'brand_id'}
                                valuePropName={'value'}
                                rules={[
                                    {
                                        required: true,
                                        message: '选择品牌'
                                    }
                                ]}
                            >
                                <Select placeholder={'选择品牌'}>
                                    {
                                        this.state.brandList ?
                                            this.state.brandList.map(brand => (
                                                <Select.Option value={brand.id}
                                                               key={brand.id}>{brand.name}
                                                </Select.Option>)
                                            )

                                            :
                                            null
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={'categoryIds'}
                                label='分类'
                                valuePropName='value'
                            >
                                <TreeSelect
                                    multiple
                                    showSearch
                                    placeholder="选择分类"
                                    allowClear
                                    treeDefaultExpandAll
                                >
                                    {
                                        this.state.categoryList.map((category: ICategory) => {
                                            return <TreeNode
                                                value={category.id}
                                                title={category.categoryName}
                                                key={category.id}
                                            >
                                                {
                                                    category.children?.map((cate: ICategory) => {
                                                        return (
                                                            <TreeNode
                                                                value={cate.id}
                                                                title={cate.categoryName}
                                                                key={cate.id}>
                                                                {
                                                                    cate.children?.map((c: ICategory) => (
                                                                        <TreeNode
                                                                            value={c.id}
                                                                            title={c.categoryName}
                                                                            key={c.id}>
                                                                        </TreeNode>
                                                                    ))
                                                                }
                                                            </TreeNode>
                                                        )
                                                    })
                                                }
                                            </TreeNode>
                                        })
                                    }
                                </TreeSelect>
                            </Form.Item>
                            <Form.Item
                                label='产品价格'
                                name='price'
                                rules={[
                                    {
                                        type: "number",
                                        required: true,
                                        validator: (rule, value) => {
                                            if (value < 0) {
                                                return Promise.reject('产品价格应>=0')
                                            }
                                            return Promise.resolve()
                                        }
                                    }
                                ]}
                            >
                                <InputNumber min={0} step={0.01}/>
                            </Form.Item>
                            <Form.Item
                                label='产品数量'
                                name='quantity'
                                rules={[
                                    {
                                        type: "number",
                                        required: true,
                                        min: 0,
                                        validator: (rule, value) => {
                                            if (value < 0) {
                                                return Promise.reject('产品数量不可以小于0');
                                            }
                                            return Promise.resolve()
                                        }
                                    }
                                ]}
                            >
                                <InputNumber min={0} step={1}/>
                            </Form.Item>
                            <Form.Item
                                label='描述'
                                name='description'
                                rules={[
                                    {
                                        type: "string",
                                        required: true,
                                        message: '产品描述不可以为空'
                                    }
                                ]}
                            >
                                <TextArea/>
                            </Form.Item>
                        </TabPane>
                        <TabPane tab="图片" key="2">
                            <Form.Item label=''>
                                <Upload
                                    name={'file'}
                                    beforeUpload={this.beforeUpload}
                                    headers={{'Authorization': 'Bearer ' + get('token')}}
                                    onChange={this.handleChange}
                                    action={process.env.REACT_APP_BASE_API + '/admin/upload'}
                                    listType="picture-card"
                                    fileList={this.state.fileList}
                                >
                                    {
                                        this.state.fileList.length >= 8 ?
                                            null
                                            :
                                            <div>
                                                <PlusOutlined/>
                                                <div style={{marginTop: 8}}>Upload</div>
                                            </div>
                                    }


                                </Upload>

                            </Form.Item>
                        </TabPane>
                        <TabPane tab='添加商品' key='3'>
                            <AddGoods/>
                        </TabPane>
                    </Tabs>
                    <Form.Item {...tailLayout}>
                        <Button type='primary' htmlType="submit">新增</Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

export default withRouter(AddProduct)