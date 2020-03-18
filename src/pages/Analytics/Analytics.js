import React, { Component } from 'react';
import PieChart from './PieChart';
import { Table } from 'react-bootstrap';
import './Analytics.scss';
import BarChart from './BarChart';
import ColumnChart from './ColumnChart'
import { Tabs } from 'antd';
import TableView from './TableView';
import { Link } from 'react-router-dom';
import LoginLog from './LoginLog';

const { TabPane } = Tabs;

class Analytics extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container-fluid" id="analytics">
                <div className="row chart">
                    <div className="col-md-3 col-12 col-sm-12 piechartContainer" >
                        <PieChart title="Top Products" />
                    </div>
                    <div className="col-md-3 col-12 col-sm-12 piechartContainer" >
                        <PieChart title="Top Customers" />
                    </div>
                    <div className="col-md-3 col-12 col-sm-12 piechartContainer" >
                        <PieChart title="Top Suppliers" />
                    </div>
                    <div className="col-md-3 col-12 col-sm-12 piechartContainer" >
                        <PieChart title="Top Brands" />
                    </div>
                </div>
                <div className="row secondRow">
                    <div className="col-md-6 col-12 col-sm-12">
                        <Table responsive="md" bordered hover>
                            <tbody>
                                <tr className="grayRow">
                                    <td className="firstCol">Opening Balance</td>
                                    <td className="secondCol">2.00</td>
                                </tr>
                                <tr className="grayRow">
                                    <td className="firstCol"><span className="fa fa-link"></span>Today Income</td>
                                    <td className="secondCol">8,490.50</td>
                                </tr>
                                <tr className="greenRow">
                                    <td className="firstCol">Total Income</td>
                                    <td className="secondCol">8,492.50</td>
                                </tr>
                                <tr className="redRow">
                                    <td className="firstCol"><span className="fa fa-link"></span>Today Expense (-)</td>
                                    <td className="secondCol">8,153.00</td>
                                </tr>
                                <tr className="blueRow">
                                    <td className="firstCol">Balance / Cash In Hand</td>
                                    <td className="secondCol">339.50</td>
                                </tr>
                                <tr className="yellowRow">
                                    <td className="firstCol">Today Closing Balance</td>
                                    <td className="secondCol">339.50</td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-6 col-12 col-sm-12" >
                        <BarChart />
                    </div>
                </div>
                <div className="row thirdRow">
                    <div className="rowHeader">
                        <span>Customer Analytics</span>
                    </div>
                    <div className="thirdContent">
                        <div className="col-md-6 col-12 col-sm-12">
                            <Tabs defaultActiveKey="1" onChange={() => this.callback}>
                                <TabPane tab="His birthday is today" key="birthday">
                                    <TableView />
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="col-md-6 col-12 col-sm-12">
                            <div id="best-customer" className="small-box best-customer" style={{boxShadow:"none"}}>
                                <div className="inner">
                                    <h3 className="title" style={{textAlign: 'center'}}>
                                        <font style={{verticalAlign: "inherit"}}>
                                            <font style={{verticalAlign: "inherit"}}>
                                                Best customer                  
                                            </font>
                                        </font>
                                    </h3>
                                    <span className="name">
                                        <Link to="" >
                                            <font style={{verticalAlign: "inherit"}}>
                                                <font style={{verticalAlign: "inherit", color: "#3c8dbc"}}>
                                                    Walking Customer                      
                                                </font>
                                            </font>
                                        </Link>
                                    </span>
                                    <div className="amount">
                                        <font style={{verticalAlign: "inherit"}}>
                                            <font style={{verticalAlign: "inherit"}}>
                                                Buy
                                            </font>
                                        </font>
                                        <strong>
                                            <font style={{verticalAlign: "inherit"}}>
                                                <font style={{verticalAlign: "inherit"}}>$ 67,940.50</font>
                                            </font>
                                        </strong>                 
                                    </div>
                                    <div className="contact">
                                        <i><font style={{verticalAlign: "inherit"}}><font style={{verticalAlign: "inherit"}}>Mobile: 0170000000000</font></font></i>
                                    </div>
                                    <div className="contact">
                                        <i><font style={{verticalAlign: "inherit"}}><font style={{verticalAlign: "inherit"}}>Email: wc@itsolution24.com</font></font></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row chart">
                    <div style={{padding: "10px" }}>
                        <ColumnChart />
                    </div>
                </div>
                <div className="row loginlogs">
                    <div className="rowHeader">
                        <span>Login Logs</span>
                    </div>
                    <div>
                        <LoginLog />
                    </div>
                </div>
            </div>
        )
    }
}

export default Analytics;