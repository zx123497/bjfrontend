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
        role: ''
    })

    const [trans, setTrans] = useState({
        score: '',
        transAmount: '',
        transPartner: ''
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

        localStorage.setItem('round', room.round)
        localStorage.setItem('roomNum', roomNum)

        if(localStorage.getItem(`announcement_${roomNum}_${roundNum}`)) {
            setAnnouncement({roomAnnoucement: localStorage.getItem(`announcement_${roomNum}_${room.round}`)})
        }

        socket.on('enterRoom_resp', (res) => {
            // console.log(res)
            // console.log(room.round)
            // console.log(`tran${localStorage.getItem('round')}_money`)
            // console.log((localStorage.getItem(`tran${localStorage.getItem('round')}_money`)))
            if (res.status == 0 && res.thisRound_Record) {
                // 設定回合交易紀錄
                // localStorage.setItem(
                //     'tran' + localStorage.getItem('roundNum') + '_money',
                //     res.thisRound_Record.price
                // )
                // localStorage.setItem(
                //     'tran' + localStorage.getItem('roundNum') + '_user',
                //     res.thisRound_Record.userid
                // )
                setTrans({
                    score: res.user.score,
                    transAmount: res.thisRound_Record.price,
                    transPartner: res.thisRound_Record.userid
                })
            } else {
                setTrans({
                    score: res.user.score,
                    transAmount: 0,
                    transPartner: ''
                })
            }
        })

        socket.on('resRole', (res) => {
            setPlayer({
                    item: '',
                    money: res.user.money,
                    price: res.user.price,
                    role: res.user.role,
            })
        })

        // listen to endRound
        socket.on('endRoundResponse', (res) => {
            console.log(res)
            if ((res == 'endRoundMessage') || (res == 'error(no next round)')) {
                localStorage.removeItem(`announcement_${roomNum}_${roundNum}`)
                props.history.replace(`/loading/${roomNum}`)
            }
        })

        // listen to sysmsg
        socket.on('sys', (res) => {
            if (res != 'error') {
                setAnnouncement({ roomAnnoucement: res.message })
                localStorage.setItem(`announcement_${roomNum}_${roundNum}`, res.message)
            }
        })

        // listen to close room
        socket.on('get_out', (res) => {
            // socket.emit('leaveRoom', { roomNum: roomNum })
            localStorage.removeItem(`announcement_${roomNum}_${roundNum}`)
            props.history.push('/user/lobby')
        })

        socket.emit('enterRoom', {
            roomNum: roomNum,
            ID: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
        })

        socket.emit('currentTime', { roomNum: roomNum })

        socket.emit('reqRole',{roomNum: roomNum, ID: localStorage.getItem('id')})

    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <UserInfo data={player} />
            <PersonalTransaction data={{room: room, player: player, trans: trans}} />
        </div>
    )
}

export default withRouter(GameLobby)
