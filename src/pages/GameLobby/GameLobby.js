import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'
// import { socket } from '../../service/socket'

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

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UpperBar />
            <AnnouncementLine />
            <UserInfo />
            <PersonalTransaction />
        </div>
    )
}

export default withRouter(GameLobby)