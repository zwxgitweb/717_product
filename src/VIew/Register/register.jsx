import React, { Component } from 'react';

import $http from '../../utils/http';
import './register.scss';

class Register extends Component {
    // 提交注册信息，与后台接口进行连接
    registerInfo () {
        let { username, password } = this.refs;
        let userVal = username.value;
        let passVal = password.value;
        if (userVal && passVal) {
            $http.post('/user/register', {username: username.value, password: password.value})
            .then(res => {
                if (res.code == 1) {
                    this.props.history.push('/login');
                } else {
                    console.log(res);
                }
            })
        } else {
            alert('please register your username');
        }
    }
    render () {
        return (
            <div id='userInfo'>
                <p>username: <input type="text" name="" id="username" ref='username'/></p>
                <p>password: <input type="password" name="" id="password" ref='password'/></p>
                <button id='registerBtn' onClick={this.registerInfo.bind(this)}>register user</button>
            </div>
        )
    }
}

export default Register;