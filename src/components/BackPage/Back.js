import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    btn: {
        position: 'fixed',
        top: '88px',
        left: '12px',
        color:"white"
    },
}))

const BackPage = () => {
    const classes = useStyles()

    return (
        <div>
            <Link className={classes.btn} component={Button} >
                <ArrowBackIosIcon />
                上一頁
            </Link>
        </div>
    )
}

export default withRouter(BackPage)
