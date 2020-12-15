import {Button, Image, message, Space, Table} from "antd";
import React, {Component} from "react";
import {deleteBrand, getBrandList} from "../../../api/brand";
import DeleteBrand from "./DeleteBrand";
import {Link} from "react-router-dom";

interface IBrand {
    id: number
    name: string
    logo: string
    description: string
}

interface IState {
    brandList: IBrand[]
    total: number
    perPage: number
    currentPage: number
    loading: boolean
}

class BrandList extends Component<any, IState> {
    state: IState = {
        brandList: [],
        total: 0,
        perPage: 15,
        currentPage: 1,
        loading: true
    }

    constructor(props: any, context: any) {
        super(props, context);
        this.getBrandList()
    }

    getBrandList = (page: number = 1) => {
        getBrandList(page).then(response => {
            const {data, total, perPage, currentPage} = response.data.data
            this.setState({
                brandList: data,
                total: total,
                perPage: perPage,
                currentPage: currentPage,
                loading: false
            })
        })
    }

    onChange = (page: number = 1) => {
        this.getBrandList(page)
    }
    deleteBrand = (brandId: number) => {
        this.setState({
            brandList: this.state.brandList.filter((brand: IBrand) => brand.id !== brandId)
        })
    }

    render() {
        return (
            <>
                <Table
                    dataSource={this.state.brandList}
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
                    rowKey={'id'}
                >
                    <Table.Column
                        dataIndex={'id'}
                        title={'ID'}
                    />
                    <Table.Column
                        dataIndex={'name'}
                        title={'名称'}
                    />
                    <Table.Column
                        width={200}
                        title={'logo'}
                        render={(brand: IBrand) => (<Image src={brand.logo}/>)}
                    />
                    <Table.Column
                        title={'logo'}
                        render={(brand: IBrand) => (
                            <Space>
                                <Link to={`/admin/brand/edit/${brand.id}`}>
                                    <Button type='primary'>编辑</Button>
                                </Link>
                                <DeleteBrand brandId={brand.id} callback={this.deleteBrand}/>
                            </Space>
                        )}
                    />
                </Table>
            </>
        )
    }
}

export default BrandList