import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import AnnouncementLine from '../../../components/ForGameLobby/AnnouncementLine'
import UpperBar from '../../../components/ForGameLobby/UpperBar'
import GameChart from '../../../components/ForGameLobby/GameChart'
import TransRecord from '../../../components/ForGameLobby/TransRecord'
import { socket } from '../../../service/socket'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '40px',
    },
    componenet: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
}))

const GameLobby = (props) => {
    const [room, setRoom] = useState({
        pincode: `${props.match.params.id}`,
        totalMemNum: '',
        roundTime: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

<<<<<<< HEAD
    const [records, setRecord] = useState({
    });

=======
>>>>>>> b66d77a28565f802de7ae0b74533ac340138bb34
    // 因為他好像會一直emit，所以我先寫一個localStorage把她停下來的方法
    if (localStorage.getItem('is_emit') == null) {
        socket.emit('sendRecordRequest', { roomNum: `${props.match.params.id}`, round: 0 })
        socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })

        socket.emit('sendsysmsg', {
            msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
            roomNum: `${props.match.params.id}`,
        })

        localStorage.setItem('is_emit', true)
    }

    // 這個function裡面的socket會讓後端爆掉
    socket.on('sys', function (sysMsg) {
        setAnnouncement({ roomAnnoucement: sysMsg })
        console.log('sysMsg')
    })

    console.log('d')

    useEffect(() => {
        socket.on('testjoin', function (msg) {
            console.log(msg);
        });

        socket.on('getRecordRequest', function (obj) {
            console.log("records");
            console.log(obj.record);
            setRecord(obj.record);
            console.log(records);
        });

    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <div className={classes.componenet}>
                <GameChart />
                <TransRecord data={records} />
            </div>
        </div>
    )
}

export default GameLobby
