import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import './App.css';
import Page from './components/Page.js';
import { connect } from 'react-redux'
import * as pageActions from './actions/PageActions';

class App extends Component {

  isLoading = false;

    render() {
        const { getList } = this.props.pageActions
        const { page } = this.props
        const { getPurchaseNitifications } = this.props.pageActions
       
    return (
        <Page Data={page.items} fetching={page.fetching} getPurchaseNitifications={getPurchaseNitifications} getList={getList}/>
    );
  }

    componentDidMount() {
        return;       
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        page: state.page
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
