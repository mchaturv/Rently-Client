import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserProfile from './routes/UserProfile';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/svgs/brands/*.svg';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Homepage from "./Home/home";
import PostAd from "./routes/PostAd";
import FAQ from "./routes/FAQ";
import PropertyCatalogue from "./Property/propertycatalogue";
import favourite from "./Property/favourite"




const theme = createMuiTheme({
  overrides: {
    spacing: 4,
  },
  palette: {
    primary: {
      main: "#995fc5",
    },
    secondary: {
      main: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <main>
        <BrowserRouter>
        <Switch>
                <Route path="/userprofile" component={UserProfile} exact />
                <Route path="/" component={Homepage} exact/>
                <Route path="/properties" component={PropertyCatalogue} exact/>
                <Route path="/postad" component={PostAd} exact/>
                <Route path="/faq" component={FAQ} exact/>
                <Route path="/favourite" component={favourite} exact/>
        </Switch>
        </BrowserRouter>
      </main>
    </ThemeProvider>
  );
}

export default App;
