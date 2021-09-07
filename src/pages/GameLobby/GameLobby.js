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
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    const getRoom = () => {
        const getRoomParam = new URLSearchParams()
        getRoomParam.append('roomNum', roomNum)

        AdminService.postGetRoom(getRoomParam).then((res) => {
            if (res.status == '200') {
                setRoom({
                    pincode: props.match.params.id,
                    totalMemNum: res.data.allUsers.length,
                    round: res.data.roomDetail.nowRound + 1,
                    roundTime: res.data.roomDetail.roundTime,
                    isGaming: res.data.roomDetail.isGaming
                })
            }
        })
    }

    useEffect(() => {

        console.log(props)

        localStorage.setItem("roomNum",roomNum)

        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('id'),
            username: localStorage.getItem('username')
        })

        getRoom()
        localStorage.setItem("round", room.round)
        socket.emit('currentTime', { roomNum: roomNum })

        // listen to reqRole
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

        // listen to sendsysmsg
        socket.on('sys', function (res) {
            console.log(res)
        })

        // listen to endRound
        socket.on('endRoundResponse', (res) => {
            console.log(res)
            if ((res == 'endRoundMessage') || (res == 'error(no next round)')) {
                props.history.push(`/loading/${roomNum}`)
            }
        })

        // listen to sysmsg
        socket.on('sys', (res) => {
            if(res != 'error') {
                setAnnouncement({ roomAnnoucement: res.message })
                socket.emit('reqRole', { roomNum: roomNum, ID: localStorage.getItem('id') })
            }
        })

        // listen to close room
        socket.on('get_out', (res) => {
            socket.emit('leaveRoom', { roomNum: roomNum })
        })

        // ask for user role
        socket.emit('reqRole', { roomNum: roomNum, ID: localStorage.getItem('id') })

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
