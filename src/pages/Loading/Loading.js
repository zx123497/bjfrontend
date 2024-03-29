import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import BackPage from '../../components/BackPage/BackPage'
import { useLoading, Audio } from '@agney/react-loading';
import {BallTriangle,Bars,Circles,Grid,Hearts,Oval,Puff,Rings,SpinningCircles,TailSpin,ThreeDots,} from '@agney/react-loading';
import { socket } from '../../service/socket';
import UserService from '../../service/UserService';

const useStyles = makeStyles((theme) => ({
    Loading: {
        display:"flex",
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height:"100vh",
        overflow:"hidden",  //解決margin-top塌陷
        flexDirection: "column",
        alienItems: "center",
        justifyContent:"center",
        
        "& .loading":{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            top:"45%",
            color:"red",
        },
        "& .text":{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:"30px",
            fontSize:"25px",
            fontWeight:"800",
            color:"black",
        }
        
    }
}));

const Loading = (props) => {
    const classes = useStyles();

    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Hearts width="300" />,
      });

    useEffect(() => {
        socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
        
        const param = new URLSearchParams();
        param.append("roomNum", props.match.params.id)
        param.append("ID", localStorage.getItem("username"))
        param.append("schoolname", "NCU")
        param.append("username", localStorage.getItem("id"))
        UserService.postEnterRoom(param).then((res) => {
            console.log(res.data.allUsers)
        })

        socket.on('startTimeResponse', function (obj) {
            console.log(obj)
            props.history.push(`/gamelobby/${props.match.params.id}`)
        })
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
    </div >
    )
}

export default withRouter(Loading) 