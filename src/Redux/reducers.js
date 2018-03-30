import { combineReducers } from 'redux';

import { ADD_CART, SET_CART_ITEM, UPDATA_PRICE } from './state';

// 购物车商品列表state
function cart_list (state, action) {
    if (state == undefined) {
        state = [];
    }
    switch (action.type) {
        case ADD_CART:
            let flag = true;
            state.map((item, index) => {
                if (item.info == action.data.info) {
                    ++item.count;
                    flag = false;
                }
            })
            return flag ? [...state, action.data] : [...state];
            break;
        case SET_CART_ITEM:
            return [...action.data];
            break;
        default : 
            return state;
    }
}

// 购物车总价state
function cart_total (state, action) {
    if (state == undefined) {
        state = {price: 0}
    }
    switch (action.type) {
        case UPDATA_PRICE:
            let total = action.total;
            return total;
            break;
        default :
            return state;
    }
}

export default combineReducers({
    cart_list,
    cart_total
})