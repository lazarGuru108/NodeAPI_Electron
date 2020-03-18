import React from 'react';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class BillingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            formData: {}
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
    }
    /* 
        componentWillReceiveProps(props) {
            this.setState({ formData: { ...props.initData } });
        }
    
        componentDidMount() {
            this.setState({ formData: { ...this.props.initData } });
        }
     */
    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let val = e;
        let otherFields = ['emailDriver', 'sslTls'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

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
        let { emailDriver, emailFrom, emailAddress, smtpHost, smtpUsername, smtpPassword, smtpPort, sslTls } = this.state.formData;
        console.log(this.state.formData);
        // console.log(group);
        // let repassword = '';
        return (
            <>
                <div className="editForm" style={{ width: '800px', height: '700px' }}>
                    <form action="" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailFrom" className="control-label">
                                        Name
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailFrom" onChange={(e) => this.handleFieldChange(e, 'emailFrom')}
                                        placeholder="" name="emailFrom" required value={emailFrom || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailFrom" className="control-label">
                                        First Name
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailFrom" onChange={(e) => this.handleFieldChange(e, 'emailFrom')}
                                        placeholder="" name="emailFrom" required value={emailFrom || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        Bussiness
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        AddressLine 1
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        AddressLine 2
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        City
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        Zip Code
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        Country
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailAddress" className="control-label">
                                        Email
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="emailAddress" onChange={(e) => this.handleFieldChange(e, 'emailAddress')}
                                        placeholder="" name="emailAddress" required value={emailAddress || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpHost" className="control-label">
                                        Phone
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpHost" onChange={(e) => this.handleFieldChange(e, 'smtpHost')}
                                        placeholder="" name="smtpHost" required value={smtpHost || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpHost" className="control-label">
                                        State / Coutry
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpHost" onChange={(e) => this.handleFieldChange(e, 'smtpHost')}
                                        placeholder="" name="smtpHost" required value={smtpHost || ''} />
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

export default BillingInfo;