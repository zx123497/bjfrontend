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
        paddingTop: '35px',
    },
}))

const GameLobby = (props) => {
    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        round: '',
        roundTime: '',
    })

    const [player, setPlayer] = useState({
        item: '',
        money: '',
        price: '',
        role: '',
        score: '',
        totalScore: '',
        transPartner: '',
        tranAmount: ''
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    useEffect(() => {
        // 先socket enterRoom才能fetch公告

        socket.emit('enterRoom', { roomNum: '9487' });

        socket.on('resRole', (res) => {
            setPlayer({
                item: '',
                money: res.user.money,
                price: res.user.price,
                role: 'seller',
                score: 0,
                totalScore: 0,
                transPartner: '',
                tranAmount: 0
            })
        })

        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg })
            console.log(`sysMsg: ${sysMsg}`)
        })

        socket.emit('reqRole', { roomNum: props.match.params.id, ID: localStorage.getItem('username')})
        
        // 取得url param放localStorage
        const roomNum = props.match.params.id
        localStorage.setItem('roomNum', roomNum) //for Qrcode

        // 增加param傳axios
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        
        AdminService.postGetRoom(params).then((res) => {
            console.log(res.data)
            setRoom({
                pincode: props.match.params.id,
                totalMemNum: res.data.allUsers.length,
                round: res.data.roomDetail.nowRound,
                roundTime: res.data.roomDetail.roundTime
            })
        })
    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <UserInfo data={player} />
            <PersonalTransaction data={player}/>
        </div>
    )
}

export default withRouter(GameLobby)
