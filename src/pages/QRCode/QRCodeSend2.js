import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles, Button, Grid, TextField, Typography } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import BackPage from '../../components/BackPage/BackPage'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
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
    const [id, setId] = useState('')

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

    const classes = useStyles()
    const [money, setMoney] = useState('0')
    const [userId, setUserId] = useState('0')
    const [showQR, setShowQR] = useState(false)
    const [result, setResult] = useState('No result')

    const qrcode_value = []
    const count = 0

    const [state, setState] = React.useState({
        checked: true,
    })

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    // const [values, setValues] = React.useState({
    //     qrcode_value: ['money', 'userId'],
    // })

    // const handleChange = (prop) => (event) => {
    //     setValues({...values, [prop]: event.target.value });
    // };

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
    // 確認1
    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [trans, setTrans] = React.useState(false)

    const handleClose1 = () => {
        setOpen1(false)
    }
    const handleYes1 = () => {
        setOpen1(false)
        setOpen2(true)
    }
    const handleNo1 = () => {
        setOpen1(false)
    }

    const handleClose2 = () => {
        setOpen2(false)
    }
    const handleYes2 = () => {
        setOpen2(false)
        setTrans(true)
    }
    const handleNo2 = () => {
        setOpen2(false)
    }

    const handleScan = (data) => {
        //setResult(200) //掃描結果
        //setMoney(data.money)
        //setUserId(data.userId)
        setResult(data)
        if (data) {
            setOpen1(true)
            sethaveScan(true)
            console.log('data: ' + data)
            console.log('scan: ' + haveScan)
            console.log('result: ' + result)
        }

        //if (result == 200 && count == 1) {
        //console.log('data: ' + data)
        //count = 1
        //}
        //console.log('money:' + money)
        //console.log('userId:' + userId)
        //sethaveScan(true);
    }

    useEffect(() => {
        // for test 設定player
        // seller receiver 賣方 收款方
        // buyer payer     買方 付款方
        localStorage.setItem('player', 'seller')

        if (localStorage.getItem('player') == 'seller') {
            //setOpen1(true) //for test 先關掉
            setSeller(true) //先設為收款方
        } else {
            setSeller(false)
        }

        const params = new URLSearchParams()
        params.append('user_id', '234') //ID
        params.append('roomNum', '9487') //

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

        //if(data&&!haveScan){
        //if(1){
        //if(!haveScan){

        // 1.
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

        if (trans) {
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

                console.log('交易結束: ' + res.data)
            })
        }
    }, [result])

    const handleOnChange = (event) => {
        setMoney(event.target.value)
        //setUserId(localStorage.getItem('ID'))
        setUserId('123')
        qrcode_value[0] = money
        qrcode_value[1] = userId
        console.log('handleOnChange: ' + event.target.value)
        console.log('qrcode_value[0]: ' + money)
        console.log('qrcode_value[1]: ' + userId)
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
                            src="https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg"
                        ></img>
                    </div>
                    <Typography align="center" style={{ fontSize: '90%', fontWeight: '600', marginBottom: '8%' }}>
                        you are {localStorage.getItem('player')}
                    </Typography>
                    <Typography align="center" style={{ fontSize: '140%' }}>
                        {seller ? <div>即將收取 ${result}</div> : <div>即將轉出 ${result}</div>}
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
                        marginTop: '90px',
                        borderRadius: 30,
                        height: '58%',
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
                            src="https://www.harleytherapy.co.uk/counselling/wp-content/uploads/16297800391_5c6e812832.jpg"
                        ></img>
                    </div>
                    <Typography align="center" style={{ fontSize: '90%', fontWeight: '600', marginBottom: '8%' }}>
                        you are {localStorage.getItem('player')}
                    </Typography>
                    <Typography align="center" style={{ fontSize: '140%' }}>
                        {seller ? <div>即將收取 ${result}</div> : <div>即將轉出 ${result}</div>}
                    </Typography>
                    <DialogContentText
                        align="center"
                        id="alert-dialog-description"
                        style={{ marginTop: '5%', fontSize: '110%' }}
                    >
                        {seller ? (
                            <div>交易後支付 {result} 元的進貨成本</div>
                        ) : (
                            <div>交易後獲得 {result} 元的商品價值</div>
                        )}
                        <br></br>
                        淨賺 + 800 元好處
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
                        <QRCode
                            className={`${showQR ? 'QRshow' : 'QRhide'}`}
                            value={{ money: money, userId: userId }}
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
                <h4>{result}</h4>
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
