import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'
import { socket } from '../../service/socket'

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

    function authenticate() {
        try {
            return localStorage.getItem('username');
        } catch (error) {
            throw error;
        }
    }

    // set player
    function connectNset() {
        socket.emit('startGame', { roomNum: "9487" });
        socket.on('startGameData', (userData) => {
            const data = new Map(userData);
            const gameRole = data.get(authenticate());
            setPlayer(gameRole);
        });
    }

    // set annoucement
    function announce() {
        socket.on('sys', (sysMsg) => {
            setAnnouncement(sysMsg);
        });
    }

    useEffect(() => {
        connectNset();
    }, [props])


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