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

    let records = [];

    console.log(props.data)

    for(let element of props.data) {
        records.push(
            <Grid container className="row">
                <Grid item className="element buyer" xs={3}>{element.buyer}</Grid>
                <Grid item className="element icon" xs={1}>
                    <Icon fontSize="large"><NavigateNextIcon /></Icon>
                </Grid>
                <Grid item className="element seller" xs={3}>{element.seller}</Grid>
                <Grid item className="element amount" xs={5}>$ {element.price}</Grid>
            </Grid>
        )
    }

    return (
        <div className={classes.root}>
            {records}
        </div>
    )
}

export default withRouter(TransRecord)
