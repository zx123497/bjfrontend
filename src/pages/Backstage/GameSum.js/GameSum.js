import React from 'react'
import { makeStyles, Typography, Grid, Button, Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import RecordCard from './RecordCard';

const useStyles = makeStyles((theme) => ({
    upper: {
        margin: theme.spacing(3),
        marginTop: theme.spacing(6),
        "& .PIN": {
            "& .MuiTypography-root": {
                textAlign: "center"
            },
            "& .endBtn": {
                padding: theme.spacing(0.5),
                border: "1px solid #00AAA4",
                borderRadius: theme.spacing(3),
                marginRight: theme.spacing(4),
                textAlign: "center"
            },
            "& .MuiButton-text": {
                float: "right"
            },
            "& .MuiButton-label": {
                color: "#00AAA4",
                paddingTop: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                paddingLeft: theme.spacing(2),
                paddingRight: theme.spacing(2),
                border: "1px solid #056663",
                borderRadius: theme.spacing(3)
            }
        }
    },
    gameResult: {
        marginTop: theme.spacing(2),
        display: "flex",
        "& .MuiTypography-root": {
            color: "#d9be0d",
            display: "flex",
            alignContent: "center",
            marginRight: theme.spacing(1)
        }
    },
    resultCard: {
        "& .MuiCard-root": {
            margin: theme.spacing(1),
            padding: theme.spacing(2.5),
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: theme.spacing(2)
        },
        "& .MuiTypography-caption": {
            color: "gray"
        },
        "& .MuiTypography-h6": {
            textAlign: "center"
        }
    },
    recordCard: {
        "& .MuiTypography-h6": {
            color: "#d9be0d"
        }
    }
}));


const GameSum = (props) => {

    const classes = useStyles();

    return (
        <>
            <div className={classes.upper}>
                <div className="PIN">
                    <Grid container>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Typography variant="subtitle1">
                                PIN CODE
                            </Typography>
                            <Typography variant="subtitle2">
                                ABC1234
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Link className="endGame btn" component={Button} to="/">
                                <Typography variant="subtitle2">結束遊戲</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </div>

                <div className={classes.gameResult}>
                    <Typography variant="h5">遊戲結算</Typography>
                    <Typography variant="subtitle2">GAME RESULT</Typography>
                </div>

                <Grid container className={classes.resultCard}>
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="caption">回合數</Typography>
                            <Typography variant="h6">10</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <Typography variant="caption">遊戲時間</Typography>
                            <Typography variant="h6">10:00</Typography>
                        </Card>
                    </Grid>
                </Grid>

                <div className={classes.recordCard}>
                    <Typography variant="h6">交易紀錄</Typography>
                </div>

                <RecordCard />
            </div>
        </>
    )
}

export default GameSum