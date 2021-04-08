// https://react-google-charts.com/line-chart
import React from 'react';
import { Grid, makeStyles, Icon } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5),
        marginTop: theme.spacing(2),
        paddingBottom: "0",
        height: "32vh",
        overflow: "scroll",
        overflowX: "hidden",
        "& .row": {
            display: "flex",
            alignItems: "center"
        },
        "& .element": {
            textAlign: "center"
        },
        "& .amount": {
            fontSize: "1.5rem",
            fontWeight: "bold"
        }
    }
}));

const TransRecord = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>

            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>王俊123</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>陳明How</Grid>
                <Grid item className="element amount" xs={5}>$ 1,000</Grid>
            </Grid>
        </div>
    )
}

export default withRouter(TransRecord)
