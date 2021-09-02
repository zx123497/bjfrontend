import React, { useState } from 'react'
import { makeStyles, Typography, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { Link, withRouter, useHistory } from 'react-router-dom'
import BackPage from '../../components/BackPage/BackPage'
import FormControl from '@material-ui/core/FormControl'
import PasswordInput from '../../components/PasswordInput/PasswordInput'
import PasswordInput2 from '../../components/PasswordInput/PasswordInput2'
import UserService from '../../service/UserService'
import Noty from 'noty'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'

const useStyles = makeStyles((theme) => ({
    LogIn: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',

        '& .card': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '410px',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            alienItems: 'center',
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        '& .card2': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: '300px',
            height: '270px',
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            alienItems: 'center',
            borderRadius: 12,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
        },
        '& .title': {
            margin: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        '& .logout': {
            margin: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 28,
            fontWeight: 700,
        },
        '& .detail': {
            marginTop: '-20px',
            margin: '25px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 18,
            fontWeight: 400,
        },
        '& .input': {
            marginTop: '8px',
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            '& .MuiTextField-root': {
                marginTop: '25px',
                width: '80%',
                color: theme.palette.ultimate.main,
            },
        },
        '& .pw': {
            width: '80%',
            marginTop: '25px',
        },
        '& .pwButton': {
            width: 30,
            height: 30,
            marginRight: '0.1%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& .pwIcon': {
            width: 30,
            height: 30,
        },
        '& .next': {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
        '& .next2': {
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '30px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
        },
        '& .btn2': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'fiex-end',
            fontSize: '12px',
            textDecoration: 'underline',
            marginLeft: '160px',
            marginTop: '112px',
            boxShadow: 'none',
            background: 'none',
            color: theme.palette.ultimate.main,
        },
        '& .btn2:hover': {
            color: theme.palette.ultimate.dark,
        },
        '& .btn2:active': {
            background: 'none',
            color: theme.palette.ultimate.dark,
        },
        '& .btn3': {
            marginTop: '-2px',
            fontSize: '12px',
            textDecoration: 'underline',
            boxShadow: 'none',
            background: 'none',
            color: theme.palette.secondary.main,
        },
        '& .btn3:hover': {
            color: theme.palette.secondary.light,
        },
        '& .btn2:active, .btn3:active': {
            background: 'none',
            color: theme.palette.secondary.light,
        },
        '& .bottom': {
            fontSize: '12px',
            margin: 'auto',
            marginTop: '-15px',
        },
    },
}))

const LogIn = (props) => {
    const history = useHistory()
    const classes = useStyles()

    const [errorMessage, setErrorMessage] = useState('')
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const [values, setValues] = React.useState({
        account: '',
        password: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleLogout = (event) => {
        localStorage.clear()
        history.push('login')
    }

    const handleSubmit = (event) => {
        if (values.account == '' && values.password == '') {
            //alert('請輸入帳號和密碼')
            setErrorMessage('請輸入帳號和密碼')
            setOpen(true)
        } else if (values.account == '') {
            //alert('請輸入帳號')
            setErrorMessage('請輸入帳號')
            setOpen(true)
        } else if (values.password == '') {
            //alert('請輸入密碼')
            setErrorMessage('請輸入密碼')
            setOpen(true)
        } else {
            const params = new URLSearchParams()
            params.append('username', values.account)
            params.append('password', values.password)

            UserService.postLogin(params)
                .then((res) => {
                    new Noty({
                        type: 'success',
                        layout: 'topRight',
                        theme: 'nest',
                        text: `成功: ${res}`,
                        timeout: '4000',
                        progressBar: true,
                        closeWith: ['click'],
                    }).show()
                    if (res.status == '200') {
                        if (!res.data.user.isManager) {
                            localStorage.setItem('stu', '1')
                            history.push('/user/lobby')
                        } else history.push('/admin/lobby')
                        localStorage.setItem('username', values.account)
                        localStorage.setItem('name', res.data.user.username)
                        localStorage.setItem('id', res.data.user.ID)
                        localStorage.setItem('email', values.account)
                        localStorage.setItem('token', res.data.jwt)
                    }
                })
                .catch((e) => {
                    setErrorMessage('登入失敗\n 請重新輸入帳號密碼')
                    setOpen(true)
                })
        }
        event.preventDefault()
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    return (
        <div className={classes.LogIn}>
            {localStorage.getItem('name') ? (
                <Card className="card2">
                    <CardContent>
                        <div className="logout">Hi, {localStorage.getItem('name')}！</div>
                        <br></br>
                        <div className="detail">
                            目前登入帳號:<br></br> {localStorage.getItem('email')}
                        </div>
                        <Link onClick={handleLogout} component={Button} className="next2">
                            登出
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <Card className="card">
                    <CardContent>
                        <div className="title">會員登入</div>
                        <form onSubmit={handleSubmit} className="input" autoComplete="off">
                            <TextField
                                id="account"
                                value={values.account}
                                onChange={handleChange('account')}
                                label="帳號 (e-mail)"
                                type="search"
                                variant="outlined"
                                size="small"
                            />
                            <FormControl className="pw" variant="outlined" size="small">
                                <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                style={classes.pwButton}
                                                iconstyle={classes.pwIcon}
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={35}
                                />
                            </FormControl>
                        </form>
                        <Link component={Button} className="btn2" to={'/ForgetPassword'}>
                            忘記密碼
                        </Link>
                        <Link onClick={handleSubmit} component={Button} className="next">
                            登入
                        </Link>
                    </CardContent>
                    <CardActions>
                        <div className="bottom">
                            還沒有會員嗎?
                            <Link component={Button} className="btn3" to={'/Register'}>
                                立即註冊
                            </Link>
                        </div>
                    </CardActions>
                </Card>
            )}
            {/* ErrorMessage */}
            <Dialog
                PaperProps={{
                    style: {
                        marginTop: '90px',
                        borderRadius: 30,
                        height: '28%',
                        width: '300px',
                        padding: '28px 20px 28px 20px',
                        backgroundColor: '#EAEAEA',
                    },
                }}
                open={open}
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
                    <Typography
                        align="center"
                        justifyContent="center"
                        style={{
                            whiteSpace: 'pre-line',
                            fontSize: '120%',
                            marginTop: '3px',
                        }}
                    >
                        {errorMessage}
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
        </div>
    )
}

export default withRouter(LogIn)
