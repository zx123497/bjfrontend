// https://react-google-charts.com/line-chart
import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Chart from "react-google-charts";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        marginLeft: "5%"
    }
}));

const FinalChart = (props) => {
    const rawChartData = props.data.chartData
    const selected = props.data.selected
    const data= []

    if(props.data.chartData != null) {
        const lengthSurvey = []
        for(let element of rawChartData) {
            lengthSurvey.push(element[0].seller.length)
            lengthSurvey.push(element[0].buyer.length)
        }
        const limit = Math.max(...lengthSurvey)

        const selectedRound = []
        for(let element of selected) {
            selectedRound.push({round: element.title, data: rawChartData[element.value]})
        }

        const chartLegend = ['x']
        for(let element of selectedRound) {
            chartLegend.push(`${element.round} Seller`)
            chartLegend.push(`${element.round} Buyer`)
        }

        
        data.push(chartLegend)

        for(let i=0;i<limit;i++) {
            let temp = []
            temp.push(i)
            for(let element of selectedRound) {
                temp.push(element.data[0].seller[i])
                temp.push(element.data[0].buyer[i])
            }
            data.push(temp)
        }
    }


    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Chart
                className="lineChart"
                chartType="LineChart"
                width="100%"
                height="100%"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                    hAxis: {
                        title: '玩家',
                    },
                    vAxis: {
                        title: '商品價值',
                    },
                    series: {
                        0: { color: '#000000' }
                    },
                }}
                // rootProps={{ 'data-testid': '2' }}
                
            />
        </Paper>
    )
}

export default withRouter(FinalChart)
