import './css/PurchaseCardFull.css';
import PropTypes from 'prop-types';
import React from 'react';
import * as common from './common/common.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import userlogo from '../image/User.png'
import { CardHeader, TextEditor } from './common/common.js';

export default class PurchaseCardFull extends React.Component {
    
    constructor(props) {
        super(props);

        let data = this.props.purchaseData;
        if (data != null) {
            this.props.purchaseData.PlanPeriod = data.planFirstYear + ' - ' + data.planSecondYear;
        }
        this.state = {
            purchaseData: this.props.purchaseData,
            /*Number: data.gzregnum,
            PlanYear: data.planYear,
            PlanPeriod: data.planFirstYear + ' - ' + data.planSecondYear,
            VersionNumber: data.versionNumber,
            Status: '',
            ConfirmDate: data.confirmDate,   
            CreateDate: data.createDate,
            SumTotal: data.summCurYear + data.summFirstYear + data.summSecondaryYear + data.summSubsecYear,*/


            tabIndex: 0,
            tab0fetching: false,
            tab1fetching: false,
            tab2fetching: false
        };

        this.dict = [];
        this.dict['Number'] = "100";
        this.dict['PlanYear'] = "2018";
        this.dict['PlanPeriod'] = "2019 - 2020";

        this.dict['VersionNumber'] = "11";
        this.dict['Status'] = "Утвержден";
        this.dict['ConfirmDate'] = "20.08.2018";
    }

    onbtnAddClock() {
        this.props.purchaseAdd();
    }

    componentDidMount() {
        this.getDataByTabIndex(this.state.tabIndex);
    }

    handleChange(e) {
        this.setState(
            {
               [e.target.name]: e.target.value
            });
    }       

    getPurchaseDataList(data) {
        const columns = [{
            Header: 'Сумма на 2018 год',
            accessor: 'sum2018'
        }, {
            Header: 'Сумма на 2019 год',
            accessor: 'sum2019',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
                id: 'src_id',
                Header: 'Сумма на 2020 год',
            accessor: 'sum2020'            
        }, {
            Header: 'Сумма на последующие года',
            SummTotal: props => <span>SummTotal</span>,
            accessor: 'sumOther'
        }]

        return (<ReactTable
            noDataText={'Нет данных'}
            showPagination={false}
            defaultPageSize={1}
            data={data}
            columns={columns}
            getTrProps={(state, rowInfo, column) => {
                return {
                    onClick: (e) => {
                        this.onRowClick(rowInfo.row.entitY_ID);
                    }
                };
            }}
            getTableProps={(state, rowInfo, column) => {
                return {
                    style: {
                        border: "1px solid #dadada"
                    }
                };
            }}
            getTheadThProps={(state, rowInfo, column) => {
                return {
                    style: {
                        background: "#dadada",
                        margin: "2px"
                    }
                };
            }}
        />);
    }

    onRowClick(e) {
        this.props.getPurchasePositionDetails(e)
    }

    getPurchasePositionsList(data) {
        const columns = [
            {
                Header: 'ENTITY_ID',
                accessor: 'entitY_ID',
                show: false
            },
            {
            Header: 'IKZ',
            accessor: 'ikz'
        }, {
            Header: 'Programm',
                accessor: 'programm',
            Cell: props => <span className='number'>{props.value}</span>
        }, {
                Header: 'Event',
                accessor: 'event',
            },
            {
                Header: 'PurchObjInfo',
                accessor: 'purchObjInfo'
            }, {
                Header: 'ExpectedResult',
                accessor: 'expectedResult'
            }, {
                Header: 'PublishYear',
                accessor: 'publishYear',
                maxWidth: 100
            }]

        return (<ReactTable
            noDataText={'Нет данных'}
            defaultPageSize={10}
            data={data}
            columns={columns}
            getTrProps={(state, rowInfo, column) => {
                return {
                    onClick: (e) => {
                        this.onRowClick(rowInfo.row.entitY_ID);
                    }
                };
            }}
            getTableProps={(state, rowInfo, column) => {
                return {
                    style: {
                        border: "1px solid #dadada"
                    }
                };
            }}
            getTheadThProps={(state, rowInfo, column) => {
                return {
                    style: {
                        background: "#dadada",
                        margin: "2px"
                    }
                };
            }}

        />);
    }

    getDataByTabIndex(tabIndex) {
        switch (tabIndex) {
            case 0:
                this.props.getPurchasePositions(this.props.purchase_id);
        }
    }

    tabs_selection_changed(tabIndex) {
        this.setState({ tabIndex })
        this.getDataByTabIndex(tabIndex);
    }

    render() {
      const Loading = require('react-loading-animation');

        const { viewMode } = this.props
        let p_data = this.props.purchaseData;
        const data = [{
            sum2018: p_data ? p_data.summCurYear : 0,
            sum2019: p_data ? p_data.summFirstYear : 0,
            sum2020: p_data ? p_data.summSecondaryYear : 0,
            sumOther: p_data ? p_data.summSubsecYear : 0
        }];

        let tab0Content = "";
        let tab1Content = "not implemented";
        let tab2Content = "not implemented";
        switch (this.state.tabIndex) {
            case 0:
                if (this.state.tab0fetching || this.props.purchasePositionsData == null)
                    tab0Content = <Loading />;
                else
                    tab0Content = this.props.purchasePositionsData.length == 0 ? "Нет данных" : this.getPurchasePositionsList(this.props.purchasePositionsData);
                break;
        }
      
      return (
          <div className='PurchaseCardFull'>
              <CardHeader text={viewMode ? 'План закупок ' + this.state.PlanPeriod : 'Новый план закупок'}></CardHeader>
              <p />
              <div className="cols_outerDiv">
                  <common.Panel styleName='card_pnl'>
                      <span>Номер</span>
                      <TextEditor viewMode={viewMode} name="Number" bindPath={this.state.purchaseData.gzregnum} onChange={this.handleChange.bind(this)}/>
                      <br />
                      <span>Финансовый год</span>
                      <TextEditor viewMode={viewMode} name="PlanYear" bindPath={this.state.purchaseData.planYear} onChange={this.handleChange.bind(this)} />
                      <br />
                      <span>Плановый период</span>
                      <TextEditor viewMode={viewMode} name="PlanPeriod" bindPath={this.state.purchaseData.PlanPeriod} onChange={this.handleChange.bind(this)} />
                      <br />
                      <span>Исполнитель</span>
                      <common.Panel styleName='pnl_user'>
                          <img className="userLogo" src={userlogo}></img>
                          <span>Иванов</span>
                      </common.Panel>
                  </common.Panel >
                  <common.Panel styleName='card_pnl'>
                      <span>Текущая версия</span>
                      <TextEditor viewMode={viewMode} name="VersionNumber" bindPath={this.state.purchaseData.versionNumber} onChange="this.handleChange.bind(this)" />
                      <br />
                      <span>Статус</span>
                      <TextEditor viewMode={viewMode} name="Status" bindPath={this.state.purchaseData.Status} onChange="this.handleChange.bind(this)" />
                      <br />
                      <span>Дата утверждения</span>
                      <TextEditor viewMode={viewMode} name="ConfirmDate" bindPath={this.state.purchaseData.confirmDate} onChange="this.handleChange.bind(this)" />
                      <br />
                      <span>Дата создания</span>
                      <TextEditor viewMode={viewMode} name="CreateDate" bindPath={this.state.purchaseData.createDate} onChange="this.handleChange.bind(this)" />
                      <br />
                      <span>Утвердил</span>
                      <common.Panel styleName='pnl_user'>
                          <img className="userLogo" src={userlogo}></img> 
                          <span>Иванов</span>
                      </common.Panel>
                  </common.Panel>
              </div>
                  <br />
              <p />
              <common.Panel styleName='pnl_Owner'><span>Федеральное агенство воздушного транспорта</span><br />
                  <span>Российская федерация</span></common.Panel>
              <p/>

              <p />
              <div className="sumTotalDiv">
                <span>Объем осуществления закупок</span><span className="sumTotal"> {this.state.SumTotal} руб. </span>
              </div>
              <br />
              {this.getPurchaseDataList(data)}
              <br />
              <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.tabs_selection_changed(tabIndex)} className='purchaseCard_Tabs'>
                  <TabList>
                      <Tab>Позиции плана</Tab>
                      <Tab>Объекты закупки</Tab>
                      <Tab>Коды БК</Tab>
                  </TabList>
                  <TabPanel>
                      <h2>Позиции плана</h2>
                      {tab0Content}
                  </TabPanel>
                  <TabPanel>
                      <h2>Объекты закупки</h2>
                      {tab1Content}
                  </TabPanel>
                  <TabPanel>
                      <h2>Коды БК</h2>
                      {tab2Content}
                  </TabPanel>
              </Tabs>
              <br/>
              <button onClick={this.onbtnAddClock.bind(this)}>Сохранить</button>
          </div>            
        );
    }
}

PurchaseCardFull.propTypes = {
    purchaseAdd: PropTypes.func.isRequired
}
