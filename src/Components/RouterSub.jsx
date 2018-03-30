import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import getCookie from '../utils/utils';

function isToken () {
    return getCookie('token');
}

class Router extends Component {
    render () {
        let { routes } = this.props;
        return (
            routes.map((item, index) => {
                return <Route exact={item.exact} path={item.path} key={index} render={location => {
                    return item.authorization && !isToken() ? <Redirect to={{pathname: '/login', state: {url: item.path}}}></Redirect> :  <item.component routes={item.children} {...location}></item.component>
                }}></Route>
            })
        )
    }
}

export default Router;