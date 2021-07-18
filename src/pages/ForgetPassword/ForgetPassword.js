import React from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { Link, withRouter, useHistory } from 'react-router-dom'
import BackPage from '../../components/BackPage/BackPage'
import UserService from '../../service/UserService'
import Noty from 'noty'

const useStyles = makeStyles((theme) => ({
    ForgetPassword: {
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
            color: theme.palette.primary.main,
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
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            marginTop: '15px',
            '& .MuiTextField-root': {
                width: '80%',
                color: theme.palette.ultimate.main,
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

    const handleSubmit = (event) => {
        //已登入
        if (localStorage.getItem('email') && values.email != localStorage.getItem('email')) {
            alert('請輸入跟註冊時相同的電子信箱')
        } else if (values.email == '') {
            //未登入
            alert('請輸入電子信箱')
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
                    alert('修改密碼連結已成功發送至 ' + values.email)
                    if (!localStorage.getItem('email')) {
                        localStorage.clear()
                        history.push('/login')
                    } else {
                        if (localStorage.getItem('stu') == '1') history.push('/user/lobby')
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
            ) : localStorage.getItem('stu') ? (
                <BackPage refs="/user/lobby"></BackPage>
            ) : (
                <BackPage refs="/admin/lobby"></BackPage>
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
        </div>
    )
}

export default withRouter(ForgetPassword)
