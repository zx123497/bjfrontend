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
        socket.on('sys', function (sysMsg) {
            setAnnouncement({ roomAnnoucement: sysMsg })
            console.log(`sysMsg: ${sysMsg}`)
        })
        
        // 取得url param放localStorage
        const roomNum = props.match.params.roomNum.substr(1)
        const roundNum = props.match.params.round.substr(1)
        localStorage.setItem('roomNum', roomNum) //for Qrcode
        localStorage.setItem('roundNum', roundNum) //for Qrcode

        ////////////// for testing //////////////
        // localStorage.setItem('trans_-1', '{round: "1", buyer: "123", seller: "234", money: "60"}');
        const result = {
            round: '1',
            buyer: '123',
            seller: '234',
            money: '60',
        }
        localStorage.setItem('trans_' + localStorage.getItem('roundNum'), JSON.stringify(result))
        /////////////////////////////////////////

        // 增加param傳axios
        const params = new URLSearchParams()
        params.append('roomNum', roomNum)
        params.append("ID", localStorage.getItem('username'));
        params.append("schoolname", 'NCU');
        params.append("username", localStorage.getItem('username'));

        UserService.postEnterRoom(params).then((res) => {
            if(res.status == "200") {
                setRoom({
                    pincode: roomNum,
                    totalMemNum: res.data.allUsers.length,
                    round: roundNum,
                    roundTime: res.data.roomDetail.roundTime
                })

                const users = new Map(res.data.allUsers)
                console.log(users)
                const role = users.get(localStorage.getItem('username'))
                console.log(role)
                
                setPlayer({
                    item: role.item,
                    money: role.money,
                    price: role.price,
                    role: role.role,
                    score: role.score,
                    totalScore: 0,
                    transPartner: '無交易紀錄',
                    tranAmount: 0
                })

                // 有交易紀錄後update player state
                const recordJSON = JSON.parse(localStorage.getItem(`trans_${roundNum}`));
                if(recordJSON != null) {
                    if(role.role == 'buyer') {
                        setPlayer({
                            item: role.item,
                            money: role.money,
                            price: role.price,
                            role: role.role,
                            score: role.score,
                            totalScore: (role.price-recordJSON.money),
                            transPartner: recordJSON.seller,
                            tranAmount: (0-recordJSON.money)
                        })
                    } else {
                        setPlayer({
                            item: role.item,
                            money: role.money,
                            price: role.price,
                            role: role.role,
                            score: role.score,
                            totalScore: (recordJSON.money-role.price),
                            transPartner: recordJSON.buyer,
                            tranAmount: recordJSON.money
                        })
                    }
                }
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
