import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles, Grid, Typography } from '@material-ui/core'
import { Link, useHistory, withRouter } from 'react-router-dom'
import qrcode from '../../pic/qrcode.png'

const useStyles = makeStyles((theme) => ({
    ShowUrl: {
        backgroundColor: '#fff',
        height: '100vh',
        overflow: 'hidden',

        '& .top': {
            display: 'flex',
            alienItems: 'center',
            justifyContent: 'center',
        },
        '& .bottom': {
            display: 'flex',
            alienItems: 'center',
            justifyContent: 'center',
        },
        '& .title': {
            margin: 'auto',
            alienItems: 'center',
            justifyContent: 'center',
            marginTop: '120px',
            marginBottom: '20px',
            color: '#555',
            fontSize: '5vmin',
            fontWeight: 'bold',
        },
        '@media (max-width: 400px)': {
            '& .title': {
                fontSize: '4vmin',
            },
        },
        '@media (min-width: 401px)': {
            '& .title': {
                fontSize: '5vmin',
            },
        },
        '& .qrcode': {
            margin: 'auto',
            alienItems: 'center',
            justifyContent: 'center',
            maxWidth: '80%',
            height: 'auto',
        },
    },
}))

const ShowUrl = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.ShowUrl}>
            <Grid container spacing={1}>
                <Grid item xs className="top">
                    <Typography className="title">https://lbdgame.mgt.ncu.edu.tw/login</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs className="bottom">
                    <img className="qrcode" src={qrcode}></img>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(ShowUrl)
