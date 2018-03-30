import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import SearchIptComp from '../../Components/SearchSelect';
import $http from '../../utils/http';
import './category.scss';

class Category extends Component {
    constructor () {
        super();
        this.state = {
            categoryNav: [],
            categoryList: []
        }
    }
    render () {
        let { categoryNav, categoryList } = this.state;
        let parameter = categoryList[this.props.match.params.parameter];
        return (
            <div className='category'>
                <header className="category_header">
                    <SearchIptComp {...this.props}></SearchIptComp>
                </header>
                <div className="categoryShow">
                    <ul className="categoryNav">
                        {
                            categoryNav.map((item, index) => {
                                return <li key={index}><NavLink to={item.path}>{item.title}</NavLink></li>
                            })
                        }
                    </ul>
                    <div className="categoryList">
                        {
                            parameter && parameter.map((item, index) => {
                                return <dl key={index}>
                                    <dt>
                                        <img src={item.src} />
                                    </dt>
                                    <dd>
                                        {item.title}
                                    </dd>
                                </dl>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount () {
        // categoryNav数据请求
        $http.post('/categoryData', {
            data: 'categoryNav'
        })
        .then(res => {
            if (res.code != 0) {
                this.setState({
                    categoryNav: res.categoryNav
                })
            }
        })
        // categoryList数据请求
        $http.post('/categoryData', {
            data: 'categoryList'
        })
        .then(res => {
            if (res.code != 0) {
                this.setState({
                    categoryList: res.categoryList
                })
            }
        })
    }
}

export default Category;