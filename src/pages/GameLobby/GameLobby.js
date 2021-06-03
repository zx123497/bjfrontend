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
        round: '',
        roundTime: '',
    })

    const [player, setPlayer] = useState({
        item: '',
        money: '',
        price: '',
        role: '',
        score: '',
        totalScore: 0,
        transPartner: '456',
        tranAmount: 0
    })

    const [annoucement, setAnnouncement] = useState({
        roomAnnoucement: '',
    })


    useEffect(() => {

        socket.emit('enterRoom', { roomNum: '9487' });

        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg });
            console.log("sysMsg");
        });


        localStorage.setItem('username', '123')
        const roomNum = props.match.params.roomNum.substr(1)
        const roundNum = props.match.params.round.substr(1)
        localStorage.setItem('roomNum', roomNum) //for Qrcode
        localStorage.setItem('roundNum', roundNum) //for Qrcode

        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        params.append('roundNum', roundNum)

        UserService.postEnterRoom(params).then((res) => {
            if(res.status == "200") {
                setRoom({
                    pincode: roomNum,
                    totalMemNum: res.data.allUsers.length,
                    round: roundNum,
                    roundTime: res.data.roomDetail.roundTime
                })

                const users = new Map(res.data.allUsers)
                const role = users.get('123')
                setPlayer({
                    item: role.item,
                    money: role.money,
                    price: role.price,
                    role: role.role,
                    score: role.score,
                    totalScore: 0,
                    transPartner: '456',
                    tranAmount: 0
                })
            }
            
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
