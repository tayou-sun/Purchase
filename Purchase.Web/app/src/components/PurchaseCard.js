import './css/PurchaseCard.css';
import React from 'react';

export default class PurchaseCard extends React.Component {
    render() {

        const attributes = this.props.attributes

        return (
            <div className='PurchaseCard'>
                <h2>План закупок</h2>
                <table className='PurchaseCard_Table'>
                    <tbody>
                        {
                            Object.entries(attributes).map((attr, i) =>                            
                                <tr key={i}>
                                    <td>{attr[0]}</td>
                                    <td>{attr[1]}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}