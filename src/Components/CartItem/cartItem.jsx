import React, { Component } from 'react';
import { connect } from 'react-redux';

import $http from '../../utils/http';
import getCookie from '../../utils/utils';
import { setCartItem } from '../../Redux/state';

class CartItem extends Component {
    render () {
        let { cartItem } = this.props;
        return <div className="cartItem_show">
            <input type="checkbox" className={'checked' + (cartItem.select ? ' checkActive' : '')} onChange={() => this.updateCartItem(cartItem, cartItem.select = !cartItem.select)} checked={cartItem.select}/>
            <dl>
                <dt>
                    <img src="" alt=""/>
                    <span style={{background: cartItem.src}}>{cartItem.info.slice(1, 5)}</span>
                </dt>
                <dd>
                    <p className="info">{cartItem.info}</p>
                    <div className="total_num">
                        <div className="count_price">
                            <p>X{cartItem.count}</p>
                            <p className="price">￥{cartItem.price}</p>
                        </div>
                        <div className='total_count'><span className='increment' onClick={() => this.updateCartItem(cartItem, cartItem.count>1 ? --cartItem.count : 1)}>-</span><span className="count">{cartItem.count}</span><span className='decrement' onClick={() => this.updateCartItem(cartItem, ++cartItem.count)}>+</span></div>
                    </div>
                </dd>
            </dl>
        </div>
    }
    updateCartItem (cartItem) {
        $http.post('/cart/updateCartItem', {
            token: getCookie('token'),
            cartItem
        })
        .then(res => {
            res.code == 1 ? this.props.updateCart(res.data) : console.log(res);
        })
    }
}

function updateDispatch (dispatch) {
    return {
        updateCart (data) {
            dispatch(setCartItem(data));
        }
    }
}

export default connect(null, updateDispatch, null, {pure: false})(CartItem);