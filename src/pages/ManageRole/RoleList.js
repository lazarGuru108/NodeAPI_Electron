// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './ManageRole.scss';
import { Table } from 'react-bootstrap';
import { Button, Popconfirm } from 'antd';

class RoleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: [],
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ initData: props.initData });
    }

    componentDidMount() {
        this.setState({ initData: this.props.initData });
    }

    handleEdit = (e, key) => {
        this.props.handleEdit(key);
    }

    handleDelete = (e, key) => {
        this.props.handleDelete(key);
    }


    render() {
        let initData = this.props.initData;
        // let initData = this.state.initData;
        return (
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th style={{width: "10%"}}>SL.</th>
                        <th style={{width: "70%"}}>Role Name</th>
                        <th style={{padding: "5px", textAlign: "center", width: "20%"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        initData.roles.map((item, key) => (
                            <tr key={key} style={{height: "25px"}}>
                                <td style={{width: "10%"}}>{key}</td>
                                <td style={{width: "70%"}}>{item.rolename}</td>
                                <td style={{display: "flex",padding: "5px", justifyContent: "center"}}>
                                    <div style={{padding: "5px"}}>
                                        <Button type="primary" className="tableButton" onClick={(e) => this.handleEdit(e, key)} style={{ background: 'rgb(60, 141, 188)' }} ><i className="fa fa-fw fa-pencil"></i></Button>
                                    </div>
                                    <div style={{padding: "5px"}}>
                                        <Popconfirm title="Sure to delete?" onConfirm={(e) => this.handleDelete(e, key)}>
                                            <Button type="primary" className="tableButton" style={{ background: 'rgb(221, 75, 57)' }} ><i className="fa fa-fw fa-trash"></i></Button>
                                        </Popconfirm>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }
}

export default RoleList;