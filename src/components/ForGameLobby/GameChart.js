// https://react-google-charts.com/line-chart
import React from 'react';
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

    const classes = useStyles();

    const rawChartData = props.data.chartData
    const chartData = [['玩家排序', '賣家', '買家']];

    const limit = Math.max(rawChartData.seller.length, rawChartData.buyer.length)
    for(let i=0;i<limit;i++) {
        let temp = [i, rawChartData.seller[i], rawChartData.buyer[i]]
        chartData.push(temp)
    }

    return (
        <Paper className={classes.root}>
            <Chart
                className="lineChart"
                chartType="LineChart"
                width="100%"
                height="100%"
                loader={<div>Loading Chart</div>}
                data={chartData}
                options={{
                    hAxis: {
                        title: '玩家',
                    },
                    vAxis: {
                        title: '商品價值',
                    },
                    series: {
                        1: { curveType: 'function' },
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
                            const role = chartWrapper.getChart().getSelection()[0].column
                            const index = chartWrapper.getChart().getSelection()[0].row
                            
                            var selection = chartWrapper.getChart().setAction({
                                id: "promptAction",
                                text: "更改商品價值",
                                action: function() {
                                    const inputValue = prompt("請輸入要設定的商品價值")
                                    // AdminService.postChangeSingleMoney
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
