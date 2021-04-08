// https://react-google-charts.com/line-chart
import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Chart from "react-google-charts";

const useStyles = makeStyles((theme) => ({

}));

const FinalChart = (props) => {

    const classes = useStyles();

    return (
        <Paper>
            <Chart
                className="lineChart"
                chartType="LineChart"
                width="100%"
                height="100%"
                loader={<div>Loading Chart</div>}
                data={[
                    ['x', 'dogs', 'cats'],
                    [0, 0, 0],
                    [1, 10, 5],
                    [2, 23, 15],
                    [3, 17, 9],
                    [4, 18, 10],
                    [5, 9, 5],
                    [6, 11, 3],
                    [7, 27, 19],
                ]}
                options={{
                    hAxis: {
                        title: 'Time',
                    },
                    vAxis: {
                        title: 'Popularity',
                    },
                    series: {
                        1: { curveType: 'function' },
                    },
                }}
                rootProps={{ 'data-testid': '2' }}
            />
        </Paper>
    )
}

export default withRouter(FinalChart)
