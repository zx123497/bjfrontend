import React, { useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField, Typography } from '@material-ui/core'
import { Link, withRouter, useHistory } from 'react-router-dom'
import BackPage from '../../components/BackPage/BackPage'
import UserService from '../../service/UserService'
import Noty from 'noty'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'

const useStyles = makeStyles((theme) => ({
    ForgetPassword: {
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
            height: '330px',
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
        '& .detail': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '12px',
            marginTop: '40px',
        },
        '& .input': {
            marginTop: '15px',
            color: theme.palette.ultimate.dark,
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            '& .MuiTextField-root': {
                marginTop: '3px',
                width: '80%',
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
        '& .next': {
            margin: 'auto',
            marginTop: '50px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
    },
}))

const ForgetPassword = (props) => {
    const history = useHistory()
    const classes = useStyles()

    const [values, setValues] = React.useState({
        email: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const [errorMessage, setError] = React.useState('')
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = (event) => {
        if (localStorage.getItem('email') && values.email != localStorage.getItem('email')) {
            setError('請輸入該帳號的電子信箱')
            setOpen(true)
        } else if (!values.email) {
            setError('請輸入電子信箱')
            setOpen(true)
        } else {
            const params = new URLSearchParams()
            params.append('email', values.email)

            UserService.postForgetPassword(params).then((res) => {
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
                    setError('修改密碼連結已成功發送至 ' + values.email)
                    setOpen(true)
                    if (!localStorage.getItem('email')) {
                        localStorage.clear()
                        history.push('/login')
                    } else {
                        if (localStorage.getItem('isAdmin') == '0') history.push('/user/lobby')
                        else history.push('/admin/lobby')
                    }
                }
            })
        }
        event.preventDefault()
    }

    return (
        <div className={classes.ForgetPassword}>
            {!localStorage.getItem('email') ? (
                <BackPage refs="/LogIn"></BackPage>
            ) : localStorage.getItem('isAdmin') ? (
                <BackPage refs="/admin/lobby"></BackPage>
            ) : (
                <BackPage refs="/user/lobby"></BackPage>
            )}
            <Card className="card">
                <CardContent>
                    {localStorage.getItem('email') ? (
                        <p className="title">重設密碼</p>
                    ) : (
                        <p className="title">忘記密碼</p>
                    )}

                    <div className="detail">請至電子信箱收取信件以重新設定密碼</div>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <TextField
                            id="email"
                            value={values.email}
                            onChange={handleChange('email')}
                            label="電子信箱"
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Link component={Button} onClick={handleSubmit} className="next">
                        發送
                    </Link>
                </CardActions>
            </Card>

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
                            marginTop: '10px',
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

export default withRouter(ForgetPassword)
