import React, { Component } from 'react'
import Popup from './popup';
import * as types from '../constants/ActionTypes';
import LoadingBlocker from './loading_blocker';
import PurchaseList from '../PurchaseList.jsx';
import PropTypes from 'prop-types';
import * as purchaseActions from '../actions/PurchaseActions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PurchaseCard from './PurchaseCard'
import PurchaseCardFull from './PurchaseCardFull'
import PurchasePositionCard from './PurchasePositionCard';
import { Panel, CardHeader } from './common/common';
import AddPurchaseCard from './AddPurchaseCard';

export class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.getList();
    }

    onShowListBtnClick(e) {
        this.props.getList()
    }

    onShowPurchaseNotificationList(e) {
        this.props.getPurchaseNitifications()
    }

    onClosePopup() {
        this.props.purchaseActions.closePurchaseDetails();
    }

    onAddBtnClick() {
        this.props.purchaseActions.addPurchase();
    }

    createPurchaseInitClick(e) {
        alert(e.value);
    }

    render() {
        const { items, fetching, isShowPopup, popupFetching, purchase_id, purchase_positions,
            purchase_position_item, isAdd } = this.props

        const { getPurchaseDetails } = this.props.purchaseActions
        const { getPurchaseNotificationDetails } = this.props.purchaseActions

        const { purchaseAdd } = this.props.purchaseActions
        const { getPurchasePositions, getPurchasePositionDetails } = this.props.purchaseActions

        let content = null;

        switch (this.props.currentViewType) {
            case types.CURRENT_VIEW_TYPE_LIST:
                if (fetching)
                    content = <p>Загрузка...</p>;
                else
                    content = <PurchaseList getPurchaseDetails={getPurchaseDetails} data={this.props.Data} />;
                break;
            case types.CURRENT_VIEW_TYPE_CARD:
                if (purchase_position_item != null) {
                    content = <PurchasePositionCard text={'Позиция плана закопок'} data={purchase_position_item} />
                }
                else {
                    if (isAdd) {
                        content = <AddPurchaseCard actionCreate={purchaseAdd}/>;
                    }
                    else
                        content = <PurchaseCardFull purchase_id={purchase_id} viewMode={!isAdd} /*purchaseAdd={purchaseAdd}*/ purchaseData={this.props.purchase_data}
                            getPurchasePositions={getPurchasePositions} purchasePositionsData={purchase_positions}
                            getPurchasePositionDetails={getPurchasePositionDetails} />;
                }
                    
        }

        let popup = null;
        let blocker = null;
        if (popupFetching) {
            blocker = <LoadingBlocker/>
        }
        else
            if (isShowPopup) {
                //content = <PurchaseCardFull viewMode={true} purchaseAdd={purchaseAdd} purchaseData={this.props.purchase_data} />;*/
            let p_card = <PurchaseCard attributes={this.props.purchase_data}/>;
            popup = <Popup closePopup={this.onClosePopup.bind(this)} content={p_card}/>
        }
        return (
            <div className="App" >
                {blocker}
                <div className="rootMenu">
                    <button onClick={this.onShowListBtnClick.bind(this)}>
                        Список
                    </button>
                    <button onClick={this.onShowPurchaseNotificationList.bind(this)}>
                        Извещения о закупке
                    </button>
                    <button onClick={this.onAddBtnClick.bind(this)}>
                        Добавить
                    </button>
                </div>
                <div className="Content">
                    {content}
                    {popup}
                </div>
            </div>
        );
    }      
}

Page.propTypes = {
    getList: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        purchaseActions: bindActionCreators(purchaseActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page,
        isAdd: state.purchaseReducer.isAdd,
        currentViewType: state.purchaseReducer.currentViewType,
        popupFetching: state.purchaseReducer.popupFetching,
        isShowPopup: state.purchaseReducer.isShowPopup,
        purchase_data: state.purchaseReducer.purchase_data,
        purchase_id: state.purchaseReducer.purchase_id,
        purchase_positions: state.purchaseReducer.purchase_positions,
        purchase_position_item: state.purchaseReducer.purchase_position_item
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)