import React, { Component } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import {store} from './Redux/state';
import router from './router/router.config';
import RouterSub from './Components/RouterSub';

class Index extends Component {
    render () {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from='/' to='/index/home'></Redirect>
                        <RouterSub routes={router.routes}></RouterSub>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default Index;