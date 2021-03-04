
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './themes/theme';
import './App.css';
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import BackStage from './pages/Backstage/Backstage'
function App() {
  const appliedTheme = Theme;
    return (
        <BrowserRouter>
            <ThemeProvider theme={appliedTheme}>
                <div className="App" >
                    <Switch>
                        <Route path='/admin' component={BackStage}/>
                        <Route path='/' render={() => (
                            <>
                                <main>
                                    <Switch>
                                    <Route path='/' exact component={Home} />
                                     <Route path='/register' exact component={Register} />     
                                    </Switch>
                                </main>
                            </>
                        )}/>
                    </Switch>
                </div>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
