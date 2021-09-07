// including PIN CODE, member sum, timer, round reminder
import { React, useState, useEffect } from 'react'
import { Grid, Box, Button, Icon, makeStyles, Typography } from '@material-ui/core'
import { withRouter, Link } from 'react-router-dom'
import CropFreeIcon from '@material-ui/icons/CropFree'
// import path from 'path/posix'

const useStyles = makeStyles((theme) => ({
    Upper: {
        display: 'flex',
        padding: theme.spacing(3),
        paddingTop: theme.spacing(1),
        '& .avatarContainer': {
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            overflow: 'hidden',
            float: 'right',
            '& .avatar': {
                height: '100%',
            },
        },
        '& .box': {
            width: '100%',
            textAlign: 'center',
        },
        '& .balance': {
            height: '2rem',
            lineHeight: '2rem',
            marginTop: '0.2rem',
            color: 'white',
        },
        '& .sell': {
            color: '#ccc',
        },
        '& .buy': {
            color: '#ccc',
        },
        '& .identity_sell': {
            width: '80%',
            height: '2.5rem',
            borderRadius: '1rem',
            marginLeft: '10%',
            backgroundColor: '#333',
            paddingTop: '0.5rem',
            color: 'white',
        },
        '& .identity_buy': {
            width: '80%',
            height: '2.5rem',
            borderRadius: '1rem',
            marginLeft: '10%',
            backgroundColor: '#DC6161',
            color: 'white',
            paddingTop: '0.5rem',
        },
    },
    button: {
        padding: '0',
        marginTop: theme.spacing(1.5),
        width: '30%',
        display: 'block',
        textAlign: 'center',
        '& .component': {
            width: '100%',
            textAlign: 'center',
        },
    },
    Below_sell: {
        color: '#ccc',
    },
    Below_buy: {
        color: '#ccc',
    },
}))

const UserInfo = (props) => {
    const classes = useStyles()

    useEffect(() => {
        localStorage.setItem('roomNum', props.data.roomNum)
        console.log('room:' + props.data.roomNum)
    }, [])

    //for Qrcode
    useEffect(() => {
        localStorage.setItem('role', props.data.role)
        localStorage.setItem('price', props.data.price)
        localStorage.setItem('money', props.data.money)
        localStorage.setItem('roundNum', props.data.roundNum)
        localStorage.setItem('roomNum', props.data.roomNum)
    }, [props])

    return (
        <div>
            <div className={classes.Upper}>
                <Grid container xs={3} justify="flex-end">
                    <div className="avatarContainer">
                        <img
                            className="avatar"
                            src="data:image/jpeg;base64,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"
                        />
                    </div>
                </Grid>
                <Grid container xs={9}>
                    <Grid item xs={9}>
                        {props.data.role == 'seller' && (
                            <div>
                                <Box className="box balance sell">
                                    <Typography variant="subtitle">目前餘額 ${props.data.money}</Typography>
                                </Box>
                                <Box className="box identity_sell">
                                    <Typography variant="h5">賣方</Typography>
                                </Box>
                            </div>
                        )}

                        {props.data.role == 'buyer' && (
                            <div>
                                <Box className="box balance buy">
                                    <Typography variant="subtitle">目前餘額 ${props.data.money}</Typography>
                                </Box>
                                <Box className="box identity_buy">
                                    <Typography variant="h5">買方</Typography>
                                </Box>
                            </div>
                        )}
                    </Grid>
                    <Grid container xs={3} justify="flex-start">
                        <Link component={Button} className={classes.button} to={'/qrcode'}>
                            <CropFreeIcon className="component" fontSize="large" />
                            <Typography className="component" variant="caption">
                                {' '}
                                QRcode
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </div>

            {props.data.role == 'seller' && (
                <div className={classes.Below_sell}>
                    <Grid container justify="center">
                        <Typography variant="h5">進貨成本 ${props.data.price}</Typography>
                    </Grid>
                </div>
            )}

            {props.data.role == 'buyer' && (
                <div className={classes.Below_buy}>
                    <Grid container justify="center">
                        <Typography variant="h5">商品價值 ${props.data.price}</Typography>
                    </Grid>
                </div>
            )}
        </div>
    )
}

export default withRouter(UserInfo)
