import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from './Components/PrivateRoute';
import Login from './Components/Login';
import ChatConsole from './Components/ChatConsole';

function Main(){

    return(
        <Switch>
            <Route path="/login" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/chatConsole" exact component={(props) => <ChatConsole {...props}/>} />
            <Redirect to="/login" />
        </Switch>
    )
}

export default Main;