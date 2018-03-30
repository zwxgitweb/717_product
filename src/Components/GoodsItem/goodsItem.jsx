import React, { Component } from 'react';
import { connect } from 'react-redux';
import { T } from 'react-toast-mobile';

import $http from '../../utils/http';
import getCookie from '../../utils/utils';
import { addCart } from '../../Redux/state';

class GoodsItem extends Component {
    // 添加商品至购物车
    addShop (goods) {
        let { history, location } = this.props;
        if (!getCookie('token')) {
            history.push('/login', {
                url: location.pathname
            })
        } else {
            $http.post('/cart/getCookie', {
                token: getCookie('token'),
                shopInfo: goods
            })
            .then(res => {
                this.props.addCartDishpatch(goods);
                T.notify('add cart');
            })
        }
    }
    render () {
        let { list } = this.props;
        return (
            <div className="shopInfo">
                <h2>{list.title.slice(0, -1)}</h2>
                {
                    list.list.map((goods, index) => {
                        return <dl key={index}>
                        <dt>
                            <img src="" alt=""/>
                            <span style={{background: goods.src}}>{goods.info.slice(1, 5)}</span>
                        </dt>
                        <dd>
                            <p className="info">{goods.info}</p>
                            <p className="price">
                                <b>￥{goods.price}</b>
                                <i className='iconfont icon-cart' onClick={() => this.addShop(goods)}></i>
                            </p>
                        </dd>
                    </dl>
                    })
                }
            </div>
        )
    }
}

function mapDispatch (dispatch) {
    return {
        addCartDishpatch(goods) {
            dispatch(addCart(goods))
        }
    }
}

export default connect(null, mapDispatch)(GoodsItem);