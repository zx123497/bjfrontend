import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button } from '@material-ui/core'
import { Link, withRouter, useLocation, useHistory, useParams } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import BackPage from '../../components/BackPage/BackPage'
import UserService from '../../service/UserService'
import FormControl from '@material-ui/core/FormControl'
import Noty from 'noty'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const useStyles = makeStyles((theme) => ({
    ForgetPassword2: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        overflow: 'hidden',
        alienItems: 'center',
        justifyContent: 'center',

        '& .btn': {
            position: 'fixed',
            top: '75px',
            left: '12px',
        },
        '& .card': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '360px',
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
        '& .input': {
            marginTop: '-10px',
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
            marginTop: '140px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
    },
}))

const ForgetPassword2 = (props) => {
    const classes = useStyles()
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
    }, [location])

    const raw_token = location.search
    const token = raw_token.match(/token=([^&]+)/)[1]
    console.log('token:' + token)

    const [values, setValues] = React.useState({
        password: '',
        check_password: '',
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = (event) => {
        var message = []
        message['password'] = ''
        message['check_password'] = ''
        message['diffPassword'] = ''
        if (values.password !== values.check_password) {
            message['diffPassword'] = '密碼不相同\n'
        }
        if (values.password == '') message['password'] = '新密碼 '
        if (values.check_password == '') message['check_password'] = '確認密碼'
        if (values.password == '' || values.check_password == '')
            alert(message['diffPassword'] + '請輸入' + message['password'] + message['check_password'])
        else {
            const params = new URLSearchParams()
            params.append('password', values.password)

            UserService.postResetPassword(token, params).then((res) => {
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
                if (res.status == 200) {
                    //history.push('./login');
                    alert('成功重設密碼！')
                }
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

    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 })
    }

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault()
    }

    return (
        <div className={classes.ForgetPassword2}>
            <BackPage refs="/"></BackPage>
            <Card className="card">
                <CardContent>
                    <p className="title">更改密碼</p>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <FormControl className="pw" variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">新密碼</InputLabel>
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
                                labelWidth={50}
                            />
                        </FormControl>
                        <FormControl className="pw" variant="outlined" size="small">
                            <InputLabel htmlFor="outlined-adornment-password">再次輸入新密碼</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
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
                                labelWidth={115}
                            />
                        </FormControl>
                    </form>
                </CardContent>
                <CardActions>
                    <Link onClick={handleSubmit} component={Button} className="next" to={'/user/lobby'}>
                        更改
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}

export default withRouter(ForgetPassword2)
