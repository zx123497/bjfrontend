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
        backgroundColor: theme.palette.ultimate.dark,
        height: "100vh",
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
        isGaming: false
    })

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
                socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
                socket.emit('closeRoom', { roomNum: `${props.match.params.id}` })
                props.history.push(`/gamesum/${props.match.params.id}`)
            },
        },
        {
            // next round
            icon: <FastForwardIcon />,
            title: '下一回合',
            func: () => {
                socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
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

                AdminService.postGetRoom(params).then((res) => {
                    if (res.status == '200') {
                        setRoom({
                            pincode: props.match.params.id,
                            totalMemNum: res.data.allUsers.length,
                            round: res.data.roomDetail.nowRound,
                            roundTime: res.data.roomDetail.roundTime,
                            isGaming: res.data.roomDetail.isGaming
                        })
                    }
                })
            },
        },
        {
            // new chart
            icon: <AutorenewIcon />,
            title: "分配身分",
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
            title: '公告調整',
            func: () => {
                try {
                    handleModalOpen()
                } catch (error) {
                    console.log(error)
                }
            },
        },
    ]

    const roomNum = props.match.params.id

    useEffect(() => {
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)

        AdminService.postGetRoom(params).then((res) => {
            if (res.status == '200') {
                console.log(res)
                if(res.data.allUsers == null) {
                    console.log("no user")
                    // setRoom({
                    //     pincode: props.match.params.id,
                    //     totalMemNum: 0,
                    //     round: res.data.roomDetail.nowRound,
                    //     roundTime: res.data.roomDetail.roundTime,
                    // })
                }
                else {
                    setRoom({
                        pincode: props.match.params.id,
                        totalMemNum: res.data.allUsers.length,
                        round: res.data.roomDetail.nowRound + 1,
                        roundTime: res.data.roomDetail.roundTime,
                        isGaming: res.data.roomDetail.isGaming
                    })
                    const params3 = new URLSearchParams()
                    params3.append('roomNum', `${roomNum}`)
                    AdminService.postChartData(params3).then((response) => {
                        setChartData({ chartData: response.data.chartData })
                        // console.log(chartData)
                    })
                }
            }
        })

        socket.on('startTimeResponse', (data) => {
            if(data == "error") {
                alert("進行中的遊戲點擊開始按鈕無效")
            }
        })

        socket.on('endRoundResponse', (data) => {
            if(data == "error") {
                alert("請先開始遊戲再執行結束回合")
            }
            else if(data == "error(no next round)") {
                alert("已達設定回合上限，請回到管理者專區更改設定增加回合數")
            }
            else if(data == "endRoundMessage") {
                setAnnouncement({roomAnnoucement: ''})
                alert("回合結束")
            }
        })

        socket.on('sys', function (sysMsg) {
            // console.log(sysMsg)
            setAnnouncement({ roomAnnoucement: sysMsg })
        })
    }, [room.totalMemNum])

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

        var msg = ""

        if(seller > 0) {
            msg += `賣家商品成本+$${seller}  `
        }
        else if(seller < 0) {
            msg += `賣家商品成本-$${Math.abs(seller)}  `
        }

        if(buyer > 0) {
            msg += `買家商品價值+$${buyer}`
        }
        else if(buyer < 0) {
            msg += `買家商品價值-$${Math.abs(buyer)}`
        }

        // call changeInterval API \(= U =)/

        const changeRoleMoneyParam = new URLSearchParams()
        changeRoleMoneyParam.append("roomNum", props.match.params.id)
        changeRoleMoneyParam.append("bAdjustPrice", buyer)
        changeRoleMoneyParam.append("sAdjustPrice", seller)
        AdminService.postChangeRoleMoney(changeRoleMoneyParam).then((res) => {
            if(res.status == 200) {
                socket.emit('enterRoom', { roomNum: `${props.match.params.id}` })
                socket.emit('sendsysmsg', {
                    msg: msg,
                    roomNum: `${props.match.params.id}`,
                })
            }
        })
        handleModalClose()
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
