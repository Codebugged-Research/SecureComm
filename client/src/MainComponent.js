import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Components/Login';

function Main(){

    return(
        <Switch>
            <Route path="/login" exact component={() => <Login />} />
            <Redirect to="/login" />
        </Switch>
    )
}

export default Main;