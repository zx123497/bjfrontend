import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles, Typography, useTheme, Icon } from '@material-ui/core'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ErrorIcon from '@material-ui/icons/Error'

const useStyles = makeStyles((theme) => ({
    PersonalMenu: {
        width: '300px',
        height: '100%',
        fontSize: 'inherit',
        maxWidth: '60vw',
        boxSizing: 'border-box',
        overflow: 'hidden',
        backgroundColor: theme.palette.ultimate.dark,
        color: '#FFF',
        '& *': {
            fontSize: 'inherit',
        },
        '& .menuBody': {
            maxHeight: 'calc(100% - 140px)',
            overflow: 'auto',
            padding: '0 10px',
            '& .listTitle': {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.ultimate.dark,
                fontWeight: 'bold',
            },
            '& .MuiListItemText-root': {
                color: '#ccc',
                fontWeight: 'bold',
            },
            '& .nested': {
                paddingLeft: '50px',
                color: '#ccc',
            },
            '& > *:last-child': {
                paddingBottom: '100px',
            },
        },
        '& .menuHeader': {
            height: '100px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            color: '#FFF',
            fontWeight: 'bold',
            justifyContent: 'space-between',

            '& .fas': {
                color: `${theme.palette.type === 'light' ? theme.palette.primary.main : 'white'}`,
                cursor: 'pointer',
            },
            '& .userName': {
                fontSize: '30px',
                color: '#FFF',
            },
        },
        '& .menuFooter': {
            position: 'absolute',
            zIndex: '5',
            bottom: '0',
            width: '100%',
            boxSizing: 'border-box',
            padding: '0 10px',
            height: '130px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: theme.palette.ultimate.dark,
            '& .button': {
                width: '80%',
                margin: '5px',
                marginBottom: 10,
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: 'none',
                '&.logout': {
                    color: '#FFFFFF',
                },
            },
        },
    },
    PersonalMenuToggler: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        marginRight: '1vw',
        '& .userName': {
            color: theme.palette.background.paper,
            marginRight: '5px',
            fontWeight: 'bold',
        },
    },
}))

const Menu = (props) => {
    const theme = useTheme()
    const classes = useStyles(theme)
    const [currentPage, setCurrentPage] = useState(null)
    let admin = false
    const [open, setOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorOpen, setErrorOpen] = useState(false)
    let content = [
        {
            title: '學生',
            id: 'user',
            items: [
                {
                    title: '個人專區',
                    id: 'lobby',
                },
                {
                    title: '帳戶管理',
                    id: 'edit',
                    subList: [{ title: '修改密碼', id: 'password' }],
                },
            ],
        },
    ]
    if (localStorage.getItem('isAdmin') === '1') {
        admin = true
        content = [
            {
                title: '學生',
                id: 'user',
                items: [
                    {
                        title: '個人專區',
                        id: 'lobby',
                    },
                    {
                        title: '帳戶管理',
                        id: 'edit',
                        subList: [{ title: '修改密碼', id: 'password' }],
                    },
                ],
            },
            {
                title: '管理者',
                id: 'admin',
                items: [
                    {
                        title: '管理者專區',
                        id: 'lobby',
                    },
                    {
                        title: '網頁連結',
                        id: 'showurl',
                    },
                ],
            },
        ]
    }

    const [subMenuOpen, setSubMenuOpen] = useState({
        hours: false,
        activities: false,
    })

    const handleDrawerOpen = () => {
        if (!localStorage.getItem('name')) {
            setErrorMessage('請先登入')
            setErrorOpen(true)
        } else setOpen(true)
    }

    const handleClose = () => {
        setErrorOpen(false)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const handleSubMenuExpand = (subMenu) => {
        setSubMenuOpen({
            ...subMenuOpen,
            [subMenu]: !subMenuOpen[subMenu],
        })
    }

    useEffect(() => {
        let newPage = props.location.pathname
        if (currentPage == null || currentPage !== newPage) {
            setCurrentPage(newPage)
            setOpen(false)
        }
    }, [currentPage, props.location.pathname])

    return (
        <>
            <div className={`${classes.PersonalMenuToggler} PersonalMenuToggler`} onClick={handleDrawerOpen}>
                <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
            </div>
            <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
                <div className={classes.PersonalMenu}>
                    <div className="menuHeader">
                        <span className="userName">功能表</span>
                        <Icon onClick={handleDrawerClose} className="fas fa-chevron-right"></Icon>
                    </div>
                    <div className="menuBody">
                        {content.map((list, index) => (
                            <div key={index}>
                                <List>
                                    <ListSubheader className="listTitle">{list.title}</ListSubheader>
                                    {list.items.map((item) => (
                                        <div key={item.id}>
                                            <ListItem
                                                button
                                                onClick={() => handleSubMenuExpand(item.id)}
                                                component={!item.subList ? Link : ''}
                                                to={!item.subList ? `/${list.id}/${item.id}` : ''}
                                            >
                                                <ListItemText primary={item.title} />
                                                {item.subList ? (
                                                    subMenuOpen[item.id] ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </ListItem>
                                            {item.subList ? (
                                                <Collapse in={subMenuOpen[item.id]} timeout="auto" unmountOnExit>
                                                    <List component="div" disablePadding>
                                                        {item.subList.map((subItem) => (
                                                            <ListItem
                                                                button
                                                                key={subItem.id}
                                                                className="nested"
                                                                component={Link}
                                                                to={`/${list.id}/${item.id}/${subItem.id}`}
                                                            >
                                                                <ListItemText primary={subItem.title} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </Collapse>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    ))}
                                </List>
                                {index < content.length - 1 ? <Divider /> : ''}
                            </div>
                        ))}
                    </div>
                    <div className="menuFooter"></div>
                </div>
            </Drawer>
            {/* ErrorMessage */}
            <Dialog
                PaperProps={{
                    style: {
                        padding: '0px 20px 0px 20px',
                    },
                }}
                open={errorOpen}
                onClose={handleClose}
            >
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
        </>
    )
}

export default withRouter(Menu)
