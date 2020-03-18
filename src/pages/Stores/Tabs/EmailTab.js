import React from 'react';
import 'antd/dist/antd.css';
import '../ManageStores.scss';
import { Select, Button, Icon, Input } from 'antd';
import noImage from '../../../assets/images/noimage.jpg'
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

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
        let val = e;
        let otherFields = ['emailDriver','sslTls'];
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
        let { emailDriver, emailFrom, emailAddress,smtpHost,smtpUsername,smtpPassword,smtpPort,sslTls } = this.state.formData;
        console.log(this.state.formData);
        // console.log(group);
        // let repassword = '';
        return (
            <>
                <div className="editForm">
                    <form action="" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailFrom" className="control-label">
                                        Email From<i className="required">*</i>
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
                                        Email Address<i className="required">*</i>
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
                                    <label htmlFor="emailDriver" className="control-label">
                                        Email Driver<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={emailDriver}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={emailDriver || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="emailDriver" onChange={(e) => { this.handleFieldChange(e, 'emailDriver') }}
                                    >
                                        <Option key={0} value='function'>Use built in php mail() function</Option>
                                        <Option key={1} value='server'>Send email through SMTP Server</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpHost" className="control-label">
                                        SMTP Host<i className="required">*</i>
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
                                    <label htmlFor="smtpUsername" className="control-label">
                                        SMTP Username<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpUsername" onChange={(e) => this.handleFieldChange(e, 'smtpUsername')}
                                        placeholder="" name="smtpUsername" required value={smtpUsername || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpPassword" className="control-label">
                                        SMTP Password<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpPassword" onChange={(e) => this.handleFieldChange(e, 'smtpPassword')}
                                        placeholder="" name="smtpPassword" required value={smtpPassword || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpPort" className="control-label">
                                        SMTP Port<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpPort" onChange={(e) => this.handleFieldChange(e, 'smtpPort')}
                                        placeholder="" name="smtpPort" required value={smtpPort || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sslTls" className="control-label">
                                        SSL/TLS<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={sslTls}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={sslTls || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="sslTls" onChange={(e) => { this.handleFieldChange(e, 'sslTls') }}
                                    >
                                        <Option key={0} value='function'>Use built in php mail() function</Option>
                                        <Option key={1} value='server'>Send email through SMTP Server</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-12 col-md-3 col-sm-12 title">
                                    {/* <label htmlFor="uname">Order <i className="required">*</i></label> */}
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="primary" className="form-btn" onClick={this.saveHandler}><Icon type="save" />Save</Button>
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="primary" className="form-btn" onClick={this.resetHandler}><Icon type="sync" />Reset</Button>
                                </div>                                
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default EmailTab;