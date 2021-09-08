import React, { useState } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField, Typography } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import BackPage from '../../components/BackPage/BackPage'
import { useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles((theme) => ({
    Register: {
        display: 'flex',
        alienItems: 'center',
        justifyContent: 'center',
        color: theme.palette.ultimate.main,
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden',

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
            color: theme.palette.ultimate.dark,
            fontSize: 20,
            height: '15px',
            marginLeft: '17%',
            '& .MuiTextField-root': {
                marginTop: '25px',
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
            marginTop: '200px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
    },
}))

const Register = (props) => {
    const history = useHistory()
    const classes = useStyles()

    const [values, setValues] = React.useState({
        schoolname: '',
        ID: '',
        username: '',
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
        message['schoolname'] = ''
        message['ID'] = ''
        message['username'] = ''
        if (values.schoolname === '') message['schoolname'] = '學校 '
        if (values.ID === '') message['ID'] = '學號 '
        if (values.username === '') message['username'] = '使用者名稱'
        if (values.schoolname === '' || values.ID === '' || values.username === '') {
            setError('請輸入' + message['schoolname'] + message['ID'] + message['username'])
            setOpen(true)
        } else {
            localStorage.setItem('schoolname', values.schoolname)
            localStorage.setItem('ID', values.ID)
            localStorage.setItem('username', values.username)
            history.push('./register2')
        }
        event.preventDefault()
    }

    return (
        <div className={classes.Register}>
            <BackPage refs="/LogIn"></BackPage>
            <Card className="card">
                <CardContent>
                    <p className="title">會員註冊</p>
                    <form onSubmit={handleSubmit} className="input" autoComplete="off">
                        <TextField
                            id="schoolname"
                            value={values.schoolname}
                            onChange={handleChange('schoolname')}
                            label="學校"
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            id="ID"
                            value={values.ID}
                            onChange={handleChange('ID')}
                            label="玩家ID (學號)"
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                        <TextField
                            id="name"
                            value={values.username}
                            onChange={handleChange('username')}
                            label="姓名"
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Link onClick={handleSubmit} component={Button} className="next">
                        下一步
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

export default withRouter(Register)
