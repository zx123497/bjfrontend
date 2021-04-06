
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
<<<<<<< HEAD
import QRCodeSend from './pages/QRCode/QRCodeSend'
import QRCodeSend2 from './pages/QRCode/QRCodeSend2'
=======
<<<<<<< HEAD
import GameLobby from './pages/GameLobby/GameLobby'
>>>>>>> 23696d60a033b21c0d45cde12bb95ef8f5418fd1

const useStyles = makeStyles((theme) => ({


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
                                            <Route path='/' exact component={Home} />
                                            <Route path='/login' exact component={LogIn} />
                                            <Route path='/register' exact component={Register} />
                                            <Route path='/register2' exact component={Register2} />
                                            <Route path='/admin' exact component={BackStage} />
                                            <Route path='/forgetpassword' exact component={ForgetPassword} />
                                            <Route path='/forgetpassword2' exact component={ForgetPassword2} />
                                            <Route path='/resetpassword' exact component={ResetPassword} />
                                            <Route path='/loading' exact component={Loading} />
                                            <Route path='/gamelobby' exact component={GameLobby} />
                                        </Switch>
                                    </main>
                                </>
                            )} />
                        </Switch>
                    </div>
                </ThemeProvider>
            </BrowserRouter>
=======
import UserLobby from './pages/UserLobby/UserLobby'
const useStyles = makeStyles((theme) => ({

    root:{
        minHeight:"calc(100vh - 48px)",
        backgroundColor:"#FFF06B",
        "& .App":{

            
        },
        "& .Container":{
            height:"calc(100vh - 48px)",
            margin:"3rem 0 0 0",
            padding:"1rem",
        }
    }

}));
function App() {
    const classes=useStyles();
const appliedTheme = Theme; 
    return (
        <div className={classes.root}>
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
            
                <div className="App" >
                    <div>
                        <Navbar className={classes.nav}/>
                    </div>
                    <div className="Container">
                    <Switch>
                        <Route path='/admin' component={BackStage}/>
                        <Route path='/' render={() => (
                            
                            
                                
                                    
                                    
                                    <Switch>
                                    <Route path='/' exact component={Home} />
                                    <Route path='/LogIn' exact component={LogIn} />
                                    <Route path='/register' exact component={Register} />
                                    <Route path='/register2' exact component={Register2} />
                                   
                                    <Route path='/ForgetPassword' exact component={ForgetPassword} />
                                    <Route path='/ForgetPassword2' exact component={ForgetPassword2} />
                                    <Route path='/ResetPassword' exact component={ResetPassword} />
                                    <Route path='/Loading' exact component={Loading} />
<<<<<<< HEAD
                                    <Route path='/QRCodeSend' exact component={QRCodeSend} />
                                    <Route path='/QRCodeSend2' exact component={QRCodeSend2} />
=======
                                    <Route path='/user/lobby' exact component={UserLobby} />
>>>>>>> 23696d60a033b21c0d45cde12bb95ef8f5418fd1
                                    </Switch>
                                    
                                    
                                
                            
                        )}/>
                    </Switch>
                    </div>
                </div>
            </ThemeProvider>
        </BrowserRouter>
>>>>>>> 9b522550c966b0fb685448bfd964cb7ad113cf39
        </div>
    );
}

export default App;
