import React from 'react';
import {Route, Switch, Router} from 'react-router-dom';
import App from './App';
import DetailWeather from './components/DetailWeather/DetailWeather';
import createHistory from "history/createBrowserHistory";

const MainRouter = () => (
    <Router history={createHistory()}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/detailweather" component={DetailWeather} />
      </Switch>
    </Router>
    )

export default MainRouter;