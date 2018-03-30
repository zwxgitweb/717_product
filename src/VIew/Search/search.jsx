import React, { Component }from 'react';

import './search.scss';

class Search extends Component  {
    constructor () {
        super();
        this.state = {
            searchList : []
        }
    }
    // 搜索商品事件
    searchShop() {
        let value = this.refs.searchDom.value;
        if (!value) return;
        let ls = localStorage;
        if(ls.getItem('searchResult')) {
            let arr = JSON.parse(ls.getItem('searchResult'));
            if (arr.indexOf(value) == -1) {
                arr.push(value);
                ls.setItem('searchResult', JSON.stringify(arr));
            }
        } else {
            ls.setItem('searchResult', JSON.stringify([value]));
        }
        this.props.history.push('/index/searchResult', {
            value
        })
    }
    // 清除历史记录事件
    clearHistory () {
        localStorage.setItem('searchResult', JSON.stringify([]));
        this.setState({
            searchList: []
        })
    }
    // 退回上一级
    back () {
        this.props.history.go(-1);
    }
    render () {
        let searchList = JSON.parse(localStorage.getItem('searchResult'));
        return (
            <div id='search'>
                <header className="search_header">
                    <span className='iconfont icon-back' onClick={this.back.bind(this)}></span>
                    <input ref='searchDom' type="search" id='searchIpt' placeholder='请输入您想搜索的商品'/>
                    <span className='iconfont icon-search' onClick={this.searchShop.bind(this)}></span>
                </header>
                <h3><span>搜索历史记录</span><i onClick={this.clearHistory.bind(this)} className='iconfont icon-delete'></i></h3>
                {
                    JSON.stringify(searchList) == '[]' ? <p className='shop_history'>您还没有搜索商品记录哦~~~</p> : <ul>
                        {
                            searchList.map((item, index) => {
                                return <li key={index}>{item}</li>
                            })
                        }
                    </ul>
                }
                <h3>大家都在搜</h3>
                <ul>
                    <li>进口食品</li>
                    <li>油</li>
                    <li>零食</li>
                    <li>美食</li>
                </ul>
            </div>
        )
    }
}

export default Search;