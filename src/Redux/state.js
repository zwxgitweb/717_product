import { createStore } from 'redux';

// 添加购物车
export const ADD_CART = 'ADD_CART';
export function addCart (data) {
    return {
        type: ADD_CART,
        data
    }
}

// 初始展示购物车商品
export const SET_CART_ITEM = 'SET_CART_ITEM';
export function setCartItem (data) {
    return {
        type: SET_CART_ITEM,
        data
    }
}

// 更新购物车价格
export const UPDATA_PRICE = 'UPDATA_PRICE';
export function updatePrice (total) {
    return {
        type: UPDATA_PRICE,
        total
    }
}

import reducers from './reducers';
export const store = createStore(reducers);