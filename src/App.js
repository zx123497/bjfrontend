
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
import QRCodeSend from './pages/QRCode/QRCodeSend'
import QRCodeSend2 from './pages/QRCode/QRCodeSend2'

const useStyles = makeStyles((theme) => ({
    

  }));
function App() {
    const classes=useStyles();
  const appliedTheme = Theme;
    return (
        <div className={classes.root}>
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
            
                <div className="App" >
                <Navbar/>
                    <Switch>
                        <Route path='/admin' component={BackStage}/>
                        <Route path='/' render={() => (
                            <>
                            
                                <main>
                                    <Switch>
                                    <Route path='/' exact component={Home} />
                                    <Route path='/LogIn' exact component={LogIn} />
                                    <Route path='/register' exact component={Register} />
                                    <Route path='/register2' exact component={Register2} />
                                    <Route path='/admin' exact component={BackStage} />
                                    <Route path='/ForgetPassword' exact component={ForgetPassword} />
                                    <Route path='/ForgetPassword2' exact component={ForgetPassword2} />
                                    <Route path='/ResetPassword' exact component={ResetPassword} />
                                    <Route path='/Loading' exact component={Loading} />
                                    <Route path='/QRCodeSend' exact component={QRCodeSend} />
                                    <Route path='/QRCodeSend2' exact component={QRCodeSend2} />
                                    </Switch>
                                </main>
                            </>
                        )}/>
                    </Switch>
                </div>
            </ThemeProvider>
        </BrowserRouter>
        </div>
    );
}

export default App;
