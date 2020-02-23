// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './ManageSupplier.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../../store/actions/userAction';
import { getAllSales } from '../../../store/actions/saleAction';
import { Collapse, Select, Icon } from 'antd';
import EditForm from './EditForm';
import TableView from './TableView';
import testData from './testData.json';
const { Panel } = Collapse;

const initData = {
    uname: '', 
    email: '', 
    mobile: '', 
    gtin:'', 
    address: '', 
    city: '', 
    state: '', 
    country: '', 
    storeSelect: true, 
    stores: [], 
    detail: '', 
    status: 'Active', 
    order: ''
};

class ManageSupplier extends React.Component {
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
        console.log(record, type);

        this.setState({activeKey: '1', stateEdit: true, initFormData: record, selectedSupply: record.key});
    }

    saveSupplier = (data)=>{
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
            <div className="container-fluid" id="supplier">
                <Collapse  accordion activeKey={[this.state.activeKey]} onChange={(key) => this.callback(key)} expandIconPosition={''} expandIcon={(isActive) => <Icon type={isActive?'plus':'minus'} />}>
                    <Panel className="panelHeader" header="Add New Supplier" key="1" extra={<Icon type={this.state.activeKey === '2'?"plus":"minus"}/>}>
                        <EditForm onSave={this.saveSupplier} initData={this.state.initFormData} stateEdit = {this.state.stateEdit}/>
                    </Panel>
                    <Panel className="panelHeader" header="Supplier List" key="2" extra={<Icon type={this.state.activeKey === '1'?"plus":"minus"}/>}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupplier);