// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './ManageRole.scss';
import { Table } from 'react-bootstrap';
import testData from './testData.json';

class AddRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role_name: "",
            initData: this.props.initData,
            isEditing: this.props.isEditing,
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.initData);
        let isEditing = props.isEditing;
        // isEditing ?
            this.setState({ initData: {...props.initData}, role_name: props.initData.rolename })
        // :
            // this.setState({ initData: { ...testData.roles[0], id: 0, rolename: ""}, role_name: "" })
    }

    componentDidMount() {
        console.log(this.props.initData);
        let isEditing = this.props.isEditing;
        // isEditing ?
            this.setState({ initData: {...this.props.initData}, role_name: this.props.initData.rolename })
        // :
            // this.setState({ initData: { ...testData.roles[0], id: 0, rolename: ""}, role_name: "" })
    }

    handleFieldChange = (e) => {
        let initData = this.state.initData;
        initData.rolename = e.target.value;
        this.setState({ role_name: e.target.value, initData: initData });
    }

    saveRole = (e) => {
        if (e.keyCode === 13){
            this.props.saveRole(this.state.initData);
        }
    }

    render() {
        let { role_name, initData } = this.state;
        return (
            <div className="container-fluid">
                <div className="form-group">
                    <div className="row">
                        <div className="col-3 title">
                            <label htmlFor="role_name">Role Name <i className="required">*</i></label>
                        </div>
                        <div className="col-7">
                            <input type="text" className="form-control" name="role_name" onChange={(e) => this.handleFieldChange(e)} onKeyDown={(e) => this.saveRole(e)}
                                placeholder="Role Name" name="role_name" required value={role_name || ''} />
                        </div>
                    </div>
                </div>
                {
                    initData.fields.map((item, key) => (
                        <div key={key}>
                            <h3>{item.field_name}</h3>
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>SI No</th>
                                        <th>Menu Name</th>
                                        <th>Create</th>
                                        <th>Read</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        item.permission.map((perm, index) => (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{perm.permission_name}</td>
                                                <td>
                                                    <input type="checkbox" checked={perm.create} onChange={() => {
                                                        initData.fields[key].permission[index].create = !perm.create;
                                                        this.setState({initData: initData});
                                                    }}></input>
                                                </td>
                                                <td>
                                                    <input type="checkbox" checked={perm.read} onChange={() => {
                                                        initData.fields[key].permission[index].read = !perm.read;
                                                        this.setState({initData: initData});
                                                    }}></input>
                                                </td>
                                                <td>
                                                    <input type="checkbox" checked={perm.update} onChange={() => {
                                                        initData.fields[key].permission[index].update = !perm.update;
                                                        this.setState({initData: initData});
                                                    }}></input>
                                                </td>
                                                <td>
                                                    <input type="checkbox" checked={perm.delete} onChange={() => {
                                                        initData.fields[key].permission[index].delete = !perm.delete;
                                                        this.setState({initData: initData});
                                                    }}></input>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default AddRole;