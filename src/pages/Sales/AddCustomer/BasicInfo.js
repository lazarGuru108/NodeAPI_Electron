import React from 'react';
import 'antd/dist/antd.css';
import { Select, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class BasicInfo extends React.Component {
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
                                    <label htmlFor="assign" className="control-label">
                                        Assign to a group
                                    <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        // defaultValue={emailDriver}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        // value={emailDriver || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="assign" onChange={(e) => { this.handleFieldChange(e, 'assign') }}
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
                                    <label htmlFor="emailAddress" className="control-label">
                                        Phone
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
                                        Birth Date
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
                                        State
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
                                        Postcode
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
                                    <label htmlFor="uname">Description </label>
                                </div>
                                <div className="col-7">
                                    <TextArea rows={3} className="form-control" required
                                        // value={detail||''}
                                        name="detail" onChange={(e) => { this.handleFieldChange(e, 'detail') }}
                                    />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="emailDriver" className="control-label">
                                        Authorized Credit
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
                                    <label>Allows you to enable credit payments for the customer.</label>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="smtpHost" className="control-label">
                                        Credit limit
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="smtpHost" onChange={(e) => this.handleFieldChange(e, 'smtpHost')}
                                        placeholder="" name="smtpHost" required value={smtpHost || ''} />
                                    <label>Allows you to limit the credit. 0 for unlimited credit.</label>
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

export default BasicInfo;