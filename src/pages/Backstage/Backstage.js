import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NewRoom from './NewRoom/NewRoom'
import GameIn from './GameIn/GameIn'
import Lobby from './Lobby/Lobby'
import GameLobby from './GameLobby/GameLobby'
import GameSum from './GameSum.js/GameSum';

const BackStage = (props) => {
    let { path } = useRouteMatch();
    return (
        <div >

            <div className="content">
                <Switch>
                    <Route exact path={path} render={() => <h1>BackStage</h1>} />
                    <Route path={`${path}/newroom`} component={NewRoom} />
                    <Route path={`${path}/gamein`} component={GameIn} />
                    <Route path={`${path}/lobby`} component={Lobby} />
                    <Route path={`${path}/gamelobby`} component={GameLobby} />
                    <Route path={`${path}/gamesum`} component={GameSum} />
                </Switch>
            </div>
        </div>
    );
};

export default BackStage
