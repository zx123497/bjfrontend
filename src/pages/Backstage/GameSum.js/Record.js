// https://react-google-charts.com/line-chart
import React from 'react';
import { Grid, makeStyles, Icon } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "12px",
        "& .row": {
            display: "flex",
            height: "9px",
            width: "100%",
            alignItems: "center"
        },
        "& .element": {
            textAlign: "center"
        },
        "& .amount": {
            fontWeight: "bold"
        }
    }
}));

const Record = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </div>

            <div className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </div>

            <div className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </div>

            <div className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </div>

            <div className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </div>
        </div>
    )
}

export default withRouter(Record)
