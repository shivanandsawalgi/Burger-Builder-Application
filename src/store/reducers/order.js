import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../Shared/utilityReducer'


const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseStart = (state, action) => {
    return updateObject(state, { loading: true })

}

const purchaseSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    })
}

const purchaseFailed = (state, action) => {
    return updateObject(state, { loading: false })

}

const purchaseOrderStarts = (state, action) => {
    return updateObject(state, { loading: true })

}

const fetchSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    })
}

const fetchOrderFailed = (state, action) => {
    return updateObject(state, { loading: false })

}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_STARTS: return purchaseStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(state, action)

        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFailed(state, action)

        case actionTypes.FETCH_ORDER_START: return purchaseOrderStarts(state, action)

        case actionTypes.FETCH_ORDER_SUCCESS: return fetchSuccess(state, action)

        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFailed(state, action)

        default: return state;
    }

}

export default reducer;