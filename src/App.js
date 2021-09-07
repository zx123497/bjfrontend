import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/mint.css'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import Theme from './themes/theme'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import Register2 from './pages/Register/Register2'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import UserLobby from './pages/UserLobby/UserLobby'
import ForgetPassword2 from './pages/ForgetPassword/ForgetPassword2'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Loading from './pages/Loading/Loading'
import BackStage from './pages/Backstage/Backstage'
import Navbar from './parts/Navbar/Navbar'
import GameLobby from './pages/GameLobby/GameLobby'
import GameIn from './pages/GameIn/GameIn'
import QRCodeSend from './pages/QRCode/QRCodeSend'
import QRCodeSend2 from './pages/QRCode/QRCodeSend2'
import https from './service/F60DB5A60B3334BAE1AE87D845C2698E.txt'
import { AnimatePresence } from 'framer-motion'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'calc(100vh - 48px)',
        backgroundColor: '#555',
        '& .App': {
            minHeight: 'calc(100vh - 48px)',
        },
        '& .Container': {
            minHeight: 'calc(100vh - 48px)',
            height: 'max-content',
            margin: '3rem 0 0 0',
            padding: '10px',
        },
    },
}))

function App() {
    const classes = useStyles()
    // const history = useHistory();
    // useEffect(() => {
    //     const currentTime = new Date().getTime()
    //     const adjExpTime = new Date().getTime();
    // })

    const appliedTheme = Theme

    return (
        <div className={classes.root}>
            <ThemeProvider theme={appliedTheme}>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route path="/admin" component={BackStage} />
                        <Route
                            path="/"
                            render={() => (
                                <>
                                    <main>
                                        <AnimatePresence exitBeforeEnter>
                                            <Switch>
                                                <Route path="/" exact component={LogIn} />
                                                <Route path="/user/lobby" exact component={UserLobby} />
                                                <Route path="/user/edit/password" exact component={ForgetPassword} />

                                                <Route
                                                    path="/.well-known/pki-validation/F60DB5A60B3334BAE1AE87D845C2698E.txt"
                                                    exact
                                                    component={https}
                                                />
                                                <Route path="/login" exact component={LogIn} />
                                                <Route path="/register" exact component={Register} />
                                                <Route path="/register2" exact component={Register2} />
                                                <Route path="/admin" exact component={BackStage} />
                                                <Route path="/forgetpassword" exact component={ForgetPassword} />
                                                <Route path="/forgetpassword2" exact component={ForgetPassword2} />
                                                <Route path="/resetpassword" exact component={ResetPassword} />
                                                <Route path="/loading/:id" exact component={Loading} />
                                                <Route path="/gamelobby/:id" exact component={GameLobby} />
                                                <Route path="/gamein" exact component={GameIn} />
                                                <Route path="/qrcode" exact component={QRCodeSend2} />
                                                <Route path="/teacherqrcode" exact component={QRCodeSend} />
                                            </Switch>
                                        </AnimatePresence>
                                    </main>
                                </>
                            )}
                        />
                    </Switch>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default App
