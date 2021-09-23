import React, { useState, useEffect, useLayoutEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link, withRouter } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import { useTheme } from '@material-ui/styles'
import LOGO from '../../assets/LOGO.png'
import Menu from './Menu'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        '& .bar': {
            backgroundColor: theme.palette.ultimate.main,
            boxShadow: '0 5px 6px rgba(0,0,0,0.2)',
        },
        '& .tool': {
            display: 'flex',
            justifyContent: 'center',
        },
        '& .PersonalMenuToggler': {
            color: theme.palette.background.paper,
        },
        '& .isLogin': {
            border: `1px ${theme.palette.background.paper} solid`,
            color: theme.palette.background.paper,
            borderRadius: '20px',
            maxWidth: '320px',
            fullWidth: true,
        },
        '& .login': {
            border: `1px ${theme.palette.background.paper} solid`,
            color: theme.palette.background.paper,
            borderRadius: '20px',
            width: '80px',
        },
        '& .logo': {
            flexGrow: 1,
            textAlign: 'center',
            color: theme.palette.background.paper,
        },
        '@media (max-width: 768px)': {
            '& .title': { display: 'none' },
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {},
}))

const ButtonAppBar = (props) => {
    const classes = useStyles()
    const theme = useTheme()
    const [name, setName] = React.useState(false)

    useLayoutEffect(() => {
        setName(localStorage.getItem('name'))
    }, [localStorage.getItem('name')])

    return (
        <div className={classes.root}>
            <AppBar className="bar">
                <Toolbar className="tool">
                    <Menu className="menu" />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={LOGO} alt="logo" style={{ height: '3rem', width: 'auto', margin: '1rem 0' }} />
                        <h1
                            className="title"
                            style={{
                                marginLeft: '1rem',
                                color: '#FFF',
                                margin: '1rem 1rem',
                            }}
                        >
                            玩遊戲學經濟
                        </h1>
                    </div>

                    {name ? (
                        <Button className="isLogin" color="inherit" component={Link} to="/login">
                            <PersonIcon />
                            登入
                        </Button>
                    ) : (
                        <Button className="login" color="inherit" component={Link} to="/login">
                            <PersonIcon />
                            Hi, {name}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default withRouter(ButtonAppBar)
