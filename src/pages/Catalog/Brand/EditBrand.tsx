import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {getBrandDetail, updateBrand} from "../../../api/brand";
import {RouteComponentProps} from "react-router";
import {Button, Form, Input, message} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 16},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

interface IProps extends RouteComponentProps {
}

interface IBrand {

}

interface IState {
    brand?: IBrand
}

class EditBrand extends Component<IProps, IState> {
    state: IState = {}

    constructor(props: IProps, context: any) {
        super(props, context);
        this.getBrandDetail()
    }

    getBrandDetail = () => {
        // @ts-ignore
        let brandId = this.props.match.params.brandId
        getBrandDetail(brandId).then(response => {
            const {data} = response.data
            this.setState({
                brand: data
            })
        })
    }
    updateBrand = (brand: IBrand) => {
        // @ts-ignore
        let brandId = this.props.match.params.brandId
        updateBrand(brandId, brand).then(response => {
            const {code, msg} = response.data
            if (code === 0) {
                message.success('更新成功')
                // this.props.history.goBack()
            } else {
                message.error(msg)
            }
        })
    }

    render() {
        return (
            <>
                {
                    this.state.brand ?
                        <Form
                            onFinish={this.updateBrand}
                            initialValues={{
                                ...this.state.brand
                            }}
                            {...layout}
                        >
                            <Form.Item
                                name={'name'}
                                label='品牌名称'
                                rules={[
                                    {
                                        required: true,
                                        type: "string",
                                        message: '品牌名称不可以为空'
                                    }
                                ]}
                            >
                                <Input/>
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

export default withRouter(EditBrand)