import * as types from '../constants/ActionTypes';
import config from "../config/config";

export function purchase_show_list() {
    return {
        type: types.PURCHASE_SHOW_LIST
    };
}

export function getList(obj) {
    return (dispatch) => {
        dispatch({
            type: types.GET_PURCHASE_LIST_REQUEST
        })

        fetch(`${config.apiUrl.base}/api/Purchase/getPurchases`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.GET_PURCHASE_LIST_SUCCESS,
                        payload: result.purchases
                    })
                },
                (error) => {
                    dispatch({
                        type: types.GET_PURCHASE_LIST_FAILURE,
                        payload: error
                    })
                }
            )
    }
}


export function getPurchaseNitifications(obj) {
    return (dispatch) => {
        dispatch({
            type: types.GET_PURCHASE_LIST_REQUEST
        })

        fetch(`${config.apiUrl.base}/api/Purchase/purchaseNotifications`)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.GET_PURCHASE_LIST_SUCCESS,
                        payload: result.purchaseNotifications
                    })
                },
                (error) => {
                    dispatch({
                        type: types.GET_PURCHASE_LIST_FAILURE,
                        payload: error
                    })
                }
            )
    }
}
