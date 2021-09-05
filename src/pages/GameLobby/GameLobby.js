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
import { useTimer } from 'react-timer-hook'

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
        isGaming: false,
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
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    useEffect(() => {
        // 先socket enterRoom才能fetch公告
        console.log('socket')

        socket.emit('enterRoom', { roomNum: '9487' })

        socket.on('resRole', (res) => {
            console.log(res)
            setPlayer({
                item: '',
                money: res.user.money,
                price: res.user.price,
                role: res.user.role,
                score: 0,
                totalScore: 0,
                transPartner: '',
                tranAmount: 0,
            })
        })

        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg })
            console.log(`sysMsg: ${sysMsg}`)
        })

        socket.on('endRoundResponse', function (res) {
            if (res == 'endRoundMessage') {
                props.history.push(`/loading/${roomNum}`)
            }
        })

        socket.emit('reqRole', { roomNum: roomNum, ID: localStorage.getItem('username') })

        // 取得url param放localStorage
        localStorage.setItem('roomNum', roomNum) //for Qrcode

        // 增加param傳axios
        console.log(roomNum)

        const params = new URLSearchParams()
        params.append('roomNum', roomNum)

        AdminService.postGetRoom(params).then((res) => {
            console.log(res.data)
            setRoom({
                pincode: roomNum,
                totalMemNum: res.data.allUsers.length,
                round: res.data.roomDetail.nowRound + 1,
                roundTime: res.data.roomDetail.roundTime,
                isGaming: res.data.roomDetail.isGaming,
            })
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
