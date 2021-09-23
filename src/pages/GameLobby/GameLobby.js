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
        score: ''
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
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

        getRoom()

        if(localStorage.getItem('announcement')) {
            setAnnouncement({roomAnnoucement: localStorage.getItem('announcement')})
        }

        socket.on('enterRoom_resp', (res) => {
            console.log(res)
            console.log(room.round)
            console.log(`tran${localStorage.getItem('round')}_money`)
            console.log((localStorage.getItem(`tran${localStorage.getItem('round')}_money`)))
            setPlayer({
                item: '',
                money: res.user.money,
                price: res.user.price,
                role: res.user.role,
                score: res.user.score
            })
        })

        socket.on('resRole', (res) => {
            if((localStorage.getItem(`tran${localStorage.getItem('round')}_money`)) &&
                (localStorage.getItem(`tran${localStorage.getItem('round')}_user`))) {
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                })
            } else {
                setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
                })
            }
        })

        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
        })

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
                localStorage.removeItem(`tran${localStorage.getItem('round')}_money`)
                localStorage.removeItem(`tran${localStorage.getItem('round')}_user`)
                localStorage.removeItem('announcement')
                props.history.replace(`/loading/${roomNum}`)
            }
        })

        // listen to sysmsg
        socket.on('sys', (res) => {
            if (res != 'error') {
                setAnnouncement({ roomAnnoucement: res.message })
                localStorage.setItem("announcement", res.message)
                socket.emit('reqRole', { roomNum: roomNum, ID: localStorage.getItem('id') })
            }
        })

        // listen to close room
        socket.on('get_out', (res) => {
            socket.emit('leaveRoom', { roomNum: roomNum })
            localStorage.removeItem(`tran${localStorage.getItem('round')}_money`)
            localStorage.removeItem(`tran${localStorage.getItem('round')}_user`)
            localStorage.removeItem('announcement')
            props.history.push('/user/lobby')
        })

    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <UserInfo data={player} />
            <PersonalTransaction data={{room: room, player: player}} />
        </div>
    )
}

export default withRouter(GameLobby)
