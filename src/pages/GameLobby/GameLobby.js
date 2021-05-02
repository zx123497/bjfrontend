import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'
import { socket } from '../../service/socket'
import UserService from '../../service/UserService';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "35px"
    }
}));

const GameLobby = (props) => {

    // const [connected, setConnected] = useState(false);

    // useEffect(() => {
    //     socket.emit('test');
    //     socket.on('testResponse', obj => {
    //         console.log(obj);
    //     });
    //     // unsubscribe from event for preventing memory leaks
    // }, []);

    // console.log(socket);

    
    const [player, setPlayer] = useState({
        money: "",
        price: "",
        role: ""
    });

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: ""
    })

    // set annoucement
    function announce() {
        socket.on('sys', (sysMsg) => {
            setAnnouncement(sysMsg);
        });
    }

    useEffect(() => {
        // localStorage.getItem("username", values.username)
        const params = new URLSearchParams();
        params.append("roomNum", props.match.params.roomNum);
        
        UserService.postEnterRoom(params).then((res) => {
            const data = new Map(res);
            console.log(data.get('123'));
        })
        // socket.emit('startGame', { roomNum: props.match.params.roomNum });
        // socket.on('startGameData', (userData) => {
        //     const data = new Map(userData);
        //     // const gameRole = data.get(localStorage.getItem(username));
        //     try {
        //         const gameRole = data.get('123');
        //         console.log(gameRole);
        //         if(gameRole == undefined){
        //             props.history.push('/gamein');
        //             alert("伺服器錯誤");
        //         } else {
        //             setPlayer(gameRole);
        //         }
        //     } catch(error) {
        //         throw error;
        //     }
        // });
    }, [])


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UpperBar />
            <AnnouncementLine data={annoucement}/>
            <UserInfo data={player}/>
            <PersonalTransaction />
        </div>
    )
}

export default withRouter(GameLobby)