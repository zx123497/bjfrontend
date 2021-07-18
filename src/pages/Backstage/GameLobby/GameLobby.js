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
import FastForwardIcon from '@material-ui/icons/FastForward'
import Input from '../../../components/Input/Input'
import Modal from '../../../components/Modal/Modal'
import TimerOffIcon from '@material-ui/icons/TimerOff'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import Button from '@material-ui/core/Button'
import useTheme from '@material-ui/core/styles/useTheme'
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
    button: {
        backgroundColor: theme.palette.ultimate.main,
        '&:hover': {
            backgroundColor: theme.palette.ultimate.dark,
        },
    },
}))

const GameLobby = (props) => {
    const theme = useTheme()
    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        round: '',
        roundTime: '',
    })

    const [interval, setInterval] = useState()

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    const [chartData, setChartData] = useState({
        chartData: [],
    })

    const icons = [
        {
            // end game
            icon: <TimerOffIcon />,
            title: '結束遊戲',
            func: () => {
                console.log('Hi')
            },
        },
        {
            // next round
            icon: <FastForwardIcon />,
            title: '下一回合',
            func: () => {
                socket.emit('endRound', { roomNum: `${props.match.params.id}` })
            },
        },
        {
            // start game
            icon: <TimerIcon />,
            title: '開始遊戲',
            func: () => {
                socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
                socket.emit('startTime', { roomNum: `${props.match.params.id}` })
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
            },
        },
        {
            // announce
            icon: <VolumeUpIcon />,
            title: '發公告',
            func: () => {
                console.log(`${props.match.params.id}`)
                try {
                    socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })

                    socket.emit('sendsysmsg', {
                        msg: 'testtesttesttesttesttesttesttesttesttesttesttest',
                        roomNum: `${props.match.params.id}`,
                    })
                } catch (error) {
                    console.log(error)
                }
            },
        },
        {
            // new chart
            icon: <AutorenewIcon />,
            title: '重新分配',
            func: () => {
                const params2 = new URLSearchParams()
                params2.append('roomNum', `${roomNum}`)
                params2.append('roundNum', '0')
                AdminService.postAssignRole(params2).then((res) => {
                    const params3 = new URLSearchParams()
                    params3.append('roomNum', `${roomNum}`)
                    AdminService.postChartData(params3).then((response) => {
                        setChartData({ chartData: response.data.chartData })
                        // console.log(chartData)
                    })
                })
            },
        },
        {
            // end game
            icon: <SettingsEthernetIcon />,
            title: '調整區間',
            func: () => {
                handleModalOpen()
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
                setChartData({ chartData: response.data.chartData })
                console.log(chartData)
            })
        })

        socket.on('startTimeResponse', (data) => {
            console.log(data)
        })

        socket.on('sys', function (sysMsg) {
            // console.log(sysMsg)
            setAnnouncement({ roomAnnoucement: sysMsg })
        })
    }, [])

    const classes = useStyles()

    const [modalOpenState, setModalOpenState] = useState({
        interval: null,
        open: false,
    })

    const handleModalClose = () => {
        setModalOpenState({
            interval: null,
            open: false,
        })
    }

    const handleModalOpen = () => {
        setModalOpenState({
            ...modalOpenState,
            open: true,
        })
    }
    const handleIntervalChanged = async (id, value) => {
        setModalOpenState({ ...modalOpenState, interval: value })
    }

    const handleChangeInterval = () => {
        const data = modalOpenState.interval
        // call changeInterval API \(= U =)/
    }

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <div className={classes.componenet}>
                <GameChart data={chartData} />
                <TransRecord />
            </div>
            <IconMenu icons={icons} />

            <Modal opened={modalOpenState.open} handleClose={handleModalClose}>
                <h2>調整區間</h2>
                <Input
                    className="interval"
                    key="interval"
                    id="interval"
                    elementType="input"
                    elementConfig={{ type: 'text', placeholder: '輸入區間數值' }}
                    value={modalOpenState.interval}
                    onChange={handleIntervalChanged}
                    label="區間 Interval"
                />
                <Button
                    className={classes.button}
                    style={{
                        color: '#FFF',
                        margin: '1rem 0 0 0',
                        width: '100%',
                        // boxShadow: '0px 0px 6px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleChangeInterval}
                >
                    確認調整
                </Button>
            </Modal>
        </div>
    )
}

export default GameLobby
