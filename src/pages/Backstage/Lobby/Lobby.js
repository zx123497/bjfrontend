import React from 'react'
import { makeStyles, Card, CardContent, Grid, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Roomcard from './Roomcard'
import cat from '../../../pic/cat.jpg'
const useStyles = makeStyles((theme) => ({
    Lobby: {
        padding: '43px 20px 15px 20px',
        backgroundColor: theme.palette.primary.main,
        height: '100vh',
        overflow: 'hidden', //解決margin-top塌陷
        alienItems: 'center',

        '& .pwEdit': {
            width: '350px',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.paper,
            margin: 'auto',
            display: 'flex',
            alignItems: 'center',
        },
        '& .rooms': {
            width: '370px',
            margin: 'auto',
        },
        '& .roomTitle': {
            display: 'flex',
            alignItems: 'center',
            marginTop: '8px',
            margin: 'auto',
            width: '350px',
        },
        '& .roomArea': {
            margin: 'auto',
            height: '25rem',
            overflow: 'scroll',
            marginTop: '-8px',
            width: '350px',
        },
        '& .roomtext': {
            flexGrow: 1,
            fontWeight: 550,
            fontSize: '130%',
        },
        '& .roombtn': {
            height: '2.3rem',
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            borderRadius: '10px',
        },
        [theme.breakpoints.up('md')]: {},
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        //overflow: 'hidden',
        '& .card': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.ultimate.dark,
            width: '350px',
            height: '200px',
            margin: 'auto',
            marginTop: '40px',
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
}))
const Lobby = () => {
    const classes = useStyles()
    return (
        <div className={classes.Lobby}>
            <Grid className="deskTop">
                <div className={classes.profile}>
                    <Card className="card">
                        <CardContent>
                            <Grid
                                className="container"
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"
                            >
                                <Grid item className="leftCard">
                                    <div className="hello">
                                        <h1>Hello!</h1>
                                    </div>
                                    <div className="photo">
                                        <img className="image" src={cat}></img>
                                        <span className="edit">
                                            <IconButton className="icon" aria-label="add an alarm">
                                                <EditIcon />
                                            </IconButton>
                                        </span>
                                    </div>
                                </Grid>
                                <Grid item></Grid>
                                <Grid item className="rightCard">
                                    <div className="detailName">玩家 ID</div>
                                    <div className="nameArea">巧克力</div>
                                    <div className="detailName">帳號 E-mail</div>
                                    <div className="nameArea">
                                        <Typography>chocolate@g.ncu.edu.tw</Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
                <Button className="pwEdit">修改密碼</Button>
                <div className="rooms">
                    <div className="roomTitle">
                        <h2 className="roomtext">已建立房間</h2>
                        <Button className="roombtn"> + 建立房間</Button>
                    </div>
                    <div className="roomArea">
                        <Roomcard title="週一經濟" player="2" round="2" status="未開始" />
                        <Roomcard title="週二經濟" player="2" round="2" status="未開始" />
                        <Roomcard title="週三經濟" player="2" round="2" status="未開始" />
                        <Roomcard title="週一經濟" player="2" round="2" status="未開始" />
                        <Roomcard title="週二經濟" player="2" round="2" status="未開始" />
                        <Roomcard title="週三經濟" player="2" round="2" status="未開始" />
                    </div>
                </div>
            </Grid>
        </div>
    )
}

export default Lobby
