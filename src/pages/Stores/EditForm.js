import React from 'react';
import 'antd/dist/antd.css';
import './ManageStores.scss';
import { Select, Button, Icon, Tabs } from 'antd';
import GeneralTab from './Tabs/GeneralTab';
import PrinterTab from './Tabs/PrinterTab';
import EmailTab from './Tabs/EmailTab';
import FTPTab from './Tabs/FTPTab';
import LogoTab from './Tabs/LogoTab';
import noImage from '../../assets/images/noimage.jpg';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;
const { Option } = Select;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    callback = (key) => {
        console.log(key);
    }

    render() {
        
        return (
            <Tabs defaultActiveKey="1" onChange={() => this.callback}>
                <TabPane tab="General" key="1">
                    <GeneralTab onSave={this.props.onSave} initData={this.props.initData} stateEdit = {this.props.stateEdit}/>
                </TabPane>
                <TabPane tab="Printer" key="2">
                   <PrinterTab  onSave={this.props.onSave} initData={this.props.initData} stateEdit = {this.props.stateEdit}/>
                </TabPane>
                <TabPane tab="Email Setting" key="3">
                    <EmailTab onSave={this.props.onSave} initData={this.props.initData} stateEdit = {this.props.stateEdit} />
                </TabPane>
                <TabPane tab="FTP Setting" key="4">
                    <FTPTab onSave={this.props.onSave} initData={this.props.initData} stateEdit = {this.props.stateEdit} />
                </TabPane>
                <TabPane tab="Logo and Background" key="5">
                    <LogoTab onSave={this.props.onSave} initData={this.props.initData} stateEdit = {this.props.stateEdit} />
                </TabPane>
            </Tabs>
        );
    }
}

export default EditForm;