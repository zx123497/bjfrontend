import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import AnnouncementLine from '../../../components/ForGameLobby/AnnouncementLine'
import UpperBar from '../../../components/ForGameLobby/UpperBar'
import GameChart from '../../../components/ForGameLobby/GameChart'
import TransRecord from '../../../components/ForGameLobby/TransRecord'
import { socket } from '../../../service/socket'
import UserService from '../../../service/UserService'
import AdminService from '../../../service/AdminService'


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
        round: '',
        roundTime: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    const [chartData, setChartData] = useState({
        chartData: {buyer: [], seller: []}
    })

    const roomNum = props.match.params.id

    // 因為他好像會一直emit，所以我先寫一個localStorage把她停下來的方法
    if (localStorage.getItem('is_emit') == null) {
        socket.emit('startTime', {roomNum: '9487'})

        socket.emit('enterRoom', { roomNum: `${roomNum}`, round: 1 })
        
        socket.emit('sendsysmsg', {
            msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
            roomNum: `${roomNum}`
        })


        localStorage.setItem('is_emit', true)
    }

    // 這個function裡面的socket會讓後端爆掉

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        params.append("ID", localStorage.getItem('username'));
        params.append("schoolname", 'NCU');
        params.append("username", localStorage.getItem('username'));

        UserService.postEnterRoom(params).then((res) => {
            if(res.status == "200") {
                setRoom({
                    pincode: props.match.params.id,
                    totalMemNum: res.data.allUsers.length,
                    round: res.data.roomDetail.nowRound,
                    roundTime: res.data.roomDetail.roundTime
                })
            }
        })

        const params2 = new URLSearchParams()
        params2.append('roomNum', `${roomNum}`) 
        params2.append('roundNum', '0')
        AdminService.postAssignRole(params2).then((res) => {
            
        })

        socket.on('startTimeResponse', (data) => {
            console.log(data)
        })

        const params3 = new URLSearchParams()
        params3.append('roomNum', `${roomNum}`)
        AdminService.postChartData(params3).then((response) => {
            setChartData({chartData: response.data.chartData})
        })

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
                <GameChart data={chartData}/>
                <TransRecord />
            </div>
        </div>
    )
}

export default GameLobby
