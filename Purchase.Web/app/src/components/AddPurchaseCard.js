import './css/AddPurchaseCard.css';
import React from 'react';
import { Panel, CardHeader } from './common/common';

export default class AddPurchaseCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    btnOnClick() {
        this.props.actionCreate(this.state.planYear);
    }

    render() {
        return (<div><p /><CardHeader text="Добавление плана закупки" />
            <br /><Panel><span>Введите финансовый год: </span>
                <input name="planYear" type="text" onChange={this.handleChange.bind(this)}></input></Panel >
            <p />
            <button onClick={this.btnOnClick.bind(this)} >Создать</button>
        //</div>);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            });
    }
}