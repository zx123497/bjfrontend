import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, Grid, Button, Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import RecordCard from './RecordCard';
import AdminService from '../../../service/AdminService'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.ultimate.dark,
        height: "100vh",
        marginTop: "30px"
    },
    upper: {
        margin: theme.spacing(3),
        paddingTop: theme.spacing(6),
        "& .PIN": {
            "& .MuiTypography-root": {
                textAlign: "center",
                color: "white"
            },
            "& .MuiButton-text": {
                float: "right"
            },
            "& .MuiButton-label": {
                backgroundColor: theme.palette.secondary.main,
                color: "white",
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                borderRadius: theme.spacing(3)
            }
        }
    },
    recordCard: {
        "& .MuiTypography-h6": {
            color: theme.palette.ultimate.light
        }
    }
}));


const GameSum = (props) => {

    const classes = useStyles();

    const roomNum = props.match.params.id

    const [chartData, setChartData] = useState({
        chartData: []
    })

    const close = () => {
        var closeparams = new URLSearchParams()
        closeparams.append('roomNum', roomNum)
        AdminService.postCloseRoom(closeparams)
    }

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)

        AdminService.postTotalChartData(params).then((res) => {
            if(res.status == "200") {
                if(res.data.data != null) {
                    setChartData({chartData: res.data.data});
                }
                else {
                    alert("No Game Record")
                    props.history.push("/user/lobby")
                }
            }
        })
    },[])
    

    return (
        <div className={classes.root}>
            <div className={classes.upper}>
                <div className="PIN">
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                PIN CODE
                            </Typography>
                            <Typography variant="subtitle2">
                                {roomNum}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className="endGame btn" component={Button} onClick={close} to="/">
                                <Typography variant="subtitle2">結束遊戲</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.recordCard}>
                    <Typography variant="h6">交易紀錄</Typography>
                </div>

                <RecordCard data={chartData.chartData} />
                
            </div>
        </div>
    )
}

export default GameSum