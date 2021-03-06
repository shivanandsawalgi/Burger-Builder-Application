import * as actionTypes from './actionTypes';
import axios from './../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData

    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    };
};

export const purchaseBurgerStarts = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_STARTS
    }

}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStarts())

        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))

            })

    }

}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFails = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())

        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';


        axios.get('/orders.json'+ queryParams)
            .then(res => {
                let fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({ ...res.data[key], id: key })
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrderFails(err))
            })
    }
}