import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import decode from 'jwt-decode';


const isloggedin= ()=>{
    const token = localStorage.getItem('tokenbbs');
    let isValid = true;
    try{
        isValid = decode(token);
    }catch(e){
        console.log(e)
        return false;
    }
    return isValid;
}; 

export const PrivateRoute = (props) => (
    isloggedin()
    ?<Route {...props} />
    :<Redirect to="/login"/>
)