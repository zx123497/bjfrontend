
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './themes/theme';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Register2 from './pages/Register/Register2'
import BackStage from './pages/Backstage/Backstage'
import Navbar from './parts/Navbar/Navbar'

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
                                    <Route path='/register' exact component={Register} />
                                    <Route path='/register2' exact component={Register2} />
                                    <Route path='/admin' exact component={BackStage} />
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
