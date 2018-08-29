import * as types from '../constants/ActionTypes';

const initialState = {
    items: [],
    fetching: false
}

export default function page(state = initialState, action) {
    switch (action.type) {
        case types.GET_PURCHASE_LIST_REQUEST:
            return { ...state, fetching: true,  error: '' }

        case types.GET_PURCHASE_LIST_SUCCESS:
            return { ...state, items: action.payload, fetching: false, error: '' }

        case types.GET_PURCHASE_LIST_FAILURE:
            return { ...state, error: action.payload.message, fetching: false }

        default:
            return state;
    }
}