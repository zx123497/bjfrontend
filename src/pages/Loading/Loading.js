import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { useLoading, Audio } from '@agney/react-loading';
import { BallTriangle,Bars,Circles,Grid,Hearts,Oval,Puff,Rings,SpinningCircles,TailSpin,ThreeDots } from '@agney/react-loading';
import { Box } from '@material-ui/core';
import { socket } from '../../service/socket';
import UserService from '../../service/UserService';
import AdminService from '../../service/AdminService';

const useStyles = makeStyles((theme) => ({
    Loading: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.ultimate.main,
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷
        flexDirection: "column",
        alienItems: "center",
        justifyContent:"center",
        
        "& .loading":{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top: "45%",
            color:theme.palette.primary.main,
            marginTop: "12vh"
        },
        "& .text":{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"10px",
            fontSize:"25px",
            fontWeight:"800",
            color: "white",
        },
        "& .subtitle":{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"20px",
            fontSize:"16px",
            color: "white",
        },
        "& .userlist": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "5% 10%",
            height: "40vh",
            padding: "3% 0",
            overflowY: "scroll",
            backgroundColor: theme.palette.ultimate.dark,
            color: theme.palette.ultimate.light
        }
        
    }
}));

const Loading = (props) => {
    const classes = useStyles();

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Hearts width="300" />,
      });

    const [userlist, setUserList] = useState('Loading members...')

    const roomNum = props.location.pathname.split('/')[2]
    const roundNum = localStorage.getItem('roundNum')


    useEffect(() => {

        socket.on('enterRoom_resp', (res) => {
            console.log(res)
        })

        // direct to gamelobby when the game start
        socket.on('startGameResponse', function (obj) {
            props.history.replace(`/gamelobby/${roomNum}`)
        })
        
        // enter room socket
        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('email'),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name')
        })

        socket.on('get_out', (res) => {
            socket.emit('leaveRoom', { roomNum: roomNum })
            localStorage.removeItem(`announcement_${roomNum}_${roundNum}`)
            props.history.push('/user/lobby')
        })
       
    },[])

    useEffect(() => {

        const intervalID = setInterval(() => {
            const getRoomParam = new URLSearchParams()
            getRoomParam.append('roomNum', roomNum)

            AdminService.postGetRoom(getRoomParam).then((res) => {
                if (res.status == 200) {
                    console.log(res)
                    if (res.data.allUsers) {
                        var temp = []
                        res.data.allUsers.forEach((element) => {
                            temp.push(<Typography>{element[0]}</Typography>)
                        })
                        setUserList(temp)
                    }
                }
            })
        }, 5000)

        return () => clearInterval(intervalID)

    }, [])
    
    return ( 
    <div className = { classes.Loading } >
        <div>
            <section className="loading" {...containerProps}>
            {indicatorEl}
            </section>
        </div>
        <div className="subtitle">ROOM {roomNum}</div>
        <div className="text">等待遊戲開始...</div>
        <Box className="userlist" boxShadow={3}>
            {userlist}
        </Box>
    </div >
    )
}

export default withRouter(Loading) 