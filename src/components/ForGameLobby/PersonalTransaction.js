import React from 'react';
import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    box: {
        marginLeft: "10%",
        padding: theme.spacing(1),
        borderRadius: theme.spacing(3),
        textAlign: "center",
        backgroundColor: "#056663",
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
            color: "#056663"
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
        "& .avatarContainer": {
            width: "4rem",
            height: "4rem",
            borderRadius: "50%",
            overflow: "hidden",
            "& img": {
                width: "100%"
            }
        },
        "& .nameContainer": {
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
                        <Typography variant="h4">
                            + $1,000
                        </Typography>
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
                            <div className="avatarContainer">
                                <img className="avatar" src="https://pbs.twimg.com/media/EowLHEDXMAUvE4c.jpg" />
                            </div>
                            <div className="nameContainer">
                                王俊123
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
                        <Typography variant="h5">
                            - $1,000
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
        </div >
    )
}

export default withRouter(PersonalTransaction)
