import React, {Component} from "react";
import {getProductList} from "../../api/product";
import {Button, Space, Table} from "antd";

interface IProduct {
    id: number
    name: string
}

interface IState {
    productList: IProduct[]


    pageSize: number
    page: number
    perPage: number
    totalCount: number
}

export default class ProductList extends Component<any, IState> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            productList: [],
            page: 1,
            perPage: 15,
            totalCount: 0,
            pageSize: 0,
        }
    }

    getProductList = (page: number = 1) => {
        getProductList(page).then(response => {
            // 这个是接口返回的数据
            const {data: {currentPage, dataList, totalCount, limit}} = response.data
            this.setState({
                page: currentPage,
                productList: dataList,
                totalCount: totalCount,
                pageSize: limit
            })
        })
    }

    componentDidMount() {
        this.getProductList()
    }

    onChange = (page: number) => {
        this.getProductList(page)
    }

    render() {
        return (
            <>
                <Table
                    pagination={{
                        position: ['bottomCenter'],
                        total: this.state.totalCount,
                        hideOnSinglePage: true,
                        defaultCurrent: this.state.page,
                        defaultPageSize: this.state.perPage,
                        showSizeChanger: false,
                        onChange: this.onChange
                    }}
                    dataSource={this.state.productList}
                    rowKey='id'
                >
                    <Table.Column
                        title='ID'
                        dataIndex={'id'}/>
                    <Table.Column
                        title='产品名称'
                        dataIndex={'name'}/>
                    <Table.Column
                        title='管理'
                        render={(product: IProduct) => (
                            <Space>
                                <Button type='primary'>编辑</Button>
                                <Button type='primary' danger>删除</Button>
                            </Space>
                        )}
                    />
                </Table>

            </>
        )
    }
}
