// https://react-google-charts.com/line-chart
import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Icon, IconButton, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { socket } from '../../service/socket'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AutorenewIcon from '@material-ui/icons/Autorenew'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "30%",
        height: "60vh",
        margin: theme.spacing(3),
        paddingBottom: "0",
        overflow: "scroll",
        overflowX: "hidden",
        textAlign: "center",
        color: theme.palette.ultimate.light,
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
            fontWeight: "bold",
            color: "white"
        }
    },
    button: {
        marginBottom: "5%"
    }
}));

const TransRecord = (props) => {

    const [records, setRecord] = useState({
        records: []
    });

    const rerender = () => {
        console.log(props.data.round)
        socket.emit('faketransc', { roomNum: `${props.match.params.id}`, round: props.data.round - 1 })
    }

    const classes = useStyles();

    useEffect(() => {
        socket.on('getRecordRequest', function (obj) {
            console.log(obj)
            if(obj != 'error' && obj) {
                let temp = []
                let i = 0
                for(let element of obj) {
                    // console.log(element.buyer)
                    temp.push(
                        <Grid container className="row" key={i}>
                            <Grid item className="element buyer" xs={3}>{element.buyer}</Grid>
                            <Grid item className="element icon" xs={1}>
                                <Icon fontSize="large"><NavigateNextIcon /></Icon>
                            </Grid>
                            <Grid item className="element seller" xs={3}>{element.seller}</Grid>
                            <Grid item className="element amount" xs={5}>$ {element.price}</Grid>
                        </Grid>
                    )
                    i++
                }
                console.log(temp)
                setRecord({records: temp});
            }
            // console.log(records)
        });
    }, [])
    
    return (
        <div className={classes.root}>
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AutorenewIcon />}
                onClick={rerender}
            >
                Re-render
            </Button>
            <div>
                {records.records}
            </div>
        </div>
    )
}

export default withRouter(TransRecord)
