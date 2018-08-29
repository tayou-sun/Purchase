import * as types from '../constants/ActionTypes';

export function getPurchaseDetails(id) {
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_SHOW_CARD_REQUEST,
            payload: id
        })

        var url = new URL("https://localhost:44371/api/Purchase/GetPurchaseDetailed"),
            params = { id: id }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.PURCHASE_SHOW_CARD_SUCCESS,
                        payload: result
                    })
                },
                (error) => {
                    dispatch({
                        type: types.PURCHASE_SHOW_CARD_FAILURE,
                        payload: error
                    })
                }
            )
    }
}

export function getPurchaseNotificationDetails(id){
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_SHOW_CARD_REQUEST,
            payload: id
        })

        var url = new URL("https://localhost:44371/api/Purchase/GetPurchaseDetailed"),
            params = { id: id }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.PURCHASE_SHOW_CARD_SUCCESS,
                        payload: result
                    })
                },
                (error) => {
                    dispatch({
                        type: types.PURCHASE_SHOW_CARD_FAILURE,
                        payload: error
                    })
                }
            )
    }
}
export function getPurchasePositionDetails(id) {
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_POSITION_SHOW_CARD_REQUEST,
            payload: id
        })

        var url = new URL("https://localhost:44371/api/Purchase/GetPurchasePositionDetailed"),
            params = { id: id }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.PURCHASE_POSITION_SHOW_CARD_SUCCESS,
                        payload: result
                    })
                },
                (error) => {
                    dispatch({
                        type: types.PURCHASE_POSITION_SHOW_CARD_FAILURE,
                        payload: error
                    })
                }
            )
    }
}

export function purchaseAdd(planYear) {
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_ADD_SAVE_REQUEST
        })

        fetch("https://localhost:44371/api/Purchase/AddPurchase", {
            method: "POST",
            body: JSON.stringify({ "planYear": planYear }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
            (result) => {
                    /*dispatch({
                        type: types.PURCHASE_ADD_SAVE_SUCCESS,
                        payload: result
                    });*/
                    dispatch(getPurchaseDetails(result));
                    //if (result > 0)

                },
                (error) => {
                    dispatch({
                        type: types.PURCHASE_ADD_SAVE_FAILURE,
                        payload: error
                    })
            }

        )
    }
}

export function closePurchaseDetails() {
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_SHOW_CARD_CLOSE
        })
    }
}

export function addPurchase() {
    return (dispatch) => {
        dispatch({
            type: types.PURCHASE_ADD_SHOW_CARD
        })
    }
}

export function getPurchasePositions(id) {
    return (dispatch) => {
        dispatch({
            type: types.GET_PURCHASE_POSITION_LIST_REQUEST
        })

        var url = new URL("https://localhost:44371/api/Purchase/getPurchasePositions"),
            params = { id: id }

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    dispatch({
                        type: types.GET_PURCHASE_POSITION_LIST_SUCCESS,
                        payload: result
                    })
                },
                (error) => {
                    dispatch({
                        type: types.GET_PURCHASE_POSITION_LIST_FAILURE,
                        payload: error
                    })
                }
            )
    }
}