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
import CropFreeIcon from '@material-ui/icons/CropFree'
import ShuffleIcon from '@material-ui/icons/Shuffle';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.ultimate.dark,
        height: '100vh',
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
    const roomNum = props.location.pathname.split('/')[3]

    const theme = useTheme()

    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        round: '',
        roundTime: '',
        isGaming: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    const [chartData, setChartData] = useState({
        chartData: [],
    })

    const getRoom = () => {
        const getRoomParam = new URLSearchParams()
        getRoomParam.append('roomNum', roomNum)
        localStorage.setItem('roomNum',roomNum) 

        AdminService.postGetRoom(getRoomParam).then((res) => {
            if (res.status == '200') {
                if (res.data.allUsers) {
                    setRoom({
                        pincode: props.match.params.id,
                        totalMemNum: res.data.allUsers.length,
                        round: res.data.roomDetail.nowRound + 1,
                        roundTime: res.data.roomDetail.roundTime,
                        isGaming: res.data.roomDetail.isGaming,
                    })
                }
            }
        })
    }

    const getChartData = () => {
        const chartdataParam = new URLSearchParams()
        chartdataParam.append('roomNum', `${roomNum}`)

        AdminService.postChartData(chartdataParam).then((res) => {
            console.log(res)
            if (res.status == '200') {
                setChartData({ chartData: res.data.chartData })
            }
        })
    }

    const icons = [
        {
            // end game
            icon: <TimerOffIcon />,
            title: '結束遊戲',
            func: () => {
                socket.emit('closeRoom', { roomNum: `${props.match.params.id}` })
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
                socket.emit('startGame', { roomNum: roomNum })
                socket.emit('currentTime', { roomNum: roomNum })
            },
        },
        {
            // new chart
            icon: <AutorenewIcon />,
            title: '調整供需',
            func: () => {
                socket.emit('shuffle', {
                    roomNum: `${roomNum}`,
                    roundNum: `${room.round}`,
                    teacherID: localStorage.getItem('id')
                })
            },
        },
        {
            // new chart
            icon: <ShuffleIcon />,
            title: '分配身分',
            func: () => {
                socket.emit('sameSetShuffle', {
                    roomNum: `${roomNum}`
                })
            },
        },
        {
            // end game
            icon: <SettingsEthernetIcon />,
            title: '公告調整',
            func: () => {
                try {
                    handleModalOpen()
                } catch (error) {
                    console.warn(error)
                }
            },
        },
        {
            // qrcode
            icon: <CropFreeIcon />,
            title: 'QRCODE',
            func: () => {
                props.history.push('/admin/teacherqrcode')
            },
        },
    ]

    useEffect(() => {
        console.log(props)

        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('email'),
            username: localStorage.getItem('username'),
            name: localStorage.getItem('name')
        })

        getRoom()
        getChartData()
        socket.emit('currentTime', { roomNum: roomNum })

        // listen to endGame
        socket.on('get_out', (res) => {
            // props.history.push(`/gamesum/${props.match.params.id}`)
            localStorage.removeItem('announcement')
            props.history.push('/admin/gamesum/' + roomNum)
            console.log(res)
        })

        // listen to startGame
        socket.on('startGameResponse', (res) => {
            if (res == 'error') {
                alert('進行中的遊戲點擊開始按鈕無效')
            } else {
                window.location.reload()
            }
        })

        // listen to endRound
        socket.on('endRoundResponse', (res) => {
            if (res == 'error') {
                alert('請先開始遊戲再執行結束回合')
            } else if (res == 'error(no next round)') {
                alert('已達設定回合上限，請回到管理者專區更改設定增加回合數')
                localStorage.removeItem('announcement')
                props.history.replace('/admin/lobby')
            } else if (res == 'endRoundMessage') {
                window.location.reload()
                localStorage.removeItem('announcement')
                alert('此回合結束')
            }
        })

        // listen to shuffle
        socket.on('shuffleResponse', (res) => {
            console.log(res)
            getChartData()
        })

        // listen to sendsysmsg
        socket.on('sys', (res) => {
            console.log(res)
            if (res == 'error') {
                alert('請先開始遊戲')
            } else {
                setAnnouncement({ roomAnnoucement: res.message })
                getChartData()
            }
        })
    }, [])

    const classes = useStyles()

    const [modalOpenState, setModalOpenState] = useState({
        seller: null,
        buyer: null,
        open: false,
    })

    const handleModalClose = () => {
        setModalOpenState({
            seller: null,
            buyer: null,
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
        setModalOpenState({ ...modalOpenState, [id]: value })
    }

    const handleChangeInterval = () => {
        var seller = modalOpenState.seller
        var buyer = modalOpenState.buyer

        var sysmsg = ''

        if (seller > 0) {
            sysmsg += `賣家商品成本+$${seller}  `
        } else if (seller < 0) {
            sysmsg += `賣家商品成本-$${Math.abs(seller)}  `
        }

        if (buyer > 0) {
            sysmsg += `買家商品價值+$${buyer}`
        } else if (buyer < 0) {
            sysmsg += `買家商品價值-$${Math.abs(buyer)}`
        }

        socket.emit('sendsysmsg', {
            msg: sysmsg,
            roomNum: roomNum,
            bAdjustPrice: buyer,
            sAdjustPrice: seller,
        })

        handleModalClose()
    }

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <div className={classes.componenet}>
                <GameChart data={chartData} />
                <TransRecord data={room} />
            </div>
            <IconMenu icons={icons} />

            <Modal opened={modalOpenState.open} handleClose={handleModalClose}>
                <h2>調整區間</h2>
                <Input
                    className="interval"
                    key="interval"
                    id="seller"
                    elementType="input"
                    elementConfig={{ type: 'text', placeholder: '輸入區間數值' }}
                    value={modalOpenState.interval}
                    onChange={handleIntervalChanged}
                    label="賣家商品成本"
                />
                <Input
                    className="interval"
                    key="interval"
                    id="buyer"
                    elementType="input"
                    elementConfig={{ type: 'text', placeholder: '輸入區間數值' }}
                    value={modalOpenState.interval}
                    onChange={handleIntervalChanged}
                    label="買家商品價值"
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
