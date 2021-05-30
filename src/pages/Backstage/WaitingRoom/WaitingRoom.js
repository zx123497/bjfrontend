import React from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SVG from './wait.svg'
import PersonIcon from '@material-ui/icons/Person'
import { Link, withRouter } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    waiting: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .card': {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '70%',
            height: 'max-content',
            padding: '1rem',
            borderRadius: '20px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        },
        '& .start': {
            marginTop: '1rem',
            border: `2px ${theme.palette.ultimate.main} solid`,
            color: theme.palette.ultimate.main,
            boxShadow: '0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            width: '100%',
        },
        '& .title': {
            flexGrow: 1,
            color: theme.palette.primary.dark,
            marginBottom: '0px',
        },
        '& .code': {
            flexGrow: 2,
            display: 'flex',
            // backgroundColor: theme.palette.primary.main,
            width: '70%',
            height: '1rem',
            color: theme.palette.ultimate.main,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
        },
        '& .status': {
            flexGrow: 3,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary.main,
        },
    },
}))

const Waitingroom = (props) => {
    const classes = useStyles()
    const id = props.match.params.id
    return (
        <div className={classes.waiting}>
            <div className="card">
                <h2 className="title">等待入場...</h2>
                <img src={SVG} style={{ width: '100%', height: 'auto' }} />
                <h3 className="title">房間PIN Code</h3>
                <h4 className="code">9487</h4>
                <div className="status">
                    <PersonIcon />
                    等待人數：1000 人
                </div>
                <Link to={`/admin/gamelobby/${id}`}>
                    <Button className="start">開始遊戲</Button>
                </Link>
            </div>
        </div>
    )
}

export default Waitingroom
