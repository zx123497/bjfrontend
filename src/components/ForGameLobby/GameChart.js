// https://react-google-charts.com/line-chart
import React, { useState, useEffect } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Chart from "react-google-charts";
import AdminService from '../../service/AdminService';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "60vw",
        height: "60vh",
        marginTop: theme.spacing(1)
    }
}));

const GameChart = (props) => {

    const[data, setData] = useState({
        chartData: []
    })

    const classes = useStyles();

    useEffect(() => {
        const params3 = new URLSearchParams()
        params3.append('roomNum', `${props.match.params.id}`)
        AdminService.postChartData(params3).then((res) => {
            setData({chartData: processData(res.data.chartData)})
            console.log(data.chartData)
        })
        // setData({chartData: processData(props.data.chartData)})
    }, [])

    function processData(rawData) {
        let chartData = [['玩家排序', '賣家', '買家']];

        const limit = Math.max(rawData.seller.length, rawData.buyer.length)
        for(let i=0;i<limit;i++) {
            let temp = [i, rawData.seller[i], rawData.buyer[i]]
            chartData.push(temp)
        }

        return chartData
    }
    

    return (
        <Paper className={classes.root}>
            <Chart
                className="lineChart"
                chartType="LineChart"
                width="100%"
                height="100%"
                loader={<div>Loading Chart</div>}
                data={data.chartData}
                options={{
                    hAxis: {
                        title: '玩家',
                    },
                    vAxis: {
                        title: '商品價值',
                    },
                    enableInteractivity: true,
                    tooltip: {
                        trigger: 'selection'
                    },
                    series: {
                        0: {color: '#000000'}
                    }
                }}
                // rootProps={{ 'data-testid': '2' }}
                chartEvents={[
                    {
                        eventName: "select",
                        callback: ({chartWrapper, google}) => {
                            var selection = chartWrapper.getChart().setAction({
                                id: "promptAction",
                                text: "更改商品價值",
                                action: function() {
                                    const inputValue = prompt("請輸入要設定的商品價值")
                                    if(inputValue != null) {
                                        const params = new URLSearchParams();
                                        params.append('roomNum', `${props.match.params.id}`)
                                        params.append('index', chartWrapper.getChart().getSelection()[0].row)
                                        params.append('money', inputValue)
                                        if(chartWrapper.getChart().getSelection()[0].column == 1) {
                                            params.append('role', 'seller')
                                        } else {
                                            params.append('role', 'buyer')
                                        }
                                        console.log(chartWrapper.getChart().getSelection()[0].column)
                                        console.log(chartWrapper.getChart().getSelection()[0].row)
                                        console.log(inputValue)
                                        AdminService.postChangeSingleMoney(params).then((res) => {
                                            setData({chartData: processData(res.data.chartData)})
                                            console.log(res)
                                        })
                                    }
                                }
                            })
                        }
                    }
                ]}
            />
        </Paper>
    )
}

export default withRouter(GameChart)
