import React from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
    Card: {
        '& .card': {
            display: 'flex',
            height: '6rem',
            margin: '1rem auto',
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
            borderRadius: '10px',
            padding: '5px 15px',
        },

        '& .card:hover': {
            backgroundColor: theme.palette.background.default,
        },
        '& .cardtitle': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .cardcontent': {
            color: theme.palette.text.secondary,
            flexGrow: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& .status': {
            flexGrow: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        [theme.breakpoints.up('md')]: {
            '& .card': {
                display: 'block',
                height: 'max-content',
                margin: theme.spacing(1),
                width: '15rem',
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 0px 6px 0 rgba(0,0,0,0.2)',
                borderRadius: '10px',
                padding: '0',
            },

            '& .card:hover': {
                backgroundColor: theme.palette.background.default,
            },
            '& .cardtitle': {
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            },
            '& .cardcontent': {
                color: theme.palette.text.secondary,
                flexGrow: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 1rem 1rem 1rem',
            },
            '& .status': {
                flexGrow: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#D56C59',
                margin: '0px',
                borderRadius: '0 0px 10px 10px',
                color: '#FFF',
            },
        },
    },
}))

const Roomcard = (props) => {
    const classes = useStyles()
    return (
        <div className={classes.Card}>
            <Button className="card" component={Link} to={`/admin/gamein/${props.id}`}>
                <div className="cardtitle">
                    <h3>{props.title}</h3>
                </div>
                <div className="cardcontent">
                    <div>玩家人數 {props.player}人</div>
                    <div>回合數 {props.round}回合</div>
                </div>
                <div className="status">
                    <div>{props.status}</div>
                </div>
            </Button>
        </div>
    )
}

export default withRouter(Roomcard)
