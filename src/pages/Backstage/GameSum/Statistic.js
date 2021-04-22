// https://react-google-charts.com/line-chart
import React from 'react';
import { makeStyles, Typography, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        fontSize: "12px",
        textAlign: "center",
        marginTop: theme.spacing(1),
        "& .tableRow": {
            display: "flex",
            marginTop: theme.spacing(1)
        },
        "& .statisticLabel": {
            color: "#7d8082"
        }
    }
}));

const Statistic = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="tableRow">
                <Grid container>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                </Grid>
            </div>

            <div className="tableRow">
                <Grid container>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                </Grid>
            </div>

            <div className="tableRow">
                <Grid container>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                </Grid>
            </div>

            <div className="tableRow">
                <Grid container>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                    <Grid item xs={3} className="statisticLabel">
                        最大交易金額
                </Grid>
                    <Grid item xs={3} className="value">
                        $10,000
                </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default withRouter(Statistic)
