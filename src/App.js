import '../node_modules/noty/lib/noty.css'
import '../node_modules/noty/lib/themes/mint.css'
import React, { useEffect, useState, useMemo } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
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
import NotFound from './pages/NotFound/NotFound'
import { AuthContext } from './components/context/context'
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
    const history = useHistory()
    const initialLoginState = {
        isLogin: false,
        token: null,
        isAdmin: false,
    }
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_LOGINSTATE':
                return {
                    ...prevState,
                    isLogin: action.isLogin,
                    isAdmin: action.isAdmin,
                    token: action.token,
                }
            case 'LOGIN':
                return {
                    isLogin: true,
                    isAdmin: action.isAdmin,
                    token: action.token,
                }
            case 'LOGOUT':
                return {
                    isLogin: false,
                    isAdmin: false,
                }
        }
    }
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)
    const authContext = useMemo(
        () => ({
            //登入
            signIn: (isAdmin, token) => {
                dispatch({
                    type: 'LOGIN',
                    isAdmin,
                    token,
                })
            },
            //登出
            signOut: () => {
                dispatch({ type: 'LOGOUT' })
            },
        }),
        [loginState]
    )
    useEffect(() => {
        console.log('reload')
        let isLoggedIn = false
        let isAdminist = false
        let local_token = localStorage.getItem('token')
        if (local_token) {
            isLoggedIn = true
            if (localStorage.getItem('isAdmin') == '1') {
                isAdminist = true
                console.log('isadmin')
            }
        }
        if (local_token) {
            console.log('logined')
            dispatch({ type: 'RETRIEVE_LOGINSTATE', isLogin: isLoggedIn, isAdmin: isAdminist, token: local_token })
        } else {
            console.log('logouted')
            dispatch({ type: 'LOGOUT' })
        }
    }, [])
    useEffect(() => {
        console.log('update')
        let isLoggedIn = false
        let isAdminist = false
        let local_token = localStorage.getItem('token')
        if (local_token) {
            isLoggedIn = true
            if (localStorage.getItem('isAdmin') == '1') {
                isAdminist = true
                console.log('isadmin')
            }
        }
        if (local_token) {
            dispatch({ type: 'RETRIEVE_LOGINSTATE', isLogin: isLoggedIn, isAdmin: isAdminist, token: local_token })
        } else {
            dispatch({ type: 'LOGOUT' })
        }
    }, [dispatch, history])

    const appliedTheme = Theme

    return (
        <AuthContext.Provider value={authContext}>
            <div className={classes.root}>
                <ThemeProvider theme={appliedTheme}>
                    <div className="App">
                        <Navbar />
                        <Switch>
                            {loginState.isAdmin && <Route path="/admin" component={BackStage} />}
                            <Route
                                path="/"
                                render={() => (
                                    <>
                                        <main>
                                            <AnimatePresence exitBeforeEnter>
                                                <Switch>
                                                    <Route path="/" exact component={LogIn} />

                                                    <Route path="/login" exact component={LogIn} />
                                                    <Route path="/register" exact component={Register} />
                                                    <Route path="/register2" exact component={Register2} />
                                                    <Route path="/forgetpassword" exact component={ForgetPassword} />
                                                    <Route path="/forgetpassword2" exact component={ForgetPassword2} />
                                                    {loginState.token && (
                                                        <>
                                                            <Switch>
                                                                <Route path="/user/lobby" exact component={UserLobby} />
                                                                <Route path="/loading/:id" exact component={Loading} />
                                                                <Route
                                                                    path="/gamelobby/:id"
                                                                    exact
                                                                    component={GameLobby}
                                                                />
                                                                <Route path="/gamein" exact component={GameIn} />
                                                                <Route path="/qrcode" exact component={QRCodeSend2} />
                                                                <Route
                                                                    path="/user/edit/password"
                                                                    exact
                                                                    component={ForgetPassword}
                                                                />
                                                                <Route path="/" component={NotFound} />
                                                            </Switch>
                                                        </>
                                                    )}
                                                    {loginState.isAdmin && (
                                                        <>
                                                            <Switch>
                                                                <Route
                                                                    path="/teacherqrcode"
                                                                    exact
                                                                    component={QRCodeSend}
                                                                />
                                                                <Route path="/" component={NotFound} />
                                                            </Switch>
                                                        </>
                                                    )}

                                                    <Route path="/" component={NotFound} />
                                                </Switch>
                                            </AnimatePresence>
                                        </main>
                                    </>
                                )}
                            />
                            <Route path="/" component={NotFound} />
                        </Switch>
                    </div>
                </ThemeProvider>
            </div>
        </AuthContext.Provider>
    )
}

export default App
