import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCartItem } from '../../Redux/state';

import $http from '../../utils/http';
import getCookie from '../../utils/utils';

class CartTotal extends Component {
    // 点击全选事件
    checkAll (cartList) {
        cartList.forEach((item, index) => {
            item.select = this.refs.checkAll.checked;
        })
        $http.post('/cart/updateCartItem', {
            token: getCookie('token'),
            cartItem: cartList
        })
        .then(res => {
            res.code == 1 ? this.props.cartItem(res.data) : console.log(res);
        })
    }
    render () {
        let { cartTotal, cartList } = this.props;
        return (
            <div className="cart_totle">
                <div><input type="checkbox" id="checkAll" ref='checkAll' onChange={() => this.checkAll(cartList)}/> 全选</div>
                <div>合计：<span className='price_total'>￥{parseInt(cartTotal.price)}</span><span className='Clearing'>结算</span></div>
            </div>
        )
    }
    componentDidUpdate () {
        let num = 0;
        this.props.cartList.map((item) => {
            if (item.select) {
                ++num;
            }
        })
        if (num == this.props.cartList.length) {
            this.refs.checkAll.checked = true;
        } else {
            this.refs.checkAll.checked = false;
        }
    }
}

function initState (state) {
    return {
        cartList: state.cart_list,
        cartTotal: state.cart_total
    }
}

function updatePrice (dispatch) {
    return {
        cartItem (data) {
            dispatch(setCartItem(data))
        }
    }
}

export default connect(initState, updatePrice, null, {pure: false})(CartTotal);