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
import IconMenu from '../../../components/IconMenu/IconMenu'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'
import TimerIcon from '@material-ui/icons/Timer'
import FastForwardIcon from '@material-ui/icons/FastForward';
import TimerOffIcon from '@material-ui/icons/TimerOff'
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '40px',
        position: 'relative',
    },
    componenet: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing(1),
        overflow: 'hidden',
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
        chartData: []
    })

    const icons = [
        {
            // end game
            icon: <TimerOffIcon />,
            title: "結束遊戲",
            func: () => {
                console.log('Hi')
            },
        },
        {
            // next round
            icon: <FastForwardIcon />,
            title: "下一回合",
            func: () => {
                console.log("next round")
            },
        },
        {
            // start game
            icon: <TimerIcon />,
            title: "開始遊戲",
            func: () => {
                socket.emit('enterRoom', { roomNum: `${props.match.params.id}`, round: 1 })
                socket.emit('startTime', { roomNum: `${props.match.params.id}` })
            },
        },
        {
            // announce
            icon: <VolumeUpIcon />,
            title: "發公告",
            func: () => {
                console.log(`${props.match.params.id}`)
                try {
                    socket.emit('enterRoom', { roomNum: `${props.match.params.id}`, round: 1 })

                    socket.emit('sendsysmsg', {
                        msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
                        roomNum: `${props.match.params.id}`,
                    })
                } catch(error) {
                    console.log(error)
                }
                
            },
        },
        {
            // new chart
            icon: <AutorenewIcon />,
            title: "重新分配",
            func: () => {
                const params2 = new URLSearchParams()
                params2.append('roomNum', `${roomNum}`)
                params2.append('roundNum', '0')
                AdminService.postAssignRole(params2).then((res) => {
                    const params3 = new URLSearchParams()
                    params3.append('roomNum', `${roomNum}`)
                    AdminService.postChartData(params3).then((response) => {
                        setChartData({chartData: response.data.chartData})
                        console.log(chartData)
                    })
                })
            },
        },
    ]

    const roomNum = props.match.params.id

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        params.append('ID', localStorage.getItem('username'))
        params.append('schoolname', 'NCU')
        params.append('username', localStorage.getItem('username'))

        UserService.postEnterRoom(params).then((res) => {
            if (res.status == '200') {
                setRoom({
                    pincode: props.match.params.id,
                    totalMemNum: res.data.allUsers.length,
                    round: res.data.roomDetail.nowRound,
                    roundTime: res.data.roomDetail.roundTime,
                })
            }
        })

        const params2 = new URLSearchParams()
        params2.append('roomNum', `${roomNum}`)
        params2.append('roundNum', '0')
        AdminService.postAssignRole(params2).then((res) => {
            const params3 = new URLSearchParams()
            params3.append('roomNum', `${roomNum}`)
            AdminService.postChartData(params3).then((response) => {
                setChartData({chartData: response.data.chartData})
                console.log(chartData)
            })
        })

        socket.on('startTimeResponse', (data) => {
            console.log(data)
        })

        socket.on('sys', function (sysMsg) {
            console.log(sysMsg)
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
            <IconMenu icons={icons} />
        </div>
    )
}

export default GameLobby
