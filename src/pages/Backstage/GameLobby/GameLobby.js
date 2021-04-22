import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import AnnouncementLine from '../../../components/ForGameLobby/AnnouncementLine'
import UpperBar from '../../../components/ForGameLobby/UpperBar'
import GameChart from '../../../components/ForGameLobby/GameChart'
import TransRecord from '../../../components/ForGameLobby/TransRecord'
import { socket } from '../../../service/socket'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: "40px"
    },
    componenet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(1)
    }
}));


const GameLobby = (props) => {

    //////////////////////////////
    //        sockect try       //
    //////////////////////////////

    // const [connected, setConnected] = useState(false);

    // useEffect(() => {
    //     socket.emit('test');
    //     socket.on('testResponse', obj => {
    //         console.log(obj);
    //     });
    //     // unsubscribe from event for preventing memory leaks
    // }, []);

    // console.log(socket);

    //////////////////////////////

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UpperBar />
            <AnnouncementLine />
            <div className={classes.componenet}>
                <GameChart />
                <TransRecord />
            </div>
        </div>
    )
}

export default GameLobby