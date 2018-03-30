import React, { Component } from 'react';
import { NavLink, Route, Redirect } from 'react-router-dom';

import './root.scss';
import '../../static/font/iconfont.css';
import RouterSub from '../../Components/RouterSub';

class Root extends Component {
    render () {
        let { routes } = this.props;
        return (
            <div id='root'>
                <div id="content">
                    <Route exact path='/index' render={() => <Redirect to='/index/home'></Redirect>}></Route>
                    <Route exact path='/index/category' render={() => <Redirect to='/index/category/SichuanLiterature'></Redirect>}></Route>
                    <RouterSub routes={routes}></RouterSub>
                </div>
                <nav className='foot_nav'>
                    <NavLink to='/index/home'>
                        <i className='iconfont icon-home'></i>
                        <span>首页</span>
                    </NavLink>
                    <NavLink to='/index/category'>
                        <i className='iconfont icon-apps'></i>
                        <span>分类</span>
                    </NavLink>
                    <NavLink to='/index/cart'>
                        <i className='iconfont icon-cart'></i>
                        <span>购物车</span>
                    </NavLink>
                    <NavLink to='/index/mine'>
                        <i className='iconfont icon-mine'></i>
                        <span>我的</span>
                    </NavLink>
                </nav>
            </div>
        )
    }
}

export default Root;