import './css/popup.css';
import React from 'react';

export default class Popup extends React.Component  {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div>{this.props.content}</div>
                    <button className='btnOK' onClick={this.props.closePopup}>OK</button>
                </div>
            </div>
        );
    }
}