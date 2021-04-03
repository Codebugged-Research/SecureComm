import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuth } from '../../helpers/auth.helpers';

export function PrivateRoute(props){

    return (
        isAuth(localStorage.getItem("token")) ? 
            <Route path={props.path} exact={props.exact} component={props.component} /> 
        :  
        <Redirect to="/login" />)
}