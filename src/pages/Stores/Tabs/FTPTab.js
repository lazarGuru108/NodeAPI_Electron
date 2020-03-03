import React from 'react';
import 'antd/dist/antd.css';
import '../ManageStores.scss';
import { Button, Icon } from 'antd';

class EmailTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            formData: {}
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ formData: { ...props.initData } });
    }

    componentDidMount() {
        this.setState({ formData: { ...this.props.initData } });
    }

    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let formData = this.state.formData;
        let val = e.target.value;
        this.setState({ formData: { ...formData, [field]: val } }, () => {
            console.log(field, val);
        });
    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
    }

    resetHandler() {
        this.setState({ formData: {} });
    }

    render() {
        let { ftpHostname, ftpUsername,ftpPassword } = this.state.formData;
        return (
            <>
                <div className="editForm">
                    <form action="" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="ftpHostname" className="control-label">
                                        FTP Hostname
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="ftpHostname" onChange={(e) => this.handleFieldChange(e, 'ftpHostname')}
                                        placeholder="" name="ftpHostname" required value={ftpHostname || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="ftpUsername" className="control-label">
                                        FTP Username
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="ftpUsername" onChange={(e) => this.handleFieldChange(e, 'ftpUsername')}
                                        placeholder="" name="ftpUsername" required value={ftpUsername || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="ftpPassword" className="control-label">
                                        FTP Password
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="ftpPassword" onChange={(e) => this.handleFieldChange(e, 'ftpPassword')}
                                        placeholder="" name="ftpPassword" required value={ftpPassword || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-12 col-md-3 col-sm-12 title">
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="primary" onClick={this.saveHandler}><Icon type="save" />Save</Button>
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="primary" onClick={this.resetHandler}><Icon type="sync" />Reset</Button>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default EmailTab;