import React from 'react'
import { useState } from 'react'
import { makeStyles, Button, Grid, TextField, Typography, StylesProvider } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import BackPage from '../../components/BackPage/BackPage'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import InputAdornment from '@material-ui/core/InputAdornment'
import QrReader from 'react-qr-reader'
import QRCode from 'react-qr-code'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles((theme) => ({
    QRCodeSend: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: 'white',
        height: '100vh',
        overflow: 'hidden',
        alienItems: 'center',
        justifyContent: 'center',

        '& .switch': {
            color: '#555',
        },
        '& .icon': {
            color: theme.palette.primary.main,
        },
        '& .input': {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
        '& .switchlimit': {
            marginLeft: '0px',
            marginTop: '3%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .num': {
            color: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .people': {
            color:"#555",
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .grid-container': {
            justifyContent: 'center',
            marginTop: '130px',
            display: 'grid',
            gridTemplateRows: '10% 20% 10%',
            gridTemplateColumns: '400px',
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
        '& .limit': {
            color: '#555',
            display: 'block',
            alienItems: 'center',
            margin: 'auto',
            textAlign: 'center',
        },
        '& .unlimit': {
            color: '#555',
            display: 'none',
        },
        '& .center-text': {
            display: 'block',
            alienItems: 'center',
            margin: 'auto',
            textAlign: 'center',
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
    const [showQR, setShowQR] = useState(false)
    const [result, setResult] = useState('No result')
    const [open, setOpen] = React.useState(false)
    const [errorMessage, setError] = useState('')
    const [state, setState] = React.useState({
        checked: true, //開啟人數限制
    })

    const handleSwitchChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const [values, setValues] = React.useState({
        money: '',
        numpeople: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = (event) => {
        //alert('money: ' + values.money);

        event.preventDefault()
    }

    const previewStyle = {
        height: 240,
        width: 320,
    }

    const handleError = (err) => {
        console.error(err)
    }

    const handleScan = (data) => {
        if (data != null) setResult(data)
        console.log(result)
    }

    //const handleOnChange=(event)=>{
    //    setMoney(event.target.value);
    //    console.log(event.target.value);
    //}

    const handleQRShow = () => {
        console.log('checked:' + state.checked)
        if (state.checked) {
            if (values.numpeople <= 0) {
                setError('人數上限需大於0')
                setOpen(true)
            } else {
                setShowQR(true)
            }
        } else {
            setShowQR(true)
        }
    }
    const handleQRHide = () => {
        setShowQR(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.QRCodeSend}>
            <BackPage refs={`admin/gamelobby/${localStorage.getItem('roomNum')}`}></BackPage>

            {/* 付款 */}
            <div className="grid-container">
                <div className="grid-item">
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
                                    value={values.money}
                                    onChange={handleChange('money')}
                                    type="number"
                                    label={
                                        <Typography style={{ color: '#555' }} variant="headline" component="h3">
                                            轉出
                                        </Typography>
                                    }
                                    inputProps={{ style: { fontFamily: 'Arial', color: '#555' } }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ width: '100%' }}
                                />
                                <TextField
                                    id="money"
                                    className={`${showQR ? 'Thide' : 'Tshow'}`}
                                    value={values.money}
                                    onChange={handleChange('money')}
                                    type="number"
                                    label={
                                        <Typography style={{ color: '#555' }} variant="headline" component="h3">
                                            轉出
                                        </Typography>
                                    }
                                    inputProps={{ style: { fontFamily: 'Arial', color: '#555' } }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth="true"
                                />
                            </form>
                        </Grid>
                    </Grid>
                </div>
                <div className="grid-item">
                    <Grid className="switchlimit" container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <div className={`${state.checked ? 'limit' : 'unlimit'}`}>
                                人數限制 &ensp;
                                {showQR ? (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={state.checked}
                                                color="default"
                                                onChange={handleSwitchChange}
                                                name="checked"
                                                edge="end"
                                            />
                                        }
                                        className="switch"
                                        disabled
                                        label="開"
                                    />
                                ) : (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={state.checked}
                                                color="default"
                                                onChange={handleSwitchChange}
                                                name="checked"
                                                edge="end"
                                            />
                                        }
                                        className="switch"
                                        label="開"
                                    />
                                )}
                                <div className="num" container>
                                    <form className="people" onSubmit={handleSubmit} noValidate autoComplete="off">
                                        人數上限&ensp;&ensp;
                                        <TextField
                                            disabled
                                            id="numpeople"
                                            className={`${showQR ? 'Tshow' : 'Thide'}`}
                                            value={values.numpeople}
                                            onChange={handleChange('numpeople')}
                                            type="number"
                                            style={{ width: '32%' }}
                                            inputProps={{ style: { fontFamily: 'Arial', color: '#555' } }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="numpeople"
                                            className={`${showQR ? 'Thide' : 'Tshow'}`}
                                            value={values.numpeople}
                                            onChange={handleChange('numpeople')}
                                            type="number"
                                            style={{ width: '32%' }}
                                            inputProps={{ style: { fontFamily: 'Arial', color: '#555' } }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className={`${state.checked ? 'unlimit' : 'limit'}`}>
                                人數限制 &ensp;
                                {showQR ? (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={state.checked}
                                                // color="default"
                                                color="ultimate"
                                                onChange={handleSwitchChange}
                                                name="checked"
                                                edge="end"
                                            />
                                        }
                                        className="switch"
                                        disabled
                                        label="關"
                                    />
                                ) : (
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={state.checked}
                                                // color="default"
                                                color="ultimate"
                                                onChange={handleSwitchChange}
                                                name="checked"
                                                edge="end"
                                            />
                                        }
                                        className="switch"
                                        label="關"
                                    />
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="grid-item">
                    <div className="bottom">
                        <div>
                            {state.checked ? (
                                <QRCode
                                    className={`${showQR ? 'QRshow' : 'QRhide'}`}
                                    value={
                                        'teacher=1/' +
                                        'money=' +
                                        values.money +
                                        '/limit=' +
                                        values.numpeople +
                                        '/userId=' +
                                        localStorage.getItem('email')
                                    }
                                />
                            ) : (
                                <QRCode
                                    className={`${showQR ? 'QRshow' : 'QRhide'}`}
                                    value={
                                        'teacher=1/' +
                                        'money=' +
                                        values.money +
                                        '/limit=-1' +
                                        '/userId=' +
                                        localStorage.getItem('email')
                                    }
                                />
                            )}
                        </div>
                        <Link
                            component={Button}
                            style={{
                                margin: 'auto',
                                borderRadius: '20px',
                                boxShadow: 'none',
                                width: '20%',
                                backgroundColor: '#555',
                                // color: '#939597',
                                color: '#fff',
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
                                backgroundColor: '#555',
                                // color: '#939597',
                                color: '#fff',
                            }}
                            onClick={handleQRHide}
                            className={`${showQR ? 'QRshow' : 'QRhide'}`}
                        >
                            重設金額
                        </Link>
                    </div>
                </div>
            </div>

            {/* ErrorMessage */}
            <Dialog open={open} onClose={handleClose}>
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
        </div>
    )
}

export default withRouter(QRCodeSend2)
