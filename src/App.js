import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserProfile from './routes/UserProfile';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Homepage from "./routes/Homepage";
import PostAd from "./routes/PostAd";
import FAQ from "./routes/FAQ";

const theme = createMuiTheme({
    overrides:{
        spacing: 4
    },
    palette: {
        primary: {
            main: '#995fc5'
        },
        secondary: {
            main: '#f5f5f5'
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
        <main>
        <BrowserRouter>
        <Switch>
                <Route path="/userprofile" component={UserProfile} exact />
                <Route path="/home" component={Homepage} exact/>
                <Route path="/postad" component={PostAd} exact/>
                <Route path="/faq" component={FAQ} exact/>
        </Switch>
        </BrowserRouter>
        </main>
        </ThemeProvider>
    )
}

export default App;
