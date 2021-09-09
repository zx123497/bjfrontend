import React, { useState, useEffect } from 'react'
import { Box, makeStyles, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import SVG from './wait.svg'
import PersonIcon from '@material-ui/icons/Person'
import { Link, withRouter } from 'react-router-dom'
import RoomService from '../../../service/RoomService'
import AdminService from '../../../service/AdminService'
const useStyles = makeStyles((theme) => ({
    waiting: {
        height: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.ultimate.dark,
        alignItems: 'center',
        justifyContent: 'center',
        '& .card': {
            backgroundColor: theme.palette.ultimate.main,
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
            color: '#FFF',
            boxShadow: '0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
        },
        '& .title': {
            flexGrow: 1,
            color: '#FFF',
        },
        '& .code': {
            flexGrow: 2,
            display: 'flex',
            // backgroundColor: theme.palette.primary.main,
            width: '70%',
            height: '1rem',
            color: theme.palette.primary.main,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            fontSize: '50px',
        },
        '& .status': {
            flexGrow: 3,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.secondary.main,
        },
        '& .img': {
            width: '100%',
            height: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3rem',
            '& .img': {
                width: '40%',
                height: 'auto',
            },
            '& .start': {
                marginBottom: '2rem',
                border: `2px ${theme.palette.ultimate.main} solid`,
                color: '#FFF',
                boxShadow: '0 3px 6px rgba(0,0,0,0.3)',
                borderRadius: '10px',
                width: '50%',
                backgroundColor: theme.palette.secondary.main,
                fontSize: '25px',
            },
            '& .code': {
                flexGrow: 2,
                display: 'flex',
                // backgroundColor: theme.palette.primary.main,
                width: '70%',
                color: theme.palette.primary.main,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                fontSize: '50px',
            },
        },
        // "& .userlist": {
        //     width: "80%",
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "center",
        //     margin: "1% 10%",
        //     height: "25vh",
        //     padding: "3% 0",
        //     overflowY: "scroll",
        //     backgroundColor: theme.palette.ultimate.dark,
        //     color: theme.palette.ultimate.light
        // }
    },
}))

const Waitingroom = (props) => {
    const classes = useStyles()
    const id = props.match.params.id
    const [pin, setPin] = useState()

    // const [userlist, setUserList] = useState('Loading members...')

    useEffect(() => {
        let param = new URLSearchParams()
        param.append('ID', localStorage.id)
        param.append('name', localStorage.name)
        param.append('roomID', id)
        RoomService.openRoom(param).then((res) => {
            console.log(res)
            setPin(res.data.pinCode)

            // const intervalID = setInterval(() => {
            //     const getRoomParam = new URLSearchParams();
            //     getRoomParam.append("roomNum", res.data.pinCode)
    
            //     AdminService.postGetRoom(getRoomParam).then((res) => {
            //         if(res.status == 200) {
            //             console.log(res)
            //             if(res.data.allUsers) {
            //                 var temp = []
            //                 res.data.allUsers.forEach(element => {
            //                     temp.push(<Typography>{element[0]}</Typography>)
            //                 });
            //                 setUserList(temp)
            //             }
            //         }
            //     })
            // }, 5000)
    
            // return () => clearInterval(intervalID) 
        })

    }, [])
    return (
        <div className={classes.waiting}>
            <div className="card">
                <h2 className="title">等待入場...</h2>
                <img src={SVG} className="App-logo img" />
                {/* <Box className="userlist" boxShadow={3}>
                    {userlist}
                </Box> */}
                <h4 className="code">{pin}</h4>
                {/* <div className="status">
                    <PersonIcon />
                    等待人數：1000 人
                </div> */}

                <Button className="start" component={Link} to={`/admin/gamelobby/${pin}`}>
                    開始遊戲 !
                </Button>
            </div>
        </div>
    )
}

export default Waitingroom
