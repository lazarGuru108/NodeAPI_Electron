// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './ManageStores.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { Collapse, Select, Icon } from 'antd';
import EditForm from './EditForm';
import TableView from './TableView';
import testData from './testData.json';
const { Panel } = Collapse;

const initData = {
    sl: '',
    uname: '', 
    email: '', 
    country: '',
    mobile: '',
    password: '', 
    repassword: '',
    group: '',
    currencySelect: true, 
    repassword: '',
    currencys: [], 
    paymethod: [],
    paymethodSelect: true, 
    printers: [],
    status: 'Active', 
    order: ''
};

class ManageStores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '2',
            stateEdit: false,
            selectedSupply: -1,
            dataSource: testData.tables,
            initFormData: initData,
        }
    }
    

    callback(key) {
        this.state.activeKey === '2'?this.setState({activeKey:'1', initFormData: initData, selectedSupply: -1}):this.setState({activeKey:'2'});
    }

    handleTable = (record, type)=>{
        console.log(this.state.initFormData);

        this.setState({activeKey: '1', stateEdit: true, initFormData: record, selectedSupply: record.key});
    }

    saveStores = (data)=>{
        let { dataSource, selectedSupply } = this.state;
        let newDataSource = [];
        if(selectedSupply > -1) {
            for(let i = 0; i<dataSource.length; i++) {
                if(dataSource[i].key == selectedSupply) {
                    console.log(data, selectedSupply);
                    newDataSource.push({...data, key: selectedSupply});
                }else{
                    newDataSource.push(dataSource[i]);
                }
            }
        }else {
            newDataSource = dataSource;
            newDataSource.push({...data, key: dataSource.length, id: dataSource.length + 1, createdAt: new Date().toLocaleDateString() });
        }
        console.log(newDataSource);
        this.setState({dataSource: newDataSource, activeKey: "2", selectedSupply: false});
    }

    render() {
        return (
            <div className="container-fluid" id="managestores">
                <Collapse  accordion activeKey={[this.state.activeKey]} onChange={(key) => this.callback(key)} expandIconPosition={''} expandIcon={(isActive) => <Icon type={isActive?'plus':'minus'} />}>
                    <Panel className="panelHeader" header="Add New Store" key="1" extra={<Icon type={this.state.activeKey === '2'?"plus":"minus"}/>}>
                        <EditForm onSave={this.saveStores} initData={this.state.initFormData} stateEdit = {this.state.stateEdit}/>
                    </Panel>
                    <Panel className="panelHeader" header="Store List" key="2" extra={<Icon type={this.state.activeKey === '1'?"plus":"minus"}/>}>
                        <TableView dataSource={this.state.dataSource} handle={this.handleTable}/>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.users,
        sales: state.sales,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        getAllSales: () => dispatch(getAllSales())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageStores);