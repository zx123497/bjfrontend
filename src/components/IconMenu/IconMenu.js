import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
const Roomcard = (props) => {
    const classes = useStyles()
    const [open, setOopen] = useState(false)

    const handleOpen = () => {
        if (open === true) {
            setOopen(false)
        } else {
            setOopen(true)
        }
    }

    return (
        <div className={classes.IconMenu}>
            <IconButton className="btn" onClick={() => handleOpen()}>
                {open ? <CloseIcon style={{ color: 'red' }} /> : <SettingsIcon />}
            </IconButton>
            <div className={open ? 'icons' : 'invisible'}>
                {props.icons.map((row) => (
                    <IconButton className="btn" onClick={() => row.func()}>
                        {row.icon}
                    </IconButton>
                ))}
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    IconMenu: {
        display: 'flex',
        flexDirection: 'column-reverse',
        position: 'fixed',
        bottom: 0,
        right: 0,
        margin: '2rem',
        '& .btn': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            margin: '2rem 0 0 0',
        },
        '& .invisible': {
            display: 'none',
        },
        '& .icons': { display: 'flex', flexDirection: 'column-reverse' },
    },
}))

export default Roomcard
