import React from 'react'
import { useState, useEffect } from 'react'
import { IconButton, makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, useHistory, withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import WarningIcon from '@material-ui/icons/Warning'
import BackPage from '../../components/BackPage/BackPage'
import Back from '../../components/BackPage/Back'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import QRCode from 'react-qr-code'
import { socket } from '../../service/socket'
import io from 'socket.io-client'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import ErrorIcon from '@material-ui/icons/Error'
import FaceIcon from '@material-ui/icons/Face'
// import { ScreenBrightness } from '@capacitor-community/screen-brightness'
// import ScreenBrightness from 'react-native-screen-brightness'
// import QrReader from 'react-qr-reader' //v1
import BarcodeReader from 'react-barcode-reader' //v2 沒有用QQ
// import QrReader from 'react-weblineindia-qrcode-scanner' //v3
// import QrReader from 'react-qr-scanner' //v4
// import { QrReader } from '@blackbox-vision/react-qr-reader' //v5
import QrReader from 'react-web-qr-reader' //v6

const useStyles = makeStyles((theme) => ({
    QRCodeSend2: {
        display: 'flex',
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden',
        alienItems: 'center',
        justifyContent: 'center',

        '& .pay': {
            display: 'block',
            alienItems: 'center',
            width: '100vw',
            height: '410px',
            margin: 'auto',
            textAlign: 'center',
        },
        '& .payhide': {
            display: 'none',
        },
        '& .switch': {
            position: 'fixed',
            right: '10%',
            top: '15%',
            color: 'white',
        },
        '& .icon': {
            color: theme.palette.primary.main,
        },
        '& .input': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '2%',
        },
        '& .sub_title': {
            color: 'white',
            fontSize: 15,
            fontWeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '5px',
            marginBottom: '20px',
        },
        '&. bottom': {
            fontSize: '12px',
            alienItems: 'center',
            margin: 'auto',
            marginLeft: '40%',
        },
        '@media (max-width: 400px)': {
            '& .QRshow': {
                width: '40%',
            },
            '& .QRhide': {
                width: '40%',
            },
        },
        '@media (min-width: 401px)': {
            '& .QRshow': {
                width: '21%',
            },
            '& .QRhide': {
                width: '21%',
            },
        },
        '& .QRshow': {
            margin: 'auto',
            marginBottom: '25px',
            display: 'block',
        },
        '& .QRhide': {
            display: 'none',
        },
        '& .Tshow': {
            display: 'block',
            // marginTop: '10px',
            marginBottom: '10px',
        },
        '& .Thide': {
            display: 'none',
            // marginTop: '10px',
            marginBottom: '10px',
        },
        '& .scan': {
            margin: 'auto',
            marginTop: '10px',
            marginBottom: '150px',
        },
        '& .scan2': {
            // margin: 'auto',
            // marginLeft: '15vw',
            //marginTop: '10px',
            //marginBottom: '150px',
        },
    },
}))

