import * as types from '../constants/ActionTypes';

const initialState = {
    currentViewType: types.CURRENT_VIEW_TYPE_LIST
};

export function purchaseReducer(state = initialState, action) {
    switch (action.type) {
        case types.PURCHASE_SHOW_CARD_REQUEST:
            return {
                ...state, purchase_id: action.payload, fetching: true, popupFetching: true, error: '', purchase_data: {}, purchase_positions: null, isAdd: false }
        case types.PURCHASE_SHOW_CARD_SUCCESS:
            return {
                ...state, isShowPopup: false, currentViewType: types.CURRENT_VIEW_TYPE_CARD, purchase_data: action.payload,
                popupFetching: false, fetching: false, error: ''
            }
        case types.PURCHASE_SHOW_CARD_FAILURE:
            return { ...state, isShowPopup: false, fetching: false, popupFetching: false, error: '' }
        case types.PURCHASE_SHOW_CARD_CLOSE:
            return { ...state, isShowPopup: false, fetching: false, popupFetching: false, error: '' }
        case types.GET_PURCHASE_LIST_REQUEST:
            return { ...state, currentViewType: types.CURRENT_VIEW_TYPE_LIST, purchase_positions: null, currentViewType: types.CURRENT_VIEW_TYPE_LIST }
        case types.GET_PURCHASE_LIST_SUCCESS:
            return {
                ...state, purchase_data: null, purchase_positions: null, currentViewType: types.CURRENT_VIEW_TYPE_LIST, isAdd: false,
                purchase_positions: null, currentViewType: types.CURRENT_VIEW_TYPE_LIST, purchase_position_item: null}
        case types.GET_PURCHASE_POSITION_LIST_SUCCESS:
            return { ...state, purchase_positions: action.payload, fetching: false, error: '' }
        case types.PURCHASE_POSITION_SHOW_CARD_SUCCESS:
            return { ...state, purchase_position_item: action.payload, fetching: false, error: '', currentViewType: types.CURRENT_VIEW_TYPE_CARD }
        case types.PURCHASE_ADD_SHOW_CARD:
            return {
                ...state, isShowPopup: false, fetching: false, currentViewType: types.CURRENT_VIEW_TYPE_CARD,
                popupFetching: false, error: '', isAdd: true
            }
            case types.PURCHASE_ADD_SAVE_REQUEST:
            return {
                ...state, isShowPopup: false, fetching: true, currentViewType: types.CURRENT_VIEW_TYPE_CARD,
                popupFetching: false, error: ''
            }
        case types.PURCHASE_ADD_SAVE_SUCCESS:
            return {
                ...state, purchase_position_item: null, fetching: false, error: '',
                currentViewType: types.CURRENT_VIEW_TYPE_CARD, isAdd: false
            }
        default:
            return state;
    }
}