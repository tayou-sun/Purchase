import './css/loading_blocker.css';
import React from 'react';

export default class Loading_blocker extends React.Component {
    render() {
        return (
            <div className='loading_blocker'>
                <span className='blocker_page_msg'>Загрузка...</span>
            </div>
        );
    }
}