const QRCodeSend2 = ({ history }, props) => {
    const classes = useStyles()
    history.listen(() => {
        socket.on('disconnect', function () {
            console.log('disconnect' + this.id)
        })
    })

    const history2 = useHistory()

    const [money, setMoney] = useState('') // 付款金額
    const [showQR, setShowQR] = useState(false)
    const [errorMessage, setError] = useState('')
    const [state, setState] = React.useState({
        checked: true,
    })

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const previewStyle = {
        height: 240,
        width: 320,
    }

    const handleError = (err) => {
        console.error(err)
    }

    const [seller, setSeller] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [roundNum, setRoundNum] = React.useState('0')
    const [receiver_id, setReceiver_id] = React.useState('')
    const [wait, setWait] = React.useState(false)
    const [transById, setTransById] = React.useState(false)

    const handleClose1 = () => {
        setOpen1(false)
    }

    // 進入新回合時 皆設為沒交易過
    useEffect(() => {
        localStorage.setItem('haveTran', false)
        localStorage.removeItem('is_socketid')
        localStorage.removeItem('socketid')
    }, [localStorage.getItem('roundNum')])

    // 判斷身分
    useEffect(() => {
        if (localStorage.getItem('role') == 'seller') {
            setSeller(true)
        } else {
            setSeller(false)
        }
    }, [localStorage.getItem('role')])

    useEffect(() => {
        /*
       // 最後送get_chek_point的時候，他會自己再set一次id所以這邊讓他只能set一次
       // 若沒刪掉is_socketid user就不能再交易了
       */

        if (localStorage.getItem('is_socketid') == null && localStorage.getItem('haveTran') == 'false') {
            socket.emit('setSocket', {
                roomNum: localStorage.getItem('roomNum'),
                user_id: localStorage.getItem('id'),
            })

            localStorage.setItem('is_socketid', true)
        }

        //確認setSocketid成功與否
        socket.on('testsocket', function (data) {
            console.log(data)
            localStorage.setItem('socketid', data.s)
        })

        //每次setsocket 都會傳送訊息給 user 234
        //user 234 要先建立過連線
        socket.on('testbroadcast', function (data) {
            console.log(data.msg)
        })

        socket.on('connect_error ', function (data) {
            console.log(data)
        })
    }, [])

    useEffect(() => {
        //enterRoom
        socket.emit('enterRoom', {
            roomNum: localStorage.getItem('roomNum'),
            ID: localStorage.getItem('id'),
            username: localStorage.getItem('username'),
        })

        // listen to endRound
        socket.on('endRoundResponse', (res) => {
            console.log(res)
            if (res == 'endRoundMessage' || res == 'error(no next round)') {
                localStorage.removeItem(`tran${localStorage.getItem('round')}_money`)
                localStorage.removeItem(`tran${localStorage.getItem('round')}_user`)
                localStorage.removeItem('announcement')
                history2.replace(`/loading/${localStorage.getItem('roomNum')}`)
            }
        })

        // listen to sysmsg
        socket.on('sys', (res) => {
            console.log(res)
            if (res != 'error') {
                localStorage.setItem('announcement', res.message)
                socket.emit('reqRole', { roomNum: localStorage.getItem('roomNum'), ID: localStorage.getItem('id') })
            }
        })

        // listen to close room
        socket.on('get_out', (res) => {
            console.log('get_out')
            socket.emit('leaveRoom', { roomNum: localStorage.getItem('roomNum') })
            localStorage.removeItem(`tran${localStorage.getItem('round')}_money`)
            localStorage.removeItem(`tran${localStorage.getItem('round')}_user`)
            localStorage.removeItem('announcement')
            history2.push('/user/lobby')
        })
    }, [])

    // 與老師交易時的setSocket
    useEffect(() => {
        // 與老師交易時的setSocket
        if (localStorage.getItem('tranTeacher') == '1') {
            if (localStorage.getItem('is_socketid') == null) {
                socket.emit('setSocket', {
                    roomNum: localStorage.getItem('roomNum'),
                    user_id: localStorage.getItem('id'),
                })
                localStorage.setItem('is_socketid', true)
            }

            //確認setSocketid成功與否
            socket.on('testsocket', function (data) {
                console.log(data)
                localStorage.setItem('socketid', data.s)
            })
        }
    }, [localStorage.getItem('tranTeacher')])

    const handleYes1 = () => {
        setOpen1(false)

        if (localStorage.getItem('tranTeacher') == '1') {
            console.log('與老師交易')

            //確認接受老師轉入
            socket.emit('set_admin_transc_req', {
                roomNum: localStorage.getItem('roomNum'),
                round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                limit_times: localStorage.getItem('tranLimit'),
                payer_id: localStorage.getItem('tranUser'),
                receiver_id: localStorage.getItem('id'),
                money: localStorage.getItem('tranMoney'),
            })

            // 收款方等待接收 與老師交易是否成功之 socket
            socket.on('get_admin_transc_rsp', function (data) {
                console.log(data)
                if (data.point == '1') {
                    // console.log('get_admin_transc_rsp=1')
                    setError('恭喜您完成交易')
                    setOpen3(true)
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    localStorage.setItem(
                        'tranTeacher_' + localStorage.getItem('roundNum'),
                        localStorage.getItem('tranMoney')
                    )
                } else if (data.point == '0') {
                    // console.log('get_admin_transc_rsp=0')
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易失敗，請再試一次')
                    setOpen3(true)
                } else {
                    console.log('get_admin_transc_rsp=-1')
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易次數已超過限制')
                    setOpen3(true)
                }
            })
        } else {
            setOpen2(true)
            console.log(localStorage.getItem('role') + ' 確認交易1')
        }
        localStorage.setItem('tranTeacher', '0')
    }

    const handleNo1 = () => {
        setOpen1(false)
        localStorage.removeItem('is_socketid')
        localStorage.removeItem('socketid')
        if (seller) {
            console.log('seller 取消交易1')

            if (transById) {
                socket.emit('send_chek_point', {
                    roomNum: localStorage.getItem('roomNum'),
                    round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                    money: localStorage.getItem('tranMoney'),
                    payer_id: localStorage.getItem('payer_id'),
                    receiver_id: localStorage.getItem('id'),
                    chek_point: '0',
                })
            }
        } else {
            console.log('buyer 取消交易1')
            socket.emit('get_chek_point', {
                roomNum: localStorage.getItem('roomNum'),
                round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                money: localStorage.getItem('tranMoney'),
                payer_id: localStorage.getItem('id'),
                receiver_id: localStorage.getItem('receiver_id'),
                chek_point: '0',
            })
        }
    }
    const handleClose2 = () => {
        setOpen2(false)
    }
    const handleYes2 = () => {
        setOpen2(false)

        // 收款方確認要交易
        if (seller) {
            if (transById) {
                socket.emit('send_chek_point', {
                    roomNum: localStorage.getItem('roomNum'),
                    round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                    money: localStorage.getItem('tranMoney'),
                    payer_id: localStorage.getItem('payer_id'),
                    receiver_id: localStorage.getItem('id'),
                    chek_point: '1',
                })
            } else {
                socket.emit('checkQRcode', {
                    roomNum: localStorage.getItem('roomNum'),
                    payer_id: localStorage.getItem('tranUser'),
                    receiver_id: localStorage.getItem('id'),
                })
            }

            setWait(true)
            // 收款方等待接收 付款方是否確認交易之 socket
            console.log('seller確認交易 等待buyer付款')
        }

        if (!seller) {
            console.log('buyer 確定要交易')
            socket.emit('get_chek_point', {
                roomNum: localStorage.getItem('roomNum'),
                round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                money: money,
                payer_id: localStorage.getItem('id'),
                receiver_id: localStorage.getItem('receiver_id'),
                chek_point: '1',
            })

            setWait(true)

            // 轉帳方式: qrcode
            socket.on('getRecordRequest', function (data) {
                console.log('getRecordRequest1: ' + data)

                if (data) {
                    // 設定每局交易過後便無法再進行第二次交易
                    localStorage.setItem('haveTran', true)
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                } else {
                    setError('交易失敗\n 付款方無回應')
                    setOpen3(true)
                }
            })
        }

        // 賣方
        if (seller) {
            // 轉帳方式: id
            socket.on('receiver_transcResp', function (data) {
                if (data == '1') {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                } else if (data == '0') {
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易失敗\n 付款方不想付款')
                    setOpen3(true)
                }
                setTransById(false)
            })

            // 轉帳方式: qrcode
            socket.on('transcResp', function (data) {
                if (data == '1') {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                } else if (data == '0') {
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易失敗\n 付款方不想付款')
                    setOpen3(true)
                }
            })
        }
    }

    useEffect(() => {
        // if (wait) {
        if (!seller) {
            // 轉帳方式: id
            socket.on('payer_transcResp', function (data) {
                if (data == '1') {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                } else if (data == '0') {
                    setError('交易失敗\n 付款方無回應')
                    setOpen3(true)
                }
                setTransById(false)
            })

            // 轉帳方式: qrcode
            socket.on('getRecordRequest', function (data) {
                console.log('getRecordRequest1: ' + data)

                if (data) {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    console.log(localStorage.getItem('tranUser'))
                } else {
                    setError('交易失敗\n 付款方無回應')
                    setOpen3(true)
                }
            })
        } else {
            // 轉帳方式: id
            socket.on('receiver_transcResp', function (data) {
                if (data == '1') {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                } else if (data == '0') {
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易失敗\n 付款方不想付款')
                    setOpen3(true)
                }
                setTransById(false)
            })

            // 轉帳方式: qrcode
            socket.on('transcResp', function (data) {
                if (data == '1') {
                    localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                    setError('恭喜您完成交易')
                    setOpen3(true)

                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')

                    // 設定回合交易紀錄
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_money',
                        localStorage.getItem('tranMoney')
                    )
                    localStorage.setItem(
                        'tran' + localStorage.getItem('roundNum') + '_user',
                        localStorage.getItem('tranUser')
                    )
                } else if (data == '0') {
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')

                    setError('交易失敗\n 付款方不想付款')
                    setOpen3(true)
                } else {
                    localStorage.removeItem('is_socketid')
                    localStorage.removeItem('socketid')
                    setError('交易失敗\n 付款方無回應')
                    setOpen3(true)
                }
            })
        }
        setWait(false)
        // }
    }, [wait])

    const handleNo2 = () => {
        setOpen2(false)
        localStorage.removeItem('is_socketid')
        localStorage.removeItem('socketid')

        if (seller) {
            if (transById) {
                socket.emit('send_chek_point', {
                    roomNum: localStorage.getItem('roomNum'),
                    round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                    money: localStorage.getItem('tranMoney'),
                    payer_id: localStorage.getItem('payer_id'),
                    receiver_id: localStorage.getItem('id'),
                    chek_point: '0',
                })
            }
            console.log('seller 取消交易2')
        } else {
            console.log('buyer 取消交易2')
            socket.emit('get_chek_point', {
                roomNum: localStorage.getItem('roomNum'),
                round: parseInt(localStorage.getItem('roundNum'), 10) - 1,
                money: money,
                payer_id: localStorage.getItem('id'),
                receiver_id: localStorage.getItem('receiver_id'),
                chek_point: '0',
            })
        }
    }
    const handleClose = () => {
        setOpen3(false)
    }

    const handleScan = (data) => {
        setRoundNum(localStorage.getItem('roundNum'))

        if (localStorage.getItem('haveTran') == 'true' && data != null) {
            console.log('此回合已進行過交易')
            setError('此回合已進行過交易 \n無法再次交易')
            setOpen3(true)
        } else if (data != null) {
            if (data.match(/teacher=([^&]+)/)[1].split('/')[0] == '1') {
                //console.log('1:' + data.match(/teacher=([^&]+)/)[1].split('/')[0])
                localStorage.setItem('tranMoney', data.match(/money=([^&]+)/)[1].split('/')[0])
                localStorage.setItem('tranTeacher', '1')
                localStorage.setItem('tranLimit', data.match(/limit=([^&]+)/)[1].split('/')[0])
                localStorage.setItem('tranUser', data.match(/userId=([^&]+)/)[1])
            } else {
                console.log('tranUser', data.match(/userId=([^&]+)/)[1])
                // localStorage.setItem('tranTeacher', '0')
                localStorage.setItem('tranMoney', data.match(/money=([^&]+)/)[1].split('/')[0])
                localStorage.setItem('tranUser', data.match(/userId=([^&]+)/)[1])
            }
            setOpen1(true)
        }
    }

    // 設定轉出的金額
    const handleOnChange = (event) => {
        setMoney(event.target.value)
        localStorage.setItem('userMoney', event.target.value)
    }

    // 設定轉出的交易對象id
    const [values, setValues] = React.useState({
        tranId: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    // const ScreenBrightness = require('react-native-device-brightness')

    const handleQRShow = () => {
        // ScreenBrightness.setBrightness(0.6) // between 0 and 1
        // ScreenBrightness.getBrightness().then((brightness) => {
        //     console.log('brightness', brightness)
        // })

        if (seller) {
            setError('賣方無法使用付款功能')
            setOpen3(true)
        } else {
            if (localStorage.getItem('haveTran') == 'true') {
                console.log('此回合已進行過交易')
                setError('此回合已進行過交易 \n無法再次交易')
                setOpen3(true)
            } else if (money <= 0) {
                setError('付款金額需大於 0 元')
                setOpen3(true)
            } else if (localStorage.getItem('money') === null) {
                setError('系統錯誤 請重整頁面')
                setOpen3(true)
            } else if (parseInt(localStorage.getItem('userMoney'), 10) > parseInt(localStorage.getItem('money'), 10)) {
                console.log(
                    parseInt(localStorage.getItem('userMoney'), 10) +
                        ' > ' +
                        parseInt(localStorage.getItem('money'), 10)
                )
                setError('超出您的餘額')
                setOpen3(true)
            } else {
                localStorage.setItem('tranMoney', money)

                // 匯款方式:輸入id
                if (values.tranId !== '') {
                    // 付款方傳送匯款要求
                    socket.emit('send_transc_req', {
                        roomNum: localStorage.getItem('roomNum'),
                        payer_id: localStorage.getItem('id'),
                        receiver_id: values.tranId,
                        transc_money: money,
                    })

                    localStorage.setItem('tranUser', values.tranId)
                    // socket.on 交易對象id不存在
                    setError('等待收款方接受交易 請勿離開本畫面')
                    setTransById(true)
                    setOpen3(true)
                } else {
                    // 匯款方式:掃QRcode
                    localStorage.setItem('tranMoney', money)
                    setShowQR(true)
                }
            }
        }

        if (!seller) {
            // 轉帳方式: id
            if (transById) {
                socket.on('payer_transcResp', function (data) {
                    if (data == '1') {
                        setOpen1(true)
                        localStorage.setItem('haveTran', true) // 設定每局交易過後便無法再進行第二次交易
                        setError('恭喜您完成交易')
                        setOpen3(true)

                        // 設定回合交易紀錄
                        localStorage.setItem(
                            'tran' + localStorage.getItem('roundNum') + '_money',
                            localStorage.getItem('tranMoney')
                        )
                        localStorage.setItem(
                            'tran' + localStorage.getItem('roundNum') + '_user',
                            localStorage.getItem('tranUser')
                        )

                        localStorage.removeItem('is_socketid')
                        localStorage.removeItem('socketid')
                    } else if (data == '0') {
                        setError('交易失敗\n 付款方無回應')
                        setOpen3(true)
                    }
                    setTransById(false)
                })
            } else {
                // 轉帳方式: qrcode
                socket.on('transCheckReq', function (data) {
                    setReceiver_id(data)
                    console.log('receiver' + data)
                    localStorage.setItem('receiver_id', data)
                    localStorage.setItem('tranUser', data)

                    setOpen1(true)
                })
            }
        }
    }

    const handleQRHide = () => {
        setShowQR(false)
    }

    useEffect(() => {
        // 收款方監聽匯款要求(輸入id)
        socket.on('transCheckReq', function (data) {
            if (data.transc_money !== undefined) {
                console.log(data)
                localStorage.setItem('payer_id', data.payer_id)
                localStorage.setItem('tranUser', data.payer_id)
                localStorage.setItem('tranMoney', data.transc_money)
                setTransById(true)
                setOpen1(true)
            }
        })
    }, [])

    return (
        <div className={classes.QRCodeSend2}>
            <BackPage refs={`gamelobby/${localStorage.getItem('roomNum')}`}></BackPage>
            {/* 確認1 */}
            <Dialog
                PaperProps={{
                    style: {
                        width: '290px',
                        padding: '28px 10px 28px 10px',
                    },
                }}
                open={open1}
                onClose={handleClose1}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" style={{ fontWeight: '500' }} variant="h5" align="center">
                        交易對象
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            position: 'relative',
                            margin: 'auto',
                            marginTop: '-2%',
                            marginBottom: '2%',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                        }}
                    >
                        <img
                            style={{ display: 'block', height: '100%', width: '100%', borderRadius: '50%' }}
                            src="data:image/jpeg;base64,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"
                        ></img>
                    </div>
                    <Typography
                        align="center"
                        variant="h6"
                        style={{
                            fontWeight: '600',
                            marginBottom: '10px',
                        }}
                    >
                        {localStorage.getItem('tranTeacher') == '1' ? (
                            <div>teacher</div>
                        ) : (
                            <div>{localStorage.getItem('tranUser')}</div>
                        )}
                    </Typography>
                    <Typography align="center" variant="h6">
                        {(() => {
                            if (localStorage.getItem('tranTeacher') == '1') {
                                if (localStorage.getItem('tranMoney') >= 0)
                                    return <div>即將收取 ${localStorage.getItem('tranMoney')}</div>
                                else return <div>即將扣款 ${localStorage.getItem('tranMoney')}</div>
                            } else {
                                if (localStorage.getItem('role') == 'seller')
                                    return <div>即將收取 ${localStorage.getItem('tranMoney')}</div>
                                else return <div>即將轉出 ${localStorage.getItem('tranMoney')}</div>
                            }
                        })()}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleYes1}
                        className="sure"
                        disableElevation
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '600',
                            borderRadius: '15px',
                            boxShadow: 'none',
                            width: '35%',
                            backgroundColor: '#1e88e5',
                            color: '#FFFFFF',
                        }}
                    >
                        確定
                    </Button>

                    <Button
                        onClick={handleNo1}
                        className="cancel"
                        color="default"
                        disableElevation
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '600',
                            borderRadius: '15px',
                            boxShadow: 'none',
                            width: '35%',
                            backgroundColor: '#616466',
                            color: '#FFFFFF',
                        }}
                    >
                        取消
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 確認2 */}
            <Dialog
                PaperProps={{
                    style: {
                        padding: '28px 30px 28px 30px',
                    },
                }}
                open={open2}
                onClose={handleClose2}
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" style={{ fontWeight: '500' }} variant="h5" align="center">
                        交易對象
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            position: 'relative',
                            margin: 'auto',
                            marginTop: '-2%',
                            marginBottom: '2%',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                        }}
                    >
                        <img
                            style={{
                                display: 'block',
                                height: '100%',
                                width: '100%',
                                borderRadius: '50%',
                            }}
                            src="data:image/jpeg;base64,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"
                        ></img>
                    </div>
                    <Typography align="center" style={{ fontSize: '110%', fontWeight: '600', marginBottom: '10px' }}>
                        {localStorage.getItem('tranTeacher') == '1' ? (
                            <div>teacher</div>
                        ) : (
                            <div>{localStorage.getItem('tranUser')}</div>
                        )}
                    </Typography>
                    <Typography align="center" style={{ fontSize: '140%' }}>
                        {seller ? (
                            <div>即將收取 ${localStorage.getItem('tranMoney')}</div>
                        ) : (
                            <div>即將轉出 ${localStorage.getItem('tranMoney')}</div>
                        )}
                    </Typography>
                    <DialogContentText
                        align="center"
                        id="alert-dialog-description"
                        style={{ marginTop: '7%', fontSize: '110%' }}
                    >
                        {seller ? (
                            <div>交易後支付 {localStorage.getItem('price')} 元的進貨成本</div>
                        ) : (
                            <div>交易後獲得 {localStorage.getItem('price')} 元的商品價值</div>
                        )}

                        {seller ? (
                            <div>淨賺 {localStorage.getItem('tranMoney') - localStorage.getItem('price')} 元好處</div>
                        ) : (
                            <div>淨賺 {localStorage.getItem('price') - localStorage.getItem('tranMoney')} 元好處</div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        id="yes"
                        onClick={handleYes2}
                        className="sure"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '600',
                            borderRadius: '15px',
                            boxShadow: 'none',
                            width: '40%',
                            backgroundColor: '#1e88e5',
                            color: '#FFFFFF',
                        }}
                    >
                        確定
                    </Button>
                    <Button
                        onClick={handleNo2}
                        className="cancel"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '600',
                            borderRadius: '15px',
                            boxShadow: 'none',
                            width: '40%',
                            backgroundColor: '#616466',
                            color: '#FFFFFF',
                        }}
                    >
                        取消
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ErrorMessage */}
            <Dialog open={open3} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" style={{ fontWeight: '500' }} justifyContent="center" align="center">
                        <ErrorIcon color="#555"></ErrorIcon> &nbsp;{'提醒'}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography align="center" style={{ whiteSpace: 'pre-line', fontSize: '120%', marginTop: '4%' }}>
                        {errorMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        className="sure"
                        style={{
                            margin: 'auto',
                            color: '#00AAA4',
                        }}
                    >
                        確定
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 付款 */}
            <div className={`${state.checked ? 'pay' : 'payhide'}`}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.checked}
                            color="ultimate"
                            onChange={handleSwitchChange}
                            name="checked"
                            edge="end"
                        />
                    }
                    className="switch"
                    label="付款"
                />
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid className="input" container spacing={1} alignItems="flex-end">
                        <Grid item className="icon">
                            <FaceIcon></FaceIcon>
                        </Grid>
                        <Grid item>
                            <TextField
                                disabled
                                id="tranId"
                                className={`${showQR ? 'Tshow' : 'Thide'}`}
                                value={values.tranId}
                                onChange={handleChange('tranId')}
                                label={
                                    <Typography style={{ color: 'white' }} variant="headline" component="h3">
                                        轉出對象id
                                    </Typography>
                                }
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '100%' }}
                            />

                            <TextField
                                id="tranId"
                                className={`${showQR ? 'Thide' : 'Tshow'}`}
                                value={values.tranId}
                                onChange={handleChange('tranId')}
                                label={
                                    <Typography style={{ color: 'white' }} variant="headline" component="h3">
                                        轉出對象id
                                    </Typography>
                                }
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth="true"
                            />
                        </Grid>
                    </Grid>
                    <Grid className="input" container spacing={1} alignItems="flex-end">
                        <Grid item className="icon">
                            <MonetizationOnIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                disabled
                                id="money"
                                className={`${showQR ? 'Tshow' : 'Thide'}`}
                                value={money}
                                onChange={handleOnChange}
                                type="number"
                                label={
                                    <Typography style={{ color: 'white' }} variant="headline" component="h3">
                                        轉出
                                    </Typography>
                                }
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '100%' }}
                            />

                            <TextField
                                id="money"
                                className={`${showQR ? 'Thide' : 'Tshow'}`}
                                value={money}
                                onChange={handleOnChange}
                                type="number"
                                label={
                                    <Typography style={{ color: 'white' }} variant="headline" component="h3">
                                        轉出
                                    </Typography>
                                }
                                inputProps={{ style: { fontFamily: 'Arial', color: 'white' } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth="true"
                            />
                        </Grid>
                    </Grid>
                </form>
                <div className="sub_title">提醒目前餘額為 ${localStorage.getItem('money')}</div>
                <div className="bottom">
                    <div>
                        <QRCode
                            className={`${showQR ? 'QRshow' : 'QRhide'}`}
                            level="H"
                            size={220}
                            value={'teacher=0/' + 'money=' + money + '/userId=' + localStorage.getItem('id')}
                        />
                    </div>
                    <Link
                        component={Button}
                        style={{
                            margin: 'auto',
                            boxShadow: 'none',
                            borderRadius: '20px',
                            backgroundColor: '#FFFFFF',
                            color: '#555',
                        }}
                        onClick={handleQRShow}
                        className={`${showQR ? 'QRhide' : 'QRshow'}`}
                    >
                        確定金額
                    </Link>
                    <Link
                        component={Button}
                        style={{
                            margin: 'auto',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            backgroundColor: '#FFFFFF',
                            color: '#555',
                        }}
                        onClick={handleQRHide}
                        className={`${showQR ? 'QRshow' : 'QRhide'}`}
                    >
                        重設金額
                    </Link>
                </div>
            </div>

            {/* 收款 */}
            <div className={`${state.checked ? 'payhide' : 'pay'}`}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={state.checked}
                            color="ultimate"
                            onChange={handleSwitchChange}
                            name="checked"
                            edge="end"
                        />
                    }
                    className="switch"
                    label="收款"
                />
                <h4>請掃描付款者 QRCode</h4>
                {/* version 1 */}
                {/* <QrReader
                    className="scan"
                    delay={200}
                    onError={handleError}
                    onScan={handleScan}
                    facingMode={'enviroment'}
                    style={{
                        height: '500',
                        width: '500',
                    }}
                /> */}
                {/* version 2 */}
                {/* <BarcodeReader className="scan" onError={handleError} onScan={handleScan} facingMode={'environment'} /> */}
                {/* version 3 */}
                {/* <QrReader
                    className="scan2"
                    // delay={this.state.delay}
                    style={{
                        height: '500',
                        width: '500',
                    }}
                    facingMode="rear" //front
                    onError={handleError}
                    onScan={handleScan}
                /> */}
                {/* version 4 */}
                {/* <QrReader
                    className="scan"
                    delay={200}
                    onError={handleError}
                    onScan={handleScan}
                    facingMode="front"
                    style={{
                        height: '500',
                        width: '500',
                    }}
                /> */}
                {/* version 5 */}
                <QrReader
                    className="scan"
                    onResult={handleScan}
                    style={{
                        height: '500',
                        width: '500',
                    }}
                />
            </div>
        </div>
    )
}

export default withRouter(QRCodeSend2)
