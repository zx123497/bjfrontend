import React from 'react'
import { withStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import AnnouncementLine from '../../../components/ForGameLobby/AnnouncementLine'
import UpperBar from '../../../components/ForGameLobby/UpperBar'
import GameChart from '../../../components/ForGameLobby/GameChart'
import TransRecord from '../../../components/ForGameLobby/TransRecord'

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
            <GameChart />
            <TransRecord />
        </div>
    )
}

export default GameLobby