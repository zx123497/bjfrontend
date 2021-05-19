import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import WarningIcon from '@material-ui/icons/Warning'
import BackPage from '../../components/BackPage/BackPage'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import ErrorIcon from '@material-ui/icons/Error'
import InputAdornment from '@material-ui/core/InputAdornment'
import QrReader from 'react-qr-reader'
import QRCode from 'react-qr-code'
import UserService from '../../service/UserService'
import Noty from 'noty'
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import { NextWeek, PanoramaWideAngleTwoTone } from '@material-ui/icons'
import { socket } from '../../service/socket'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles((theme) => ({
    QRCodeSend2: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
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
            top: '10.5%',
            color: theme.palette.ultimate.main,
        },
        '& .input': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginTop: '-30px',
        },
        '& .sub_title': {
            color: theme.palette.ultimate.main,
            fontSize: 15,
            fontWeight: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '20px',
        },
        '&. bottom': {
            fontSize: '12px',
            alienItems: 'center',
            margin: 'auto',
            marginLeft: '40%',
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
            marginTop: '10px',
            marginBottom: '10px',
        },
        '& .Thide': {
            display: 'none',
            marginTop: '10px',
            marginBottom: '10px',
        },
        '& .scan': {
            margin: 'auto',
            marginTop: '10px',
            marginBottom: '150px',
        },
    },
}))

const QRCodeSend2 = (props) => {
    const classes = useStyles()
    const [money, setMoney] = useState('')
    const [showQR, setShowQR] = useState(false)
    const [result, setResult] = useState('No result')

    const [state, setState] = React.useState({
        checked: true,
    })

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const handleSubmit = (event) => {
        //alert('money: ' + values.money)
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
    const [haveScan, sethaveScan] = React.useState(false)
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(true)
    const [trans, setTrans] = React.useState(false)
    const [roundNum, setRoundNum] = React.useState('0')

    const handleClose1 = () => {
        setOpen1(false)
    }
    const handleYes1 = () => {
        setOpen1(false)
        setOpen2(true)
        console.log(' 確認交易1')
    }
    const handleNo1 = () => {
        setOpen1(false)
        console.log('取消交易1')
    }

    const handleClose2 = () => {
        setOpen2(false)
    }
    const handleYes2 = () => {
        setOpen2(false)
        console.log('確認交易！！！')

        if (!trans) {
            const transaction = ['payer', 'receiver', 'money', 'roomNum', 'round']
            transaction[0] = '234'
            transaction[1] = '567'
            transaction[2] = '20'
            transaction[3] = '9487'
            transaction[4] = '0'

            // 2.
            // const transaction = {
            //     payer: '234',
            //     receiver: '567',
            //     money: '20',
            //     roomNum: '9487',
            //     round: '1',
            // }
            console.log('tran: ' + transaction)

            const params2 = new URLSearchParams()
            params2.append('transaction', transaction)

            UserService.postCheckQrcode(params2).then((res) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'nest',
                    text: `成功: ${res}`,
                    timeout: '4000',
                    progressBar: true,
                    closeWith: ['click'],
                }).show()

                setTrans(true) //設定每局交易過後便無法再進行第二次交易
                console.log('交易結束: ' + res.data)
            })

            //setTrans(true) //for test 之後刪掉
        }
    }
    const handleNo2 = () => {
        setOpen2(false)
        console.log('取消交易QQ')
    }
    const handleClose = () => {
        setOpen3(false)
    }

    const handleScan = (data) => {
        setRoundNum(localStorage.getItem('roundNum'))

        if (trans && data != null) {
            console.log('此回合已進行過交易')
            setOpen3(true)
        } else if (data != null) {
            setResult(data)
            localStorage.setItem('tranMoney', data.match(/money=([^&]+)/)[1].split('/')[0]) //test 字母
            localStorage.setItem('tranUser', data.match(/userId=([^&]+)/)[1]) //test 字母
            setOpen1(true)
            sethaveScan(true)
            console.log(localStorage.getItem('tranMoney'))
            console.log(localStorage.getItem('tranUser'))
            console.log('scan: ' + haveScan)
            console.log('result: ' + result)
        }
    }

    useEffect(() => {
        setTrans(false)
    }, [roundNum])

    // useEffect(()=>{
    //     if(socket){
    //         //連線成功在 console 中打印訊息
    //         console.log('success connect!')
    //         //設定監聽
    //         initWebSocket()
    //     }
    // },[socket]);

    // const initWebSocket = () => {
    //     //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
    //     socket.on('get_chek_point', msg => {
    //         console.log(msg);
    //     })
    // };

    // function get_chek_point() {
    //     socket.on('search_user',  (payer_id)=> {

    //         if(localStorage.getItem('user_id') == payer_id){

    //             if(id=="yes"){
    //                 var msg = '1';
    //                 socket.emit('get_chek_point', msg);
    //             }
    //             if(id=="no"){
    //                 var msg = '0';
    //                 socket.emit('get_chek_point', msg);
    //             }
    //         }
    //     });
    // }

    useEffect(() => {
        // for test 設定player (之後改成role)
        // seller receiver 賣方 收款方
        // buyer payer     買方 付款方

        if (localStorage.getItem('role') == 'seller') {
            setSeller(true) //先設為收款方
        } else {
            setSeller(false)
        }

        const params = new URLSearchParams()
        params.append('user_id', localStorage.getItem('username'))
        params.append('roomNum', localStorage.getItem('roomNum'))

        UserService.postScanQrcode(params).then((res) => {
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'nest',
                text: `成功: ${res}`,
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
            }).show()

            if (res) {
                //console.log('當前金額: ' + res.data)
                localStorage.setItem('userMoney', res.data)
            }
        })
    }, [result])

    const handleOnChange = (event) => {
        setMoney(event.target.value)
    }

    const handleQRShow = () => {
        setShowQR(true)
    }
    const handleQRHide = () => {
        setShowQR(false)
    }

    return (
        <div className={classes.QRCodeSend2}>
            <BackPage refs="login"></BackPage>

            {/* 確認1 */}
            <Dialog
                PaperProps={{
                    style: {
                        marginTop: '90px',
                        borderRadius: 30,
                        height: '46%',
                        width: '300px',
                        padding: '28px 20px 28px 20px',
                        backgroundColor: '#EAEAEA',
                    },
                }}
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" variant="h6" align="center">
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
                    <Typography align="center" style={{ fontSize: '90%', fontWeight: '600', marginBottom: '8%' }}>
                        you are {localStorage.getItem('player')}
                    </Typography>
                    <Typography align="center" style={{ fontSize: '140%' }}>
                        {seller ? (
                            <div>即將收取 ${localStorage.getItem('tranMoney')}</div>
                        ) : (
                            <div>即將轉出 ${localStorage.getItem('tranMoney')}</div>
                        )}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleYes1}
                        className="sure"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            height: '110%',
                            backgroundColor: '#00AAA4',
                            color: '#FFFFFF',
                        }}
                    >
                        確定
                    </Button>
                    <Button
                        onClick={handleNo1}
                        className="cancel"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            height: '110%',
                            backgroundColor: '#848484',
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
                        marginTop: '75px',
                        borderRadius: 30,
                        height: '53%',
                        width: '300px',
                        padding: '28px 20px 28px 20px',
                        backgroundColor: '#EAEAEA',
                    },
                }}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" variant="h6" align="center">
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
                    <Typography align="center" style={{ fontSize: '90%', fontWeight: '600', marginBottom: '8%' }}>
                        you are {localStorage.getItem('player')}
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
                        onClick={handleYes2}
                        className="sure"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            backgroundColor: '#00AAA4',
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
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            backgroundColor: '#848484',
                            color: '#FFFFFF',
                        }}
                    >
                        取消
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 已交易 */}
            <Dialog
                PaperProps={{
                    style: {
                        marginTop: '90px',
                        borderRadius: 30,
                        height: '30%',
                        width: '300px',
                        padding: '28px 20px 28px 20px',
                        backgroundColor: '#EAEAEA',
                    },
                }}
                open={open3}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <Typography className="title" variant="h5" align="center">
                        <WarningIcon color="disabled"></WarningIcon> &nbsp;提醒
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography align="center" style={{ fontSize: '120%', marginTop: '4%' }}>
                        此回合已進行過交易
                        <br></br>無法再次交易
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        className="sure"
                        style={{
                            margin: 'auto',
                            fontSize: '90%',
                            fontWeight: '500',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '40%',
                            height: '110%',
                            backgroundColor: '#00AAA4',
                            color: '#FFFFFF',
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

                <Grid className="input" container spacing={1} alignItems="flex-end">
                    <Grid item className="icon">
                        <MonetizationOnIcon />
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit} noValidate autoComplete="off">
                            <TextField
                                disabled
                                id="money"
                                className={`${showQR ? 'Tshow' : 'Thide'}`}
                                value={money}
                                onChange={handleOnChange}
                                type="number"
                                label={
                                    <Typography variant="headline" component="h3">
                                        轉出
                                    </Typography>
                                }
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
                                    <Typography variant="headline" component="h3">
                                        轉出
                                    </Typography>
                                }
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth="true"
                            />
                        </form>
                    </Grid>
                </Grid>
                <div className="sub_title">提醒目前餘額為 ${localStorage.getItem('userMoney')}</div>
                {/* <Button id="yes" onClick={() => setId("yes")} >Yes</Button>
            <Button id="no" onClick={() => setId("no")} >No</Button> */}
                <div className="bottom">
                    <div>
                        {/* <QRCode
                            className={`${showQR ? 'QRshow' : 'QRhide'}`}
                            value={{ money: money, userId: userId }}
                        /> */}
                        <QRCode
                            className={`${showQR ? 'QRshow' : 'QRhide'}`}
                            value={'money=' + money + '/userId=' + localStorage.getItem('username')}
                        />
                        {/* <QRCode className={`${showQR ? 'QRshow' : 'QRhide'}`} value={money} /> */}
                    </div>

                    <Link
                        component={Button}
                        style={{
                            margin: 'auto',
                            borderRadius: '20px',
                            boxShadow: 'none',
                            width: '20%',
                            backgroundColor: '#FFFFFF',
                            color: '#939597',
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
                            width: '20%',
                            backgroundColor: '#FFFFFF',
                            color: '#939597',
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
                {/* <h4>交易金額：{haveScan ? localStorage.getItem('tranMoney') : '?'}</h4> */}
                <h4>請掃描付款者 QRCode</h4>
                <QrReader
                    className="scan"
                    delay={300}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                    facingMode={'rear'}
                />
                {/* <QRCodeScanner
                className="scan"
                onError={handleError}
                onScan={handleScan}
                onRead={this.onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <Text style={styles.centerText}>
                        Go to{' '}
                    <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                        your computer and scan the QR code.
                    </Text>
                }
                bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                }
            /> */}
            </div>
        </div>
    )
}

export default withRouter(QRCodeSend2)
