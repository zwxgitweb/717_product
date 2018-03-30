import React, { Component } from 'react';
import { T } from 'react-toast-mobile';

import $http from '../../utils/http';
import './login.scss';

class Login extends Component {
    // 用户登录
    loginInfo () {
        let { username, password } = this.refs;
        $http.post('/user/login', {'username': username.value, 'password': password.value})
        .then(res => {
            if (res.code == 1) {
                let state = this.props.location.state;
                let url =  state ? state.url : '/';
                document.cookie = 'token=' + res.token;
                this.props.history.replace(url);
            } else {
                username.value = '';
                password.value = '';
                T.notify('Please enter the correct personal information.');
            }
        })
    }
    // 用户注册
    register () {
        this.props.history.replace('/register');
    }
    render () {
        return (
            <div id='userInfo'>
                <p>username: <input type="text" name="" id="username" ref='username'/></p>
                <p>password: <input type="password" name="" id="password" ref='password'/></p>
                <div className="btn">
                    <button id='loginBtn' onClick={this.loginInfo.bind(this)}>login user</button>
                    <button id='registerBtn' onClick={this.register.bind(this)}>register user</button>
                </div>
            </div>
        )
    }
}

export default Login;