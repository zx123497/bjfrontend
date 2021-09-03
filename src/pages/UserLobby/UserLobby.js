import React, { useEffect, useState } from 'react'
import { makeStyles, Card, CardContent, Grid, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import cat from '../../pic/cat.jpg'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { Link } from 'react-router-dom'
import Admin_lobby from './admin_lobby.svg'
import RoomService from '../../service/RoomService'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import EmailIcon from '@material-ui/icons/Email'
import { useTheme } from '@material-ui/styles'
const useStyles = makeStyles((theme) => ({
    UserLobby: {
        padding: '43px 1rem 1rem 1rem',
        backgroundColor: '#555',
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',
        justifyContent: 'center',
        marginTop: '2rem',
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
        '& .rooms': {
            width: '100%',
            margin: 'auto',
            display: 'flex',
            //alignItems: 'center',
        },
        '& .roomtext': {
            flexGrow: 1,
            fontWeight: 500,
            fontSize: '130%',
            color: '#FFF',
        },
        '& .roombtn': {
            height: '2.3rem',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            borderRadius: '10px',
            alignItems: 'center',
            margin: 'auto',
            width: '100%',
            marginTop: '2rem',
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
                alignItems: 'center',
            },
            '& .roomtext': {
                fontSize: '130%',
                fontWeight: 600,
            },
            '& .roombtn': {
                height: '2.3rem',
                width: '50%',
                backgroundColor: theme.palette.secondary.main,
                color: '#FFF',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                borderRadius: '10px',
                padding: '1rem',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
            },
        },
    },
    profile: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
            boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
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
        '& .btnPW': {
            width: '100%',
            border: `1px ${theme.palette.primary.main}  solid`,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            fontSize: '1rem',
            marginTop: '1rem',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            height: '70%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            //overflow: 'hidden',
            '& .btnPW': {
                width: '15rem',
                alignSelf: 'center',
            },
            '& .card': {
                backgroundColor: theme.palette.ultimate.dark,
                color: theme.palette.ultimate.dark,
                width: '50%',
                height: 'max-content',

                alienItems: 'center',
                borderRadius: 12,
                boxShadow: '0 8px 16px 0 rgba(0,0,0,.3)',
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
const UserLobby = () => {
    const classes = useStyles()
    const theme = useTheme()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        let params = new URLSearchParams()
        params.append('email', 'leo000111444@gmail.com')
        RoomService.getRooms(params).then((res) => {
            console.log(res)
            setRooms(res.data)
        })
    }, [])

    const handleDelete = (id) => {
        RoomService.deleteRoom(id).then((res) => {
            console.log(res)
            let params = new URLSearchParams()
            params.append('email', 'leo000111444@gmail.com')
            RoomService.getRooms(params).then((res2) => {
                console.log(res2)
                setRooms(res2.data)
            })
        })
    }

    return (
        <div className={classes.UserLobby}>
            <div className="profileArea">
                <div className={classes.profile}>
                    <div style={{ width: '50%' }}>
                        <h2 className="roomtext">個人資訊</h2>
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
                                <div>
                                    <div style={{ color: '#ccc' }}>使用者 ID</div>
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
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button className="btnPW" style={{}} component={Link} to="/ForgetPassword">
                                    修改密碼
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
                    <Button className="roombtn" component={Link} to="/gamein">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <AddCircleIcon style={{ marginRight: '.5rem' }} />
                            <p className="roomtext">進入房間</p>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserLobby
