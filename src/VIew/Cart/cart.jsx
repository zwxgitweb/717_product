import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartItemComp from '../../Components/CartItem';
import CartTotalComp from '../../Components/Cart_Total';
import $http from '../../utils/http';
import getCookie from '../../utils/utils';
import { setCartItem, updatePrice } from '../../Redux/state';
import './cart.scss';

class Cart extends Component {
    render () {
        let { stateList } = this.props;
        return (
            <div id='cart'>
                <header className="cart_header">
                    <span></span>
                    <b>shop cart</b>
                    <span className='iconfont icon-bianji'>编辑</span>
                </header>
                <div className="cart_show">
                    {
                        stateList.length == 0 ? <div>购物车为空,去添加商品</div> : stateList.map((item, index) => {
                            return <CartItemComp key={index} cartItem={item}></CartItemComp>
                        })
                    }
                </div>
                {/* 购物车商品总价组件封装 */}
                <CartTotalComp onChange={(checkAllDom) => {this.checkAll(checkAllDom)}}></CartTotalComp>
            </div>
        )
    }
    // 展示购物车商品数据
    componentDidMount () {
        let { showCartItem, cartTotal, updateSum } = this.props;
        $http.post('/cart/showCartItem', {
            token: getCookie('token')
        })
        .then(res => {
            if (res.code == 1) {
                showCartItem(res.data);
                let sum = 0;
                res.data.map((item, index) => {
                    if (item.select) {
                        sum += item.count * item.price;
                    }
                })
                cartTotal.price = sum;
                updateSum(cartTotal);
            } else {
                console.log(res);
            }
        })
    }
    // 计算购物车商品总价
    componentDidUpdate () {
        let { stateList, cartTotal, updateSum } = this.props;
        let sum = 0;
        stateList.map((item, index) => {
            if (item.select) {
                sum += item.count * item.price;
            }
        })
        cartTotal.price = sum;
        updateSum(this.props.cartTotal);
    }
}

function initState (state) {
    return {
        stateList: state.cart_list,
        cartTotal: state.cart_total
    }
}

function updateCartItem (dispatch) {
    return {
        showCartItem (data) {
            dispatch(setCartItem(data));
        },
        updateSum (total) {
            dispatch(updatePrice(total));
        }
    }
}

export default connect(initState, updateCartItem)(Cart);