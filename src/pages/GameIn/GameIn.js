import React from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'

import UserService from '../../service/UserService'

const useStyles = makeStyles((theme) => ({
    GameIn: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',

        '& .card': {
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '290px',
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
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
        },
    },
}))

const GameIn = (props) => {

    const classes = useStyles()

    const [values, setValues] = React.useState({
        pincode: null,
    })

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    }

    const handleSubmit = (event) => {
        const username = localStorage.getItem('username')

        if (values.pincode == '') {
            alert('請輸入PIN CODE')
        } else {
            props.history.push(`/loading/${values.pincode}`)
        }
        event.preventDefault()
    }

    return (
        <div className={classes.GameIn}>
            <Card className="card">
                <CardContent>
                    <p className="title">房間PIN Code</p>
                    <form onSubmit={handleSubmit} className="input" noValidate autoComplete="off">
                        <TextField
                            id="pincode"
                            value={values.pincode}
                            onChange={handleChange('pincode')}
                            type="search"
                            variant="outlined"
                            size="small"
                        />
                    </form>
                </CardContent>
                <CardActions>
                    <Link component={Button} onClick={handleSubmit} className="next">
                        開始遊戲
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}

export default withRouter(GameIn)
