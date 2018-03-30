import React, { Component } from 'react';

class SearchIpt extends Component {
    // 跳转search页面事件
    searchPage () {
        this.props.history.push('/index/search');
    }
    render () {
        return (
            <div className='searchDom'>
                <span className='iconfont icon-search'></span>
                <input type="search" placeholder='请输入您要购买的商品' onClick={this.searchPage.bind(this)} id="searchIpt"/>
            </div>
        )
    }
}

export default SearchIpt;