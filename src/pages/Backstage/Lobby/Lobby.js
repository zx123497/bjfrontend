import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardContent, Grid, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Roomcard from './Roomcard'
import cat from '../../../pic/cat.jpg'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import Admin_lobby from './admin_lobby.svg'
import RoomService from '../../../service/RoomService'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import { useTheme } from '@material-ui/styles'
import Container from '../../../components/Container/Container'
import { motion } from 'framer-motion'
import Modal from '../../../components/Modal/Modal'
import Input from '../../../components/Input/Input'
import Noty from 'noty'

const useStyles = makeStyles((theme) => ({
    Lobby: {
        padding: '43px 1rem 1rem 1rem',
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        marginTop: '2rem',
        overflow: 'scroll',
        '& .image_lobby': {
            display: 'none',
        },
        '& .pwEdit': {
            width: '100%',
            minWidth: 'max-content',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            margin: '1rem 0',
            display: 'flex',
            alignItems: 'center',
        },
        '& .card': {
            width: '100%',
        },
        '& .rooms': {
            width: '100%',
        },
        '& .roomTitle': {
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            margin: 'auto',
            width: '100%',
        },
        '& .roomArea': {
            margin: 'auto',
            height: '25rem',
            overflow: 'scroll',
            marginTop: '-8px',
            width: '100%',
        },
        '& .roomtext': {
            fontWeight: 550,
            fontSize: '130%',
            marginRight: '1rem',
            color: '#FFF',
        },
        '& .roombtn': {
            height: '2.3rem',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            borderRadius: '10px',
        },
        [theme.breakpoints.up('md')]: {
            padding: '5rem 1rem 1rem 1rem',
            backgroundColor: '#555',
            height: '100vh',
            overflow: 'hidden', //解決margin-top塌陷
            alignItems: 'flex-start',
            display: 'flex',
            '& .image_lobby': {
                display: 'block',
                marginTop: '2rem',
            },
            '& .card': {
                width: 'auto',
            },
            '& .pwEdit': {
                width: '50%',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.background.paper,

                display: 'flex',
                alignItems: 'center',
            },
            '& .profileArea': {
                width: '50%',
            },
            '& .rooms': {
                width: '50%',
            },
            '& .roomTitle': {
                display: 'flex',
                alignItems: 'center',
                marginTop: '8px',
                margin: 'auto',
                width: '95%',
            },
            '& .roomArea': {
                margin: '0 0 0 0',
                height: '50vh',
                overflow: 'auto',
                width: '90%',
                backgroundColor: theme.palette.ultimate.dark,
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 3px 6px 0 rgba(0,0,0,.3)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'start',
            },
            '& .roomtext': {
                fontWeight: 550,
                fontSize: '130%',
                color: '#FFF',
            },
            '& .roombtn': {
                height: '2.3rem',
                backgroundColor: theme.palette.secondary.main,
                color: '#FFF',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                borderRadius: '10px',
                padding: '1rem',
                fontWeight: 'bold',
            },
        },
    },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '30px',

        //overflow: 'hidden',
        '& .card': {
            backgroundColor: theme.palette.ultimate.dark,
            color: theme.palette.ultimate.dark,
            width: '100%',
            height: 'max-content',
            minWidth: 'max-content',
            alienItems: 'center',
            borderRadius: 12,
            boxShadow: '0 3px 6px 0 rgba(0,0,0,.3)',
        },
        '& .container': {
            display: 'grid',
            marginTop: '-12px',
            gridTemplateColumns: '30% 5% 65%',
        },
        '& .leftCard': {
            marginLeft: '5px',
        },
        '& .rightCard': {
            marginLeft: '10px',
        },
        '& .hello': {
            letterSpacing: '2px',
        },
        '& .detailName': {
            color: theme.palette.ultimate.main,
            marginTop: '15px',
        },
        '& .nameArea': {
            marginTop: '7px',
            fontSize: '25px',
            fontWeight: '600',
            color: '#736F72',
            width: '110%',
            display: 'flex',
        },
        '& .photo': {
            marginTop: '-5px',
            position: 'relative',
            width: '6rem',
            height: '6rem',
            borderRadius: '50%',
        },
        '& .image ': {
            display: 'block',
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            backfaceVisibility: 'hidden',
        },
        '& .photo:hover .image': {
            transition: '0.3s ease',
            opacity: '0.5',
        },
        '& .edit': {
            width: '100%',
            transition: ' .5s ease',
            opacity: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%);',
            textAlign: 'center',
        },
        '& .photo:hover .edit': {
            transition: '0.3s ease',
            opacity: '1',
        },
        '& .icon': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.main,
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            height: '70%',
            alignItems: 'center',
            marginBottom: '30px',
            //overflow: 'hidden',
            '& .card': {
                backgroundColor: theme.palette.ultimate.dark,
                color: theme.palette.ultimate.dark,
                width: '70%',
                height: 'max-content',

                alienItems: 'center',
                borderRadius: 12,
                boxShadow: '0 3px 6px 0 rgba(0,0,0,.3)',
            },
            '& .container': {
                display: 'grid',
                marginTop: '-12px',
                gridTemplateColumns: '30% 5% 65%',
            },
            '& .leftCard': {
                marginLeft: '5px',
            },
            '& .rightCard': {
                marginLeft: '10px',
            },
            '& .hello': {
                letterSpacing: '2px',
            },
            '& .detailName': {
                color: theme.palette.ultimate.main,
                marginTop: '15px',
            },
            '& .nameArea': {
                marginTop: '7px',
                fontSize: '25px',
                fontWeight: '600',
                color: '#736F72',
                width: '110%',
                display: 'flex',
            },
            '& .photo': {
                marginTop: '-5px',
                position: 'relative',
                width: '6rem',
                height: '6rem',
                borderRadius: '50%',
            },
            '& .image ': {
                display: 'block',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                backfaceVisibility: 'hidden',
            },
            '& .photo:hover .image': {
                transition: '0.3s ease',
                opacity: '0.5',
            },
            '& .edit': {
                width: '100%',
                transition: ' .5s ease',
                opacity: 0,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                msTransform: 'translate(-50%, -50%);',
                textAlign: 'center',
            },
            '& .photo:hover .edit': {
                transition: '0.3s ease',
                opacity: '1',
            },
            '& .icon': {
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.secondary.main,
            },
        },
    },
}))
const Lobby = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [rooms, setRooms] = useState(null)

    useEffect(() => {
        let params = new URLSearchParams()
        params.append('email', localStorage.email)
        RoomService.getRooms(params).then((res) => {
            console.log(res)
            setRooms(res.data)
        })
    }, [])

    const [modalOpenState, setModalOpenState] = useState({
        email: null,

        open: false,
    })

    const handleModalClose = () => {
        setModalOpenState({
            email: null,

            open: false,
        })
    }

    const handleModalOpen = () => {
        setModalOpenState({
            ...modalOpenState,
            open: true,
        })
    }
    const handleEmailChanged = async (id, value) => {
        setModalOpenState({ ...modalOpenState, email: value })
    }
    const handleEmailSubmit = () => {
        const submit_email = modalOpenState.email
        const qs = require('qs')
        const data = qs.stringify({ email: submit_email })
        RoomService.addAdmin(data).then((res) => {
            console.log(res)
            handleModalClose()
        })
    }

    const handleDelete = (id) => {
        RoomService.deleteRoom(id).then((res) => {
            console.log(res)
            let params = new URLSearchParams()
            params.append('email', localStorage.email)
            RoomService.getRooms(params).then((res2) => {
                console.log(res2)
                setRooms(res2.data)
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'mint',
                    text: '成功刪除房間',
                    timeout: '4000',
                    progressBar: true,
                    closeWith: ['click'],
                }).show()
            })
        })
    }

    return (
        <motion.div
            key="lobby"
            className={classes.Lobby}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            exit={{
                opacity: 0,
                y: -20,
                transition: {
                    ease: 'easeIn',
                },
            }}
        >
            <div className="profileArea">
                <div className={classes.profile}>
                    <div style={{ width: '70%' }}>
                        <h2 className="roomtext">管理者資訊</h2>
                    </div>

                    <Card className="card">
                        <CardContent>
                            <div
                                style={{
                                    margin: '1.5rem',
                                    display: 'flex',
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <AccountCircleIcon
                                    style={{
                                        fontSize: '2.5rem',
                                        color: theme.palette.primary.main,
                                        marginRight: '1rem',
                                    }}
                                />
                                <div style={{ width: '100%' }}>
                                    <div style={{ color: '#ccc' }}>管理者 ID</div>
                                    <div
                                        style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 'bold',
                                            overflow: 'hidden',
                                            color: '#FFF',
                                        }}
                                    >
                                        {localStorage.getItem('name')}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    margin: '1.5rem',
                                    display: 'flex',
                                    // justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <EmailIcon
                                    style={{
                                        fontSize: '2.5rem',
                                        color: theme.palette.primary.main,
                                        marginRight: '1rem',
                                    }}
                                />
                                <div>
                                    <div style={{ color: '#ccc' }}>帳號 E-mail</div>
                                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#FFF' }}>
                                        {localStorage.getItem('email')}
                                    </div>
                                </div>
                            </div>
                            {/* 
                            <div>帳號 E-mail</div>
                            <div>{localStorage.getItem('email')}</div> */}
                            <div style={{ display: 'flex' }}>
                                <Button
                                    style={{
                                        width: '100%',
                                        border: `1px ${theme.palette.primary.main}  solid`,
                                        color: theme.palette.primary.main,
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        marginTop: '1rem',
                                        margin: '1rem 1rem',
                                    }}
                                    component={Link}
                                    to="/ForgetPassword"
                                >
                                    修改密碼
                                </Button>
                                <Button
                                    style={{
                                        width: '100%',
                                        border: `1px ${theme.palette.secondary.light}  solid`,
                                        color: theme.palette.secondary.light,
                                        fontWeight: 'bold',
                                        fontSize: '1rem',
                                        marginTop: '1rem',
                                        margin: '1rem 1rem',
                                    }}
                                    onClick={handleModalOpen}
                                >
                                    新增管理員
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <img
                        src={Admin_lobby}
                        className="image_lobby"
                        alt="logo"
                        style={{ width: '70%', marginTop: '2rem' }}
                    />
                </div>
            </div>

            <div className="rooms">
                <Container>
                    <div className="roomTitle">
                        <h2 className="roomtext">已建立房間</h2>
                        <Button className="roombtn" component={Link} to="/admin/roomsettings">
                            <AddCircleIcon style={{ marginRight: '.5rem' }} />
                            建立房間
                        </Button>
                    </div>
                    <motion.div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            margin: 'auto',
                            justifyContent: 'flex-start',
                        }}
                        initial="hidden"
                        animate="show"
                    >
                        {rooms !== null ? (
                            rooms.map((row, key) => (
                                <motion.div
                                    key={key}
                                    className="card"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0 },
                                        show: {
                                            opacity: 1,
                                            scale: 1,

                                            transition: { duration: 0.5, delay: key * 0.1 },
                                        },
                                    }}
                                >
                                    <Roomcard
                                        title={row[0] ? row[0] : '未命名房間'}
                                        round={row[1]}
                                        id={row[2]}
                                        deleteFunc={() => handleDelete(row[2])}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <></>
                        )}
                    </motion.div>
                </Container>
            </div>
            <Modal opened={modalOpenState.open} handleClose={handleModalClose}>
                <h2 style={{ color: '#FFF' }}>新增管理員</h2>
                <Input
                    className="email"
                    key="email"
                    id="email"
                    elementType="input"
                    elementConfig={{ type: 'text', placeholder: '輸入email' }}
                    value={modalOpenState.email}
                    onChange={handleEmailChanged}
                    label="欲新增管理者email"
                />

                <Button
                    className={classes.button}
                    style={{
                        color: '#FFF',
                        border: '1px #FFF solid',
                        margin: '1rem 0 0 0',
                        width: '100%',
                        // boxShadow: '0px 0px 6px rgba(0,0,0,0.2)',
                    }}
                    onClick={handleEmailSubmit}
                >
                    確認新增
                </Button>
            </Modal>
        </motion.div>
    )
}

export default Lobby
