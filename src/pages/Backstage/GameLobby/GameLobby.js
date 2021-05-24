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

    const [room, setRoom] = useState({
        pincode: '9487',
        totalMemNum: '',
        roundTime: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })


    // 這兩個emit會讓後端爆掉

    // socket.emit('sendsysmsg', {
    //     msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
    //     roomNum: 9487
    // });

    // socket.emit('sendRecordRequest', {roomNum: 9487, round: 0});

    // socket.disconnect();

    useEffect(() => {
        // 這個function裡面的socket會讓後端爆掉

        // socket.on('sys', sysMsg => {
        //     setAnnouncement({roomAnnoucement: sysMsg});
        //     console.log(sysMsg);
        // });

        // socket.on('getRecordRequest', obj => {
        //     console.log("records");
        //     console.log(obj.record);
        // });
    }, [])

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement}/>
            <div className={classes.componenet}>
                <GameChart />
                <TransRecord />
            </div>
        </div>
    )
}

export default GameLobby