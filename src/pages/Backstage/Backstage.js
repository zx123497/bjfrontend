import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NewRoom from './NewRoom/NewRoom'
import GameIn from './GameIn/GameIn'
import Lobby from './Lobby/Lobby'
import Roomsettings from './Roomsettings/Roomsettings'
import WaitingRoom from './WaitingRoom/WaitingRoom'
import ValueSetting from './ValueSetting/ValueSetting'
const BackStage = (props) => {
    let {path} = useRouteMatch();
    return (
                <Switch>
                    <Route exact path={path} render={() => <h1>BackStage</h1>} />
                    <Route path={`${path}/newroom`} component={NewRoom} />
                    <Route path={`${path}/gamein`} component={GameIn} />
                    <Route path={`${path}/lobby`} component={Lobby} />
                    <Route path={`${path}/roomsettings`} component={Roomsettings} />
                    <Route path={`${path}/waitingroom`} component={WaitingRoom} />
                    <Route path={`${path}/valuesetting`} component={ValueSetting} />
                </Switch>

    );
};

export default BackStage
