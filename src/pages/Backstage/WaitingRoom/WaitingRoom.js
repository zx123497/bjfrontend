import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SVG from './wait.svg'
import PersonIcon from '@material-ui/icons/Person'
import { Link, withRouter } from 'react-router-dom'
import RoomService from '../../../service/RoomService'
import AdminService from '../../../service/AdminService'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
const useStyles = makeStyles((theme) => ({
    waiting: {
        height: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.ultimate.dark,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        '& .card': {
            backgroundColor: '#555',
            display: 'flex',
            boxSizing: 'border-box',
            justifyContent: 'center',
            alignItems: 'center',

            width: '70%',
            height: 'max-content',
            padding: '0',
            borderRadius: '20px',
            // boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        },
        '& .start': {
            marginTop: '1rem',
            // border: `2px ${theme.palette.ultimate.main} solid`,
            color: '#FFF',
            boxShadow: '0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
        },
        '& .title': {
            minWidth: 'max-content',
            color: '#FFF',
            marginTop: '5rem',
        },
        '& .code': {
            flexGrow: 2,
            display: 'flex',
            // backgroundColor: theme.palette.primary.main,
            width: '70%',
            height: '1rem',
            color: theme.palette.primary.main,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            fontSize: '50px',
        },
        '& .status': {
            flexGrow: 3,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary.main,
        },
        '& .img': {
            width: '100%',
            height: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem',
            '& .img': {
                width: '40%',
                height: 'auto',
            },
            '& .start': {
                marginBottom: '2rem',
                // border: `2px ${theme.palette.ultimate.main} solid`,
                color: '#FFF',
                boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                borderRadius: '10px',
                width: '15rem',
                // height: '100%',
                border: 'none',
                backgroundColor: theme.palette.secondary.main,
                fontSize: '25px',
            },
            '& .code': {
                flexGrow: 2,
                display: 'flex',
                // backgroundColor: theme.palette.primary.main,
                width: '70%',
                color: theme.palette.primary.main,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                fontSize: '3rem',
            },
        },
        // "& .userlist": {
        //     width: "80%",
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //     margin: "1% 10%",
        //     height: "25vh",
        //     padding: "3% 0",
        //     overflowY: "scroll",
        //     backgroundColor: theme.palette.ultimate.dark,
        //     color: theme.palette.ultimate.light
        // }
    },
    userList: {
        backgroundColor: '#555',
        width: '70%',
        height: '45vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        marginTop: '2rem',
        boxSizing: 'border-box',
        padding: '2rem',
        borderRadius: '10px',
        color: '#FFF',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& .user': {
            backgroundColor: 'rgba(0,0,0,0.3)',
            margin: '0.5rem 1rem',
            fontSize: '1.2rem',
            height: '1.8rem',
            padding: '.5rem 1rem ',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '& .user:hover': {
            transform: 'scale(1.1)',
            transition: '.5s ease',
        },
    },
}))

const Waitingroom = (props) => {
    const classes = useStyles()
    const id = props.match.params.id
    const [pin, setPin] = useState()

    const [userlist, setUserList] = useState(['等待加入中...'])

    useEffect(() => {
        let param = new URLSearchParams()
        param.append('ID', localStorage.id)
        param.append('name', localStorage.name)
        param.append('roomID', id)
        RoomService.openRoom(param).then((res) => {
            console.log(res)
            setPin(res.data.pinCode)
            localStorage.setItem('roomNum', res.data.pinCode)
        })
    }, [])

    useEffect(() => {
        const intervalID = setInterval(() => {
            const getRoomParam = new URLSearchParams()
            getRoomParam.append('roomNum', localStorage.getItem('roomNum'))

            AdminService.postGetRoom(getRoomParam).then((res) => {
                if (res.status == 200) {
                    console.log(res)
                    if (res.data.allUsers) {
                        var temp = []
                        res.data.allUsers.forEach((element) => {
                            temp.push(element[0])
                        })
                        setUserList(temp)
                    }
                }
            })
        }, 5000)

        return () => clearInterval(intervalID)
    }, [props])

    return (
        <div className={classes.waiting}>
            <h2 className="title">輸入PIN 碼加入遊戲</h2>
            <div className="card">
                {/* <img src={SVG} className="App-logo img" /> */}

                <h4 className="code">{pin}</h4>
                {/* <div className="status">
                    <PersonIcon />
                    等待人數：1000 人
                </div> */}
            </div>
            <div className={classes.userList}>
                {userlist.map((user) => (
                    <div className="user">{user}</div>
                ))}
            </div>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'flex-end' }}>
                <Button className="start" component={Link} to={`/admingamecenter/gamelobby/${pin}`}>
                    <PlayCircleFilledWhiteIcon style={{ marginRight: '1rem' }} /> 開始遊戲 !
                </Button>
            </div>
        </div>
    )
}

export default Waitingroom
