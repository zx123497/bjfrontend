import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './themes/theme';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/Home/Home'
import LogIn from './pages/LogIn/LogIn'
import Register from './pages/Register/Register'
import Register2 from './pages/Register/Register2'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import ForgetPassword2 from './pages/ForgetPassword/ForgetPassword2'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Loading from './pages/Loading/Loading'
import BackStage from './pages/Backstage/Backstage'
import Navbar from './parts/Navbar/Navbar'
import GameLobby from './pages/GameLobby/GameLobby'
import GameIn from './pages/GameIn/GameIn'
import QRCodeSend from './pages/QRCode/QRCodeSend'
import QRCodeSend2 from './pages/QRCode/QRCodeSend2'
import Modal1 from './pages/Modal/Modal1'
import Modal2 from './pages/Modal/Modal2'
import Modal3 from './pages/Modal/Modal3'
import Modal4 from './pages/Modal/Modal4'
import Modal5 from './pages/Modal/Modal5'
import https from './service/F60DB5A60B3334BAE1AE87D845C2698E.txt'

const useStyles = makeStyles((theme) => ({
    root:{
        minHeight:"calc(100vh - 48px)",
        backgroundColor:"#FFF06B",
        "& .App":{
            height:"calc(100vh - 48px)",
        },
        "& .Container":{
            height:"calc(100vh - 48px)",
            margin:"3rem 0 0 0",
            padding:"1rem",
        }
    }

}));
function App() {
    const classes = useStyles();
    const appliedTheme = Theme;
    return (
        <div className={classes.root}>
            <BrowserRouter>
                <ThemeProvider theme={appliedTheme}>

                    <div className="App" >
                        <Navbar />
                        <Switch>
                            <Route path='/admin' component={BackStage} />
                            <Route path='/' render={() => (
                                <>

                                    <main>
                                        <Switch>
                                            <Route path='/' exact component={LogIn} />
                                            <Route path='/.well-known/pki-validation/F60DB5A60B3334BAE1AE87D845C2698E.txt' exact component={https} />
                                            <Route path='/login' exact component={LogIn} />
                                            <Route path='/register' exact component={Register} />
                                            <Route path='/register2' exact component={Register2} />
                                            <Route path='/admin' exact component={BackStage} />
                                            <Route path='/forgetpassword' exact component={ForgetPassword} />
                                            <Route path='/forgetpassword2' exact component={ForgetPassword2} />
                                            <Route path='/resetpassword' exact component={ResetPassword} />
                                            <Route path='/loading' exact component={Loading} />
                                            <Route path='/gamelobby' exact component={GameLobby} />
                                            <Route path='/gamein' exact component={GameIn} />
                                            <Route path='/qrcode' exact component={QRCodeSend2} />
                                            <Route path='/teacherqrcode' exact component={QRCodeSend} />
                                            <Route path='/modal1' exact component={Modal1} />
                                            <Route path='/modal2' exact component={Modal2} />
                                            <Route path='/modal3' exact component={Modal3} />
                                            <Route path='/modal4' exact component={Modal4} />
                                            <Route path='/modal5' exact component={Modal5} />
                                        </Switch>
                                    </main>
                                </>
                            )} />
                        </Switch>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;