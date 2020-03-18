// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './ManageRole.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { Collapse, Select, Icon } from 'antd';
import testData from './testData.json';
import initRole from './initRole.json';
import AddRole from './AddRole';
import RoleList from './RoleList';
const { Panel } = Collapse;

class ManageRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: '2',
            initData: testData,
            selectedRecord: initRole,
            selectedRecordKey: -1,
            isEditing: false,
        };
    }

    componentDidMount() {
        // let selectedRecord = {...testData.roles[0], id:0, rolename: ""};
        this.setState({selectedRecord: initRole, rolename: ""});
    }
    
    callback(key) {
        console.log(initRole);
        this.state.activeKey === '2'?this.setState({activeKey:'1', selectedRecordKey: -1, selectedRecord: initRole}):this.setState({activeKey:'2', isEditing: false});
    }

    handleDelete = (key) => {
        let data = this.state.initData.roles;
        delete data[key];
        data.splice(key,1);
        let initData = {...this.state.initData, roles: data};
        this.setState({initData: initData});
    }

    handleEdit = (key) => {
        let roles = this.state.initData.roles;
        this.setState({selectedRecord: roles[key],selectedRecordKey: key, isEditing: true, activeKey: '1'});
    }

    saveRole = (saveData) => {
        let {initData, selectedRecordKey,isEditing } = this.state;
        if(isEditing){
            initData.roles[selectedRecordKey] = saveData;
        }
        else{
            let len = initData.roles.length;
            let save = {...saveData, id: initData.roles[len-1].id + 1};
            initData.roles.push(save);
        }
        // let selectedRecord = {...testData.roles[0], id:0, rolename: ""};
        this.setState({initData: initData, activeKey: '2', isEditing: false});
    }

    render() {
        let { initData, selectedRecord, isEditing } = this.state;
        return (
            <div className="container-fluid" id="manageRole">
                <Collapse  accordion activeKey={[this.state.activeKey]} onChange={(key) => this.callback(key)} expandIconPosition={''} expandIcon={(isActive) => <Icon type={isActive?'plus':'minus'} />}>
                    <Panel className="panelHeader" header="Add New Role" key="1" extra={<Icon type={this.state.activeKey === '2'?"plus":"minus"}/>}>
                        <AddRole initData={selectedRecord} saveRole={(saveData) => {this.saveRole(saveData)}} isEditing={isEditing}/>
                    </Panel>
                    <Panel className="panelHeader" header="Role List" key="2" extra={<Icon type={this.state.activeKey === '1'?"plus":"minus"}/>}>
                        <RoleList initData={initData} handleDelete={(key) => this.handleDelete(key)} handleEdit={(key) => this.handleEdit(key)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageRole);