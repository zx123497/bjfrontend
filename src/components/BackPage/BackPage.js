import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    btn: {
        position: 'fixed',
        top: '88px',
        left: '12px',
        color: 'white',
    },
}))

const BackPage = (props) => {
    const classes = useStyles()

    return (
        <div>
            {(() => {
                if (props.refs == `gamelobby/${localStorage.getItem('roomNum')}`) {
                    return (
                        <Link className={classes.btn} style={{ color: '#555' }} component={Button} to={props.refs}>
                            <ArrowBackIosIcon />
                            上一頁
                        </Link>
                    )
                } else {
                    return (
                        <Link className={classes.btn} component={Button} to={props.refs}>
                            <ArrowBackIosIcon />
                            上一頁
                        </Link>
                    )
                }
            })()}
        </div>
    )
}

export default withRouter(BackPage)
