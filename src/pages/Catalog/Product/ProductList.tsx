import React, {Component} from "react";
import {Button, Form, Image, Input, Space, Table} from "antd";
import {Link} from "react-router-dom";
import {getProductList} from "../../../api/product";
import DeleteProduct from "./DeleteProduct";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";
import Tag from "antd/es/tag";

interface IBrand {
    id: number
    name: string
}

interface IProduct {
    id: number
    brand?: IBrand
    productName: string
    model: string
    price: number
    quantity: number
    status: number
    img: string
}

interface IProductListState {
    productList: IProduct[]
    total: number
    perPage: number
    currentPage: number
    loading: boolean
    selectedRowKeys: any[]
    rowSelection: boolean
    orderProductList: IProduct[]
}

class ProductList extends Component<any, IProductListState> {
    state: IProductListState = {
        productList: [],
        total: 0,
        perPage: 15,
        currentPage: 1,
        loading: true,
        selectedRowKeys: [],
        rowSelection: false,
        orderProductList: []
    }


    constructor(props: Readonly<any> | any) {
        super(props);
        this.getProductList()
    }

    onChange = (page: number = 1) => {
        this.getProductList(page)
    }

    getProductList = (page: number = 1, keyword: any = '') => {
        getProductList(page, keyword).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                productList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage,
                loading: false
            })
        })
    }
    deleteProduct = (productId: number) => {
        this.setState({
            productList: this.state.productList.filter((p) => p.id !== productId)
        })
    }
    search = (keyword: any) => {
        this.getProductList(1, keyword)
    }
    onSelectChange = (selectedRowKeys: any) => {
        let idSet = new Set(selectedRowKeys)
        let idFilterSet = new Set(this.state.orderProductList.map(product => product.id))
        this.setState({
            selectedRowKeys: selectedRowKeys,
            orderProductList: [...this.state.orderProductList, ...this.state.productList.filter(product => !idFilterSet.has(product.id))].filter(product => idSet.has(product.id)).sort((a, b) => b.id - a.id)
        })
        console.log(idSet)
    }
    showRowSelection = () => {
        this.setState({
            rowSelection: !this.state.rowSelection
        })
    }
    deleteOrderProduct = (productId: number) => {
        this.setState({
            orderProductList: this.state.orderProductList.filter(product => product.id !== productId),
            selectedRowKeys: this.state.selectedRowKeys.filter(key => key !== productId),
        })
    }

    render() {
        return (
            <>

                {
                    this.state.rowSelection ?
                        <div>

                            <Table
                                pagination={{disabled: true, hideOnSinglePage: true, defaultPageSize: 9999}}
                                dataSource={this.state.orderProductList}
                                rowKey={'id'}
                                footer={() => this.state.orderProductList.length > 0 ?
                                    <Button style={{float: "right"}} type='primary'>选好了</Button> : null}
                            >
                                <Table.Column
                                    dataIndex={'id'}
                                    title={'id'}/>
                                <Table.Column
                                    fixed='left'
                                    title={'产品名称'}
                                    width={168}
                                    dataIndex={'productName'}
                                />
                                <Table.Column
                                    title={'价格'}
                                    dataIndex={'price'}
                                />
                                <Table.Column
                                    title={'管理'}
                                    render={(product) => (<Button type='primary' onClick={() => {
                                        this.deleteOrderProduct(product.id)
                                    }} danger>删除</Button>)}/>
                            </Table>
                        </div>
                        :
                        null
                }

                <Form
                    onFinish={this.search}
                    layout={"inline"}
                    style={{
                        marginBottom: '26px'
                    }}
                >
                    <Form.Item>
                        <Input.Search
                            addonBefore='搜索：'
                            placeholder='输入关键词查询'
                            allowClear
                            onSearch={this.search}
                            enterButton={<SearchOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button href={'/admin/catalog/product/add'} type='primary' icon={<PlusOutlined/>}>
                                新增产品
                            </Button>
                            <Button type="primary" onClick={this.showRowSelection} icon={<PlusOutlined/>}>选择产品</Button>
                        </Space>
                    </Form.Item>
                </Form>

                <Table
                    rowSelection={this.state.rowSelection ? {
                        hideSelectAll: true,
                        preserveSelectedRowKeys: true,
                        selectedRowKeys: this.state.selectedRowKeys,
                        onChange: this.onSelectChange,
                    } : undefined}
                    scroll={{x: 1500}}
                    rowKey='id'
                    loading={this.state.loading}
                    pagination={{
                        position: ['bottomCenter'],
                        hideOnSinglePage: true,
                        pageSize: this.state.perPage,
                        total: this.state.total,
                        current: this.state.currentPage,
                        onChange: this.onChange,
                        showSizeChanger: false
                    }}
                    dataSource={this.state.productList}
                >
                    <Table.Column
                        fixed='left'
                        title={'ID'}
                        width={68}
                        dataIndex={'id'}
                    />
                    <Table.Column
                        fixed='left'
                        title={'产品名称'}
                        width={168}
                        dataIndex={'productName'}
                    />
                    <Table.Column
                        title={'品牌'}
                        render={(product: IProduct) => (<div>
                            {product.brand?.name}
                        </div>)}
                    />
                    <Table.Column
                        title={'图片'}
                        dataIndex={'img'}
                        render={(img: string) => {
                            return (
                                <Image
                                    width={100}
                                    src={img}
                                />
                            )
                        }}
                    />
                    <Table.Column
                        title={'型号'}
                        dataIndex={'model'}
                    />
                    <Table.Column
                        title={'价格'}
                        dataIndex={'price'}
                    />
                    <Table.Column
                        title={'数量'}
                        dataIndex={'quantity'}
                    />
                    <Table.Column
                        title={'状态'}
                        render={(product: IProduct) => {
                            return (
                                <>
                                    {
                                        product.status === 1 ?
                                            <Tag color="success">启用</Tag>
                                            :
                                            <Tag color="warning">禁用</Tag>
                                    }
                                </>
                            )
                        }}
                    />
                    <Table.Column
                        fixed={'right'}
                        title={'管理'}
                        render={(product: IProduct) => {
                            return (
                                <>
                                    <Space>
                                        <Button type='primary'>
                                            <Link to={'/admin/catalog/product/edit/' + product.id}>
                                                编辑
                                            </Link>
                                        </Button>
                                        <DeleteProduct productId={product.id} callback={this.deleteProduct}/>
                                    </Space>
                                </>
                            )
                        }}
                    />
                </Table>
            </>
        );
    }
}

export default ProductList