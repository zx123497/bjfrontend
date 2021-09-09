import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'
import { socket } from '../../service/socket'
import UserService from '../../service/UserService'
import AdminService from '../../service/AdminService'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.ultimate.dark,
        height: '100vh',
        marginTop: '35px',
    },
}))

const GameLobby = (props) => {
    const roomNum = props.location.pathname.split('/')[2]

    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        round: '',
        roundTime: '',
        isGaming: '',
    })

    const [player, setPlayer] = useState({
        item: '',
        money: '',
        price: '',
        role: '',
        score: '',
        totalScore: '',
        transPartner: '',
        tranAmount: '',
        roomNum: '',
        roundNum: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: localStorage.getItem('annoucement'),
    })

    const getRoom = () => {
        const getRoomParam = new URLSearchParams()
        getRoomParam.append('roomNum', roomNum)

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

    useEffect(() => {

        console.log(localStorage.getItem(`trans_${room.round}`))


        socket.on('enterRoom_resp', (res) => {
            console.log(res)
            if((localStorage.getItem(`tran${room.round}_money`)) &&
                (localStorage.getItem(`tran${room.round}_user`))) {
                    console.log('ls')
                    console.log((localStorage.getItem(`tran${room.round}_money`)))
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                    score: localStorage.getItem(`tran${room.round}_money`),
                    totalScore: (localStorage.getItem(`tran${room.round}_money`)) - res.user.price,
                    transPartner: localStorage.getItem(`tran${room.round}_user`),
                    tranAmount: localStorage.getItem(`tran${room.round}_money`),
                    roomNum: roomNum,
                })
            } else {
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                    score: 0,
                    totalScore: 0,
                    transPartner: '',
                    tranAmount: 0,
                    roomNum: roomNum,
                })
            }
        })

        socket.on('resRole', (res) => {
            if((localStorage.getItem(`tran${room.round}_money`)) &&
                (localStorage.getItem(`tran${room.round}_user`))) {
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                    score: localStorage.getItem(`tran${room.round}_money`),
                    totalScore: (localStorage.getItem(`tran${room.round}_money`)) - res.user.price,
                    transPartner: localStorage.getItem(`tran${room.round}_user`),
                    tranAmount: localStorage.getItem(`tran${room.round}_money`),
                    roomNum: roomNum,
                })
            } else {
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                    score: 0,
                    totalScore: 0,
                    transPartner: '',
                    tranAmount: 0,
                    roomNum: roomNum,
                })
            }
        })

        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
        })

        getRoom()

        localStorage.setItem('round', room.round)
        localStorage.setItem('roomNum', roomNum)

        socket.emit('currentTime', { roomNum: roomNum })

        // listen to sendsysmsg
        socket.on('sys', function (res) {
            socket.emit('reqRole',{roomNum: roomNum, ID: localStorage.getItem('id')})
        })

        // listen to endRound
        socket.on('endRoundResponse', (res) => {
            console.log(res)
            if ((res == 'endRoundMessage') || (res == 'error(no next round)')) {
                props.history.replace(`/loading/${roomNum}`)
            }
        })

        // listen to sysmsg
        socket.on('sys', (res) => {
            if (res != 'error') {
                setAnnouncement({ roomAnnoucement: res.message })
                socket.emit('reqRole', { roomNum: roomNum, ID: localStorage.getItem('id') })
            }
        })

        // listen to close room
        socket.on('get_out', (res) => {
            socket.emit('leaveRoom', { roomNum: roomNum })
            props.history.push('/user/lobby')
        })

    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <UserInfo data={player} />
            <PersonalTransaction data={player} />
        </div>
    )
}

export default withRouter(GameLobby)
