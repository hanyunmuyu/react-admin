import React, {Component, RefObject} from "react";
import * as echarts from 'echarts';

interface IProps {
    width?: string
    height?: string
    option: any
}

export default class Echarts extends Component<IProps, any> {
    chart: RefObject<any>

    constructor(props: IProps, context: any) {
        super(props, context);
        this.chart = React.createRef<HTMLElement>()
    }

    componentDidMount() {
        let myChart = echarts.init(this.chart.current as HTMLElement);
        myChart.setOption(this.props.option);
    }

    render() {
        return (
            <div ref={this.chart} style={{width: this.props.width ?? '100%', height: this.props.height ?? '300px'}}/>
        )
    }
}
