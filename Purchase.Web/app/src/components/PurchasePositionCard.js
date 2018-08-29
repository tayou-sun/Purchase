import './css/PurchasePositionCard.css';
import { CardHeader, TextEditor, Panel } from './common/common.js';
import React from 'react';


export default class PurchasePositionCard extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            });
    }  

    render() {
        return (
            <div className='PurchasePositionCard'>
                <CardHeader text={'Позиция плана закупок'}></CardHeader>
                <Panel styleName="card_pnl">
                    <span>IKZ</span>
                    <TextEditor viewMode={true} name="IKZ" bindPath={this.props.data.ikz} onChange={this.handleChange.bind(this)} />
                    <br />
                    <span>Programm</span>
                    <TextEditor viewMode={true} name="Programm" bindPath={this.props.data.programm} onChange={this.handleChange.bind(this)} />
                    <br />
                    <span>Event</span>
                    <TextEditor viewMode={true} name="Event" bindPath={this.props.data.event} onChange={this.handleChange.bind(this)} />
                    <br />
                    <span>PurchObjInfo</span>
                    <TextEditor viewMode={true} name="PurchObjInfo" bindPath={this.props.data.purchObjInfo} onChange={this.handleChange.bind(this)} />
                    <br />
                    <span>ExpectedResult</span>
                    <TextEditor viewMode={true} name="ExpectedResult" bindPath={this.props.data.expectedResult} onChange={this.handleChange.bind(this)} />
                    <br />
                    <span>PublishYear</span>
                    <TextEditor viewMode={true} name="PublishYear" bindPath={this.props.data.publishYear} onChange={this.handleChange.bind(this)} />
                    <br />
                </Panel>
            </div>
        );
    }
}