import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import NewRoom from './NewRoom/NewRoom'
import GameIn from './GameIn/GameIn'
import Lobby from './Lobby/Lobby'
import GameLobby from './GameLobby/GameLobby'
import GameSum from './GameSum/GameSum'
import RoomEdit from './Roomsettings/RoomEdit'
import Roomsettings from './Roomsettings/Roomsettings'
import WaitingRoom from './WaitingRoom/WaitingRoom'
import ValueSetting from './ValueSetting/ValueSetting'
import NotFound from '../NotFound/NotFound'
import QRCodeSend from '../QRCode/QRCodeSend'
import ShowUrl from '../ShowUrl/ShowUrl'
// import { io } from 'socket.io-client/dist/socket.io'
import AdminGameCenter from '../GameCenter/AdminGameCenter'

const BackStage = (props) => {
    let { path } = useRouteMatch()

    // const URL = 'https://lbdgame.mgt.ncu.edu.tw:8080'

    // const socket = io.connect(URL, {
    //     extraHeaders: { authorization: `Bearer ${localStorage.getItem('token')}` },
    // })

    return (
        <div>
            <div className="content">
                <Switch>
                    <Route exact path={path} render={() => <h1>BackStage</h1>} />
                    <Route path={`${path}/newroom`} component={NewRoom} />
                    <Route path={`${path}/gamein/:id`} component={GameIn} />
                    <Route path={`${path}/lobby`} component={Lobby} />
                    <Route path={`${path}/gamesum/:id`} component={GameSum} />
                    <Route path={`${path}/roomsettings`} component={Roomsettings} />
                    <Route path={`${path}/waitingroom/:id`} component={WaitingRoom} />
                    <Route path={`${path}/valuesetting/:id`} component={ValueSetting} />
                    <Route path={`${path}/roomedit/:id`} component={RoomEdit} />
                    <Route path={`${path}/teacherqrcode`} exact component={QRCodeSend} />
                    <Route path={`${path}/showurl`} component={ShowUrl} />
                    <Route path={`${path}/`} component={NotFound} />
                </Switch>
            </div>
        </div>
    )
}

export default BackStage
