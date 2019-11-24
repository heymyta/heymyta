
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';

class LoginPage extends Component{
    render() {
        return (
            <div>
                <Header />
                <Login />
            </div>
        );
    }
}

export default LoginPage;