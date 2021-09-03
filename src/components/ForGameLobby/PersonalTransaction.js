import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    box: {
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
        textAlign: "center",
        backgroundColor: theme.palette.ultimate.main,
        color: "white"
    },
    container: {
        width: "80%",
        marginLeft: "10%",
        "& .row": {
            marginTop: theme.spacing(4)
        },
        "& .cell": {
            textAlign: "center",
            color: "white"
        },
        "& .caption": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        "& .partnerInfo": {
            width: "100%",
            display: "flex",
            justifyContent: "center"
        },
        "& .nameContainer": {
            fontSize:"1.3rem",
            height: "4rem",
            lineHeight: "4rem",
            marginLeft: theme.spacing(2)
        }
    }
}));

const PersonalTransaction = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.box}>
                交易紀錄與得分總計
            </Box>
            <Grid container className={classes.container}>
                <Grid container className="row pointSum" justify="center">
                    <Grid item xs={4} className="cell caption">
                        <Typography variant="subtitle">
                            得分總計：
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className="cell">
                        {props.data.totalScore >= 0 && (
                            <Typography variant="h4">
                                +${props.data.totalScore}
                            </Typography>
                        )}

                        {props.data.totalScore < 0 && (
                            <Typography variant="h4">
                                -${Math.abs(props.data.totalScore)}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

                <Grid container className="row partner" justify="center">
                    <Grid item xs={4} className="cell caption">
                        <Typography variant="subtitle">
                            交易對象：
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className="cell">
                        <div className="partnerInfo">
                            <div className="nameContainer">
                                {props.data.transPartner}
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <Grid container className="row partner" justify="center">
                    <Grid item xs={4} className="cell caption">
                        <Typography variant="subtitle">
                            交易點數：
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className="cell">
                        {props.data.tranAmount >= 0 && (
                            <Typography variant="h5">
                                + ${props.data.tranAmount}
                            </Typography>
                        )}

                        {props.data.tranAmount < 0 && (
                            <Typography variant="h5">
                                - ${Math.abs(props.data.tranAmount)}
                            </Typography>
                        )}
                    </Grid>
                </Grid>

            </Grid>
        </div >
    )
}

export default withRouter(PersonalTransaction)
