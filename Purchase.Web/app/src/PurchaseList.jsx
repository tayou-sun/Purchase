import React, { Component } from 'react';
import ReactTable from "react-table";
import PropTypes from 'prop-types';
import 'react-table/react-table.css'

export default class PurchaseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props
        };
    }

    onRowClick(e) {
        this.props.getPurchaseDetails(e)
    }

    render() {
        const columns = [{
            Header: 'ENTITY_ID',
            accessor: 'entitY_ID'
        }, {
                Header: 'sourceSystem',
                accessor: 'sourceSystem',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
                id: 'src_id',
                accessor: 'src_id',
                Header: 'src_id',
            }, {
                Header: 'summTotal',
                SummTotal: props => <span>SummTotal</span>,
                accessor: 'summTotal'
        }]

        return (<ReactTable
            data={this.props.data}
            columns={columns}
            getTrProps={(state, rowInfo, column) => {
                return {
                    onClick: (e) => {
                        this.onRowClick(rowInfo.row.entitY_ID);
                    }
                };
            }}
        />);
    }
}

PurchaseList.propTypes = {
    getPurchaseDetails: PropTypes.func.isRequired
}