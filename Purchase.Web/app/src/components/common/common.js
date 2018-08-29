import './common.css';
import React from 'react';

export class Panel extends React.Component {
    render() {
        return (
            <div className={'Panel ' + this.props.styleName}>
                {this.props.children}
            </div>
        );
    }
}

export class CardHeader extends React.Component {
    render() {
        return (
            <h2 className="header_text"> {this.props.text}</h2>
        );
    }    
}

export class TextEditor extends React.Component {
    render() {
        if (this.props.viewMode) {
            return <input type="text" readOnly value={this.props.bindPath/*this.dict[name]*/} className="ro"></input>;
        }
        else
            return <input type="text" name={this.props.name} value={this.props.bindPath} onChange={this.props.onChangeEvent}></input>;
    }    
}
