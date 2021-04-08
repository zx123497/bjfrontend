import React from 'react'
import { makeStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom';
import UpperBar from '../../components/ForGameLobby/UpperBar'
import AnnouncementLine from '../../components/ForGameLobby/AnnouncementLine'
import UserInfo from '../../components/ForGameLobby/UserInfo'
import PersonalTransaction from '../../components/ForGameLobby/PersonalTransaction'

const useStyles = makeStyles((theme) => ({
    root: {
    }
}));

const GameLobby = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <UpperBar />
            <AnnouncementLine />
            <UserInfo />
            <PersonalTransaction />
        </div>
    )
}

export default withRouter(GameLobby)