import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
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
            marginTop:"30px",
            fontSize:"25px",
            fontWeight:"800",
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

    useEffect(() => {
        console.log(props)
        
        socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
        
        socket.on('startTimeResponse', function (obj) {
            console.log(obj)
            props.history.push(`/gamelobby/${props.match.params.id}`)
        })

        const getRoomParam = new URLSearchParams();
        getRoomParam.append("roomNum", props.match.params.id)

        AdminService.postGetRoom(getRoomParam).then((res) => {
            if(res.status == 200) {
                if(res.data.roomDetail.round < 1) {
                    const param = new URLSearchParams();
                    param.append("roomNum", props.match.params.id)
                    param.append("ID", localStorage.getItem("username"))
                    param.append("schoolname", "NCU")
                    param.append("username", localStorage.getItem("id"))
                    UserService.postEnterRoom(param)
                }
            }
        })
        
        const intervalID = setInterval(() => {
            AdminService.postGetRoom(getRoomParam).then((res) => {
                if(res.status == 200) {
                    if(res.data.allUsers.length > 0) {
                        var temp = []
                        res.data.allUsers.forEach(element => {
                            temp.push(<Typography>{element[0]}</Typography>)
                        });
                        setUserList(temp)
                    }
                }
            })
        }, 5000)

        return () => clearInterval(intervalID)        
    },[])
    
    return ( 
    <div className = { classes.Loading } >
        <BackPage refs=""></BackPage> 
        <div>
            <section className="loading" {...containerProps}>
            {indicatorEl}
            </section>
        </div>
        <div className="text">等待遊戲開始...</div>
        <Box className="userlist" boxShadow={3}>
            {userlist}
        </Box>
    </div >
    )
}

export default withRouter(Loading) 