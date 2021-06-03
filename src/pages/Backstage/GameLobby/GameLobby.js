import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import AnnouncementLine from '../../../components/ForGameLobby/AnnouncementLine'
import UpperBar from '../../../components/ForGameLobby/UpperBar'
import GameChart from '../../../components/ForGameLobby/GameChart'
import TransRecord from '../../../components/ForGameLobby/TransRecord'
import { socket } from '../../../service/socket'
import UserService from '../../../service/UserService'


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
        pincode: '',
        totalMemNum: '',
        roundTime: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    const [records, setRecord] = useState({
    });

    // 因為他好像會一直emit，所以我先寫一個localStorage把她停下來的方法
    if (localStorage.getItem('is_emit') == null) {
        // socket.emit('sendRecordRequest', { roomNum: `${props.match.params.id}`, round: 0 })
        socket.emit('sendRecordRequest', { roomNum: '9487', round: 1 })

        // socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
        socket.emit('enterRoom', { roomNum: '9487' })

        socket.emit('sendsysmsg', {
            msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
            // roomNum: `${props.match.params.id}`,
            roomNum: '9487',
        })


        localStorage.setItem('is_emit', true)
    }

    // 這個function裡面的socket會讓後端爆掉

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('roomNum', 9487)
        params.append("ID", localStorage.getItem('username'));
        params.append("schoolname", 'NCU');
        params.append("username", localStorage.getItem('username'));

        UserService.postEnterRoom(params).then((res) => {
            if(res.status == "200") {
                setRoom({
                    // pincode: props.match.params.id,
                    pincode: '9487',
                    totalMemNum: res.data.allUsers.length,
                    round: res.data.roomDetail.nowRound,
                    roundTime: res.data.roomDetail.roundTime
                })
            }
        })

        socket.on('getRecordRequest', function (obj) {
            console.log("records");
            console.log(obj.record);
            setRecord(obj.record);
            console.log(records);
        });

        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg })
        })
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
