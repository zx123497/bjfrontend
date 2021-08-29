import React, { useState, useEffect } from 'react'
import { makeStyles, Card, CardActions, CardContent, Button, TextField } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import BackPage from '../../../components/BackPage/BackPage'
import RoomService from '../../../service/RoomService'
const useStyles = makeStyles((theme) => ({
    Register: {
        display: 'flex',
        color: theme.palette.ultimate.main,
        backgroundColor: theme.palette.ultimate.dark,
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',

        '& .card': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.ultimate.dark,
            width: '85%',
            height: '470px',
            margin: 'auto',

            borderRadius: 12,
            boxShadow: '0 3px 6px 0 rgba(0,0,0,0.3)',
        },
        '& .title': {
            color: theme.palette.primary.main,
            fontSize: 30,
            fontWeight: 900,
        },
        '& .input': {
            display: 'flex',
            flexDirection: 'column',

            alignItems: 'center',
            color: theme.palette.ultimate.main,
            fontSize: 20,
            height: '15px',
            '& .MuiTextField-root': {
                margin: theme.spacing(1.8),
                width: '20ch',
                color: theme.palette.ultimate.main,
            },
        },
        '& .next': {
            marginTop: '20px',
            borderRadius: '20px',
            boxShadow: 'none',
            width: '50%',
            backgroundColor: theme.palette.ultimate.main,
            color: theme.palette.background.paper,
        },
        '& .next:hover': {
            backgroundColor: theme.palette.ultimate.dark,
        },
        '& .in': {
            marginTop: '25px',
            color: '#FFF',
            background: theme.palette.secondary.main,
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '20px',
            boxShadow: '0 3px 6px 0 rgba(0,0,0,0.3)',
            width: '10rem',
            height: '3rem',
        },
        [theme.breakpoints.up('md')]: {
            '& .card': {
                width: '400px',
            },
        },
    },
}))

const NewRoom = (props) => {
    const classes = useStyles()
    const [name, setName] = useState('')
    const id = props.match.params.id
    useEffect(() => {
        RoomService.showRoom(id).then((res) => {
            console.log(res.data)
            setName(res.data.roomName)
        })
    }, [])

    return (
        <div className={classes.Register}>
            <Card className="card">
                <p className="title">{name}</p>
                <Link style={{ textDecoration: 'none' }} to={`/admin/waitingroom/${id}`}>
                    <Button className="in">進入房間</Button>
                </Link>
            </Card>
        </div>
    )
}

export default NewRoom
