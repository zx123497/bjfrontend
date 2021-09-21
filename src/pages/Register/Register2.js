import React, { useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField, Typography } from '@material-ui/core'
import { Link, withRouter, useHistory } from 'react-router-dom'
import BackPage from '../../components/BackPage/BackPage'
import UserService from '../../service/UserService'
import Noty from 'noty'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import { createMuiTheme } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles((theme) => ({
    Register2: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',

        '& .card': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '430px',
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
            color: theme.palette.ultimate.dark,
            fontSize: 30,
            fontWeight: 900,
        },
        '& .input': {
            marginTop: '-10px',
            color: '#555',
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            '& .MuiTextField-root': {
                marginTop: '25px',
                width: '80%',
                // color: theme.palette.ultimate.main,
                color: theme.palette.ultimate.dark,
            },
            '& label.Mui-focused': {
                color: theme.palette.ultimate.dark,
            },
            '& .input-underline:after': {
                borderBottomColor: theme.palette.ultimate.dark,
            },
            '& .input-underline:before': {
                borderBottomColor: theme.palette.ultimate.dark,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.ultimate.dark,
            },
            '&:after fieldset': {
                borderColor: theme.palette.ultimate.dark,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.ultimate.dark,
            },
        },
        '& .input1': {
            color: 'white !important',
        },
        '& .input2': {
            color: '#555 !important',
            '& .MuiTextField-root': {
                color: '#555 !important',
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
            marginTop: '200px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            variant: 'contained',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
    },
}))

const Register2 = (props) => {
    const history = useHistory()

    const classes = useStyles()
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        check_password: '',
    })

    const [errorMessage, setError] = React.useState('')
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = (event) => {
        var message = []
        message['email'] = ''
        message['password'] = ''
        message['check_password'] = ''
        message['diffPassword'] = ''
        if (values.password !== values.check_password) {
            message['diffPassword'] = '密碼不相同\n'
        }
        if (values.email === '') message['email'] = '帳號 '
        if (values.password === '') message['password'] = '密碼 '
        if (values.check_password == '') message['check_password'] = '確認密碼'

        if (values.email === '' || values.password === '' || values.check_password === '') {
            if (values.password !== '' && values.check_password !== '') setError(message['diffPassword'])
            else
                setError(
                    message['diffPassword'] +
                        '請輸入' +
                        message['email'] +
                        message['password'] +
                        message['check_password']
                )
            setOpen(true)
        } else if (values.password !== values.check_password) {
            setError(message['diffPassword'])
            setOpen(true)
        } else {
            const params = new URLSearchParams()
            params.append('schoolname', localStorage.getItem('schoolname'))
            params.append('ID', localStorage.getItem('ID'))
            params.append('username', localStorage.getItem('username'))
            params.append('email', values.email)
            params.append('password', values.password)

            UserService.postRegister(params).then((res) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'nest',
                    text: `成功: ${res}`,
                    timeout: '4000',
                    progressBar: true,
                    closeWith: ['click'],
                }).show()
                console.log(res.data)

                if (res.status === 200) {
                    // setError("註冊成功!")
                    // setOpen(true)
                    alert('註冊成功!')

                    // 註冊成功直接登入
                    localStorage.removeItem('ID')
                    localStorage.removeItem('schoolname')
                    const params2 = new URLSearchParams()
                    params2.append('username', localStorage.getItem('username'))
                    params2.append('password', values.password)

                    UserService.postLogin(params2)
                        .then((res) => {
                            if (res.status == '200') {
                                if (!res.data.user.isManager) {
                                    localStorage.setItem('isAdmin', '0')
                                    history.push('/user/lobby')
                                } else {
                                    localStorage.setItem('isAdmin', '1')
                                    history.push('/admin/lobby')
                                }
                                localStorage.setItem('username', values.account)
                                localStorage.setItem('name', res.data.user.username)
                                localStorage.setItem('id', res.data.user.ID)
                                localStorage.setItem('email', values.account)
                                localStorage.setItem('token', res.data.jwt)
                                localStorage.setItem('expireTime', res.data.expiresIn)
                            }
                        })
                        .catch((e) => {
                            console.log(e)
                        })
                }
            })
            // localStorage.clear()
            // history.push('./login')
        }
        event.preventDefault()
    }

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 })
    }

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault()
    }

    return (
        <div className={classes.Register2}>
            <BackPage refs="/Register"></BackPage>
            <Card className="card">
                <CardContent>
                    <p className="title">會員註冊</p>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <TextField
                            id="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            InputProps={{
                                className: 'input2',
                            }}
                            className="input1"
                            multiline
                            label="帳號 (E-mail)"
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                        <FormControl className="pw" variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
                            <OutlinedInput
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
                        <FormControl className="pw" variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">密碼確認</InputLabel>
                            <OutlinedInput
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.check_password}
                                onChange={handleChange('check_password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            style={classes.pwButton}
                                            iconstyle={classes.pwIcon}
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword2}
                                            edge="end"
                                        >
                                            {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={68}
                            />
                        </FormControl>
                        {/* <TextField id="password" value={values.password} onChange={handleChange('password')} label="密碼" type="search" variant="outlined"  size="small" />
                    <TextField id="check_password" value={values.check_password} onChange={handleChange('check_password')} label="密碼確認" type="search" variant="outlined"  size="small" /> */}
                    </form>
                </CardContent>
                <CardActions>
                    <Link onClick={handleSubmit} component={Button} className="next">
                        確認註冊
                    </Link>
                </CardActions>
            </Card>

            {/* ErrorMessage */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h6" style={{ fontWeight: '500' }} justifyContent="center" align="center">
                        <ErrorIcon color="#555"></ErrorIcon> &nbsp;{'提醒'}
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

export default withRouter(Register2)
