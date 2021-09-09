import React, { useState, useEffect } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { socket } from '../../service/socket'
import AdminService from '../../service/AdminService'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    GameIn: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',

        '& .card': {
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '290px',
            margin: 'auto',
            alienItems: 'center',
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        '& .title': {
            margin: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        '& .input': {
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            marginTop: '15px',
            '& .MuiTextField-root': {
                width: '80%',
                color: theme.palette.ultimate.main,
            },
        },
        '& .next': {
            margin: 'auto',
            marginTop: '50px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
        },
    },
}))

const GameIn = (props) => {

    const classes = useStyles()

    const [values, setValues] = React.useState({
        pincode: null,
    })

    useEffect(() => {
        socket.on('enterRoom_resp', (res) => {
            console.log(res)
            if(res.status == 2) {
                alert(res.msg)
            }
        })

        socket.on('connect_error', (res) => {
            console.log(res)
        })
    }, [])

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = (event) => {
        const username = localStorage.getItem('username')
        
        if (values.pincode == '') {
            alert('請輸入PIN CODE')
        } else {
            socket.on('enterRoom_resp', (socketRes) => {
                const getroomparmas = new URLSearchParams()
                    getroomparmas.append('roomNum', values.pincode)
                    AdminService.postGetRoom(getroomparmas).then((axiosRes) => {
                        console.log(axiosRes)
                        if(axiosRes.status == '200') {
                            if(socketRes.status == 0){
                                if(axiosRes.data.roomDetail.isGaming) {
                                    // in room & isGaming
                                    props.history.replace(`/gamelobby/${values.pincode}`)
                                } else {
                                    // in room & !isGaming
                                    props.history.push(`/loading/${values.pincode}`)
                                }
                            }
                            else if(socketRes.status == 1) {
                                if(axiosRes.data.roomDetail.isGaming) {
                                    // new in & isGaming
                                    alert('遊戲進行中，無法加入')
                                } else {
                                    // new in & !isGaming
                                    props.history.push(`/loading/${values.pincode}`)
                                }
                            }
                            else {
                                alert('房間不存在')
                            }
                        }
                    })
            })

            socket.emit('enterRoom', {
                roomNum: values.pincode,
                ID: localStorage.getItem('id'),
                username: localStorage.getItem('username')
            })
        }
        event.preventDefault()
    }

    return (
        <div className={classes.GameIn}>
            <Card className="card">
                <CardContent>
                    <p className="title">房間PIN Code</p>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <TextField
                            id="pincode"
                            value={values.pincode}
                            onChange={handleChange('pincode')}
                            inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                            type="search"
                            variant="outlined"
                            size="small"
                            type="number"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Link component={Button} onClick={handleSubmit} className="next">
                        開始遊戲
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}

export default withRouter(GameIn)
