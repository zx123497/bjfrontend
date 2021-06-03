// https://react-google-charts.com/line-chart
import React from 'react';
import { Grid, makeStyles, Icon } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "30%",
        height: "60vh",
        margin: theme.spacing(3),
        paddingBottom: "0",
        overflow: "scroll",
        overflowX: "hidden",
        "& .row": {
            display: "flex",
            alignItems: "center",
            padding: "0.5rem"
        },
        "& .element": {
            textAlign: "center",
            fontSize: "1.5rem"
        },
        "& .amount": {
            fontSize: "2rem",
            fontWeight: "bold"
        }
    }
}));

const TransRecord = (props) => {

    const classes = useStyles();

    // console.log(props.data.records);

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
