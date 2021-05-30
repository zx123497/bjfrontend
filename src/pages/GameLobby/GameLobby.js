import { React, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'
import { socket } from '../../service/socket'
import UserService from '../../service/UserService'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: '35px',
    },
}))

const GameLobby = (props) => {
    const [room, setRoom] = useState({
        pincode: '',
        totalMemNum: '',
        roundTime: '',
    })

    const [player, setPlayer] = useState({
        money: '',
        price: '',
        role: '',
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })

    // set annoucement
    function announce() {
        socket.on('sys', (sysMsg) => {
            setAnnouncement(sysMsg)
        })
    }

    useEffect(() => {
        //因為重新連接，所以要再進一次房間後端才能找到他
        socket.emit('enterRoom', { roomNum: '9487' })

        // 這個function裡面的socket會讓後端爆掉
        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg })
            console.log('sysMsg')
        })

        localStorage.setItem('username', '123')
        const roomNum = props.match.params.roomNum.substr(1)
        const roundNum = props.match.params.round.substr(1)
        localStorage.setItem('roomNum', roomNum) //for Qrcode
        localStorage.setItem('roundNum', roundNum) //for Qrcode

        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        params.append('roundNum', roundNum)

        // UserService.postAssignRole(params).then((res) => {
        //     const data = new Map(res.data.data)
        //     setRoom({ totalMemNum: data.size, pincode: roomNum, roundTime: localStorage.getItem('countdown') })

        //     const role = data.get(localStorage.getItem('username'))
        //     setPlayer({ money: role.money, price: role.price, role: role.role })
        // })

        // socket.on('sys', function(sysMsg) {
        //     setAnnouncement({roomAnnoucement: sysMsg});
        // });
    }, [])

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <UpperBar data={room} />
            <AnnouncementLine data={annoucement} />
            <UserInfo data={player} />
            <PersonalTransaction />
        </div>
    )
}

export default withRouter(GameLobby)
