// including PIN CODE, member sum, timer, round reminder
import React, { useState, useEffect } from 'react'
import { Box, Card, Grid, makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import '../../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingTop: theme.spacing(6),
        "& .caption": {
            marginRight: theme.spacing(1),
            borderBottom: "1px solid black"
        }
    },
    RoundNTime: {
        marginTop: "0.5rem",
        display: "flex",
        alignItems: "center",
        "& .box": {
            display: "inline-block"
        },
        "& .round": {
            marginRight: "1rem",
            "& .MuiTypography-body1": {
                fontSize: "3rem",
            }
        },
        "& .timer": {
            width: "6rem",
            display: "inline-block",
        },
        "& .timeCard": {
            backgroundColor: "gray",
            display: "flex",
            alignItems: "center"
        },
        "& .timeNum": {
            width: "100%",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            fontFamily: 'Orbitron',
            fontFamily: "DigitalNumbersRegular"
        },
        "& .minCard": {
            width: "3.5rem",
            height: "3.5rem",
        },
        "& .minNum": {
            fontSize: "1.5rem",
            lineHeight: "2.7rem"
        },
        "& .secCard": {
            width: "3rem",
            height: "3rem",
            marginTop: "0.5rem"
        },
        "& .secNum": {
            fontSize: "1.1rem",
            lineHeight: "2rem"
        }
    }
}));

const UpperBar = (props) => {

    const classes = useStyles();

    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        round: '',
        roundTime: '',
    })

    useEffect(() => {
        setRoom({
            pincode: props.data.pincode,
            totalMemNum: props.data.totalMemNum,
            round: props.data.round,
            roundTime: props.data.roundTime
        })
    }, [props.data])

    const numMap = new Map([[1, '一'], [2, '二'], [3, '三'], [4, '四'], [5, '五'], [6, '六'], [7, '七'], [8, '八'], [9, '九'], [10, '十']])

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid container xs={6}>
                    <Typography className="caption" variant="body2">
                        PIN CODE
                    </Typography>
                    <Typography variant="body2">
                        {room.pincode}
                    </Typography>
                </Grid>
                <Grid container xs={6} justify="flex-end">
                    <Typography variant="body2">
                        目前房間人數 <b> {room.totalMemNum} </b> 人
                    </Typography>
                </Grid>
            </Grid>
            <div className={classes.RoundNTime} container>
                <Box className="box round" fontWeight="fontWeightBold" fontSize="h3.fontSize">
                    {numMap.get(room.round) && (
                        <Typography>第{numMap.get(room.round)}回合</Typography>
                    )}

                    {!(numMap.get(room.round)) && (
                        <Typography>第{room.round}回合</Typography>
                    )}
                </Box>
                <div className="box timer">
                    <Grid container>
                        <Grid item xs={8} spacing={3}>
                            <Card className="timeCard minCard">
                                <Box className="timeNum minNum">
                                    {Math.floor(room.roundTime / 60)}
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={4} spacing={3}>
                            <Card className="timeCard secCard">
                                <Box className="timeNum secNum">
                                    {room.roundTime % 60}
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default withRouter(UpperBar)
