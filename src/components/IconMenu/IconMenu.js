import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import CloseIcon from '@material-ui/icons/Close'
import { motion } from 'framer-motion'
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
            <div
                className="icons"
                // initial={{ opacity: 0 }}
                // animate={{ opacity: open ? 1 : 1, transition: { duration: 0.25 } }}
            >
                {props.icons.map((row, id) => (
                    <motion.div
                        key={id}
                        initial={false}
                        animate={{
                            y: open ? 0 : 0,
                            opacity: open ? 1 : 0,
                            transition: { duration: 0.3, delay: id * 0.05, ease: 'easeOut' },
                        }}
                        style={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            className="btn"
                            onClick={() => {
                                if (open) row.func()
                            }}
                        >
                            {row.icon}
                        </IconButton>
                        <div
                            className="title"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '1rem',
                            }}
                        >
                            <h5>{row.title}</h5>
                        </div>
                    </motion.div>
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
        alignItems: 'flex-end',
        bottom: 0,
        right: 0,
        margin: '2rem',
        '& .btn': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            margin: '1rem 0',
            width: 'max-content',
            height: 'max-content',
            transition: '0.5s',
        },
        '& .btn:hover': {
            backgroundColor: theme.palette.background.default,
            transform: 'scale(1.15)',
        },
        '& .invisible': {
            display: 'none',
        },
        '& .icons': { display: 'flex', flexDirection: 'column-reverse' },
        '& .title': {
            backgroundColor: theme.palette.background.paper,
            padding: '10px',
            borderRadius: '10px',
            height: '1.5rem',
            width: '4rem',
            boxShadow: '0 0 6px rgba(0,0,0,0.2)',
        },
    },
}))

export default Roomcard
