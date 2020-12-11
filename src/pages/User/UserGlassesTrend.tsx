import React, {Component} from 'react';
import * as echarts from "echarts";
import {getUserGlassesList} from "../../api/user";

interface IProps {
    userId: number
}

class UserGlassesTrend extends Component<IProps, any> {


    constructor(props: any, context: any) {
        super(props, context);
        this.getUserGlassesList()
    }

    getUserGlassesList = () => {
        getUserGlassesList(this.props.userId).then(response => {
            const {data} = response.data
            let leftEyeAstigmatism: number[] = []
            let leftEyeDegree: number[] = []
            let leftGlassesAstigmatism: number[] = []
            let leftGlassesDegree: number[] = []
            let rightEyeAstigmatism: number[] = []
            let rightEyeDegree: number[] = []
            let rightGlassesAstigmatism: number[] = []
            let rightGlassesDegree: number[] = []
            let timeList: string[] = []
            data.forEach((d: any) => {
                // console.log(d)
                leftEyeAstigmatism.push(d.leftEyeAstigmatism)
                leftEyeDegree.push(d.leftEyeDegree)
                leftGlassesAstigmatism.push(d.leftGlassesAstigmatism)
                leftGlassesDegree.push(d.leftGlassesDegree)
                rightEyeAstigmatism.push(d.rightEyeAstigmatism)
                rightEyeDegree.push(d.rightEyeDegree)
                rightGlassesAstigmatism.push(d.rightGlassesAstigmatism)
                rightGlassesDegree.push(d.rightGlassesDegree)
                timeList.push(d.createdAt)
            })
            // this.setState({
            //     leftEyeAstigmatism: leftEyeAstigmatism
            // })
            let colors = ['#5470C6', '#91CC75', '#EE6666', '#f1ca08'];

            let leftChart = echarts.init(this.refs.left as HTMLElement);
            // 绘制图表
            leftChart.setOption({
                color: colors,
                title: {
                    text: '左眼睛配镜趋势图',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['左眼散光', '左眼度数', '左眼镜散光', '左眼镜度数']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: timeList
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '左眼散光',
                        min: 0,
                        max: 2000,
                        position: 'right',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '左眼度数',
                        min: 0,
                        max: 6,
                        position: 'right',
                        offset: 70,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '左眼镜散光',
                        min: 0,
                        max: 2000,
                        position: 'left',
                        offset: 70,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '左眼镜度数',
                        min: 0,
                        max: 2000,
                        position: 'left',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[3]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    }
                ],
                series: [
                    {
                        name: '左眼散光',
                        type: 'bar',
                        data: leftEyeAstigmatism
                    },
                    {
                        name: '左眼度数',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: leftEyeDegree
                    },
                    {
                        name: '左眼镜散光',
                        type: 'bar',
                        yAxisIndex: 2,
                        data: leftGlassesAstigmatism
                    },
                    {
                        name: '左眼镜度数',
                        type: 'bar',
                        yAxisIndex: 3,
                        data: leftGlassesDegree
                    }
                ]
            });

            let rightChart = echarts.init(this.refs.right as HTMLElement);
            // 绘制图表
            rightChart.setOption({
                color: colors,
                title: {
                    text: '右眼睛配镜趋势图',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['右眼散光', '右眼度数', '右眼镜散光', '右眼镜度数']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: timeList
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '右眼散光',
                        min: 0,
                        max: 2000,
                        position: 'right',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '右眼度数',
                        min: 0,
                        max: 6,
                        position: 'right',
                        offset: 70,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '右眼镜散光',
                        min: 0,
                        max: 2000,
                        position: 'left',
                        offset: 70,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    },
                    {
                        type: 'value',
                        name: '右眼镜度数',
                        min: 0,
                        max: 2000,
                        position: 'left',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: colors[3]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} °'
                        }
                    }
                ],
                series: [
                    {
                        name: '右眼散光',
                        type: 'bar',
                        data: rightEyeAstigmatism
                    },
                    {
                        name: '右眼度数',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: rightEyeDegree
                    },
                    {
                        name: '右眼镜散光',
                        type: 'bar',
                        yAxisIndex: 2,
                        data: rightGlassesAstigmatism
                    },
                    {
                        name: '右眼镜度数',
                        type: 'bar',
                        yAxisIndex: 3,
                        data: rightGlassesDegree
                    }
                ]
            });


        })
    }

    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例


    }

    render() {
        return (
            <div>
                <div ref="left" style={{width: "100%", height: "500px"}}/>
                <div ref="right" style={{width: "100%", height: "500px"}}/>
            </div>
        );
    }
}

export default UserGlassesTrend;