import React from 'react';
import 'antd/dist/antd.css';
import '../ManageStores.scss';
import { Select, Button, Icon, Input } from 'antd';
import noImage from '../../../assets/images/noimage.jpg'
import { Link } from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

class GneralTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCurrencys: [
                'currency 1',
                'currency 2',
                'currency 3',
                'currency 4',
            ],
            allPayMethods: [
                'Cash on Delivery',
                'Bkash',
                'Gift card',
            ],
            allGroups: [
                { value: 'group1', name: 'group1' },
                { value: 'group2', name: 'group2' },
                { value: 'group3', name: 'group3' },
            ],
            allCountry: [
                { value: 'AD - Andorra (+376)', name: 'AD - Andorra (+376)' },
                { value: 'AE - United Arab Emirates (+971)', name: 'AE - United Arab Emirates (+971)' },
                { value: 'Yiminghe', name: 'yiminghe' },
            ],

            formData: { currencys: [], paymethod: [] }
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
        let otherFields = ['group', 'soundeffect', 'country', 'editlifespanunit', 'deletelifespanunit', 'aftersellpage', 'remote_printing', 'receipt_printer', 'auto_print_receipt'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

        if (field === 'currencySelect') {
            val = e.target.checked;
            let currencys = val ? this.state.allCurrencys : [];
            console.log(val, currencys);
            formData.currencySelect = val;
            formData.currencys = currencys;
            this.setState({ formData }, () => {
                console.log(this.state.formData);
            });
        }
        if (field === 'currencys') {

            val = e.target.checked;
            let currencys = this.state.formData.currencys || [];
            if (!val) {
                currencys = currencys.filter((ss) => ss !== s);
            } else {
                currencys.push(s);
            }
            val = currencys;
        }

        if (field === 'paymethodSelect') {
            val = e.target.checked;
            let paymethod = val ? this.state.allPayMethods : [];
            console.log(val, paymethod);
            formData.paymethodSelect = val;
            formData.paymethod = paymethod;
            this.setState({ formData }, () => {
                console.log(this.state.formData);
            });
        }
        if (field === 'paymethod') {

            val = e.target.checked;
            let paymethod = this.state.formData.paymethod || [];
            if (!val) {
                paymethod = paymethod.filter((ss) => ss !== s);
            } else {
                paymethod.push(s);
            }
            val = paymethod;
        }

        this.setState({ formData: { ...formData, [field]: val } }, () => {
            console.log(field, val);
        });
    }

    handleSearchCurrency = (e) => {
        let val = e.target.value;

    }

    handleSearchPaymethod = (e) => {
        let val = e.target.value;

    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
    }

    resetHandler() {
        this.setState({ formData: { currencys: [], paymethod: [] } });
    }

    render() {
        let { uname, email, country, mobile, group, zipcode, address, vatreg, editlifespan, editlifespanunit, deletelifespan, deletelifespanunit,
            aftersellpage, tax, quantity, limit, remote_printing, receipt_printer, auto_print_receipt, paymethod,paymethodSelect, invoiceText, soundeffect, currencySelect, currencys } = this.state.formData;
        console.log(this.state.formData);
        // console.log(group);
        // let repassword = '';
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Name <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="uname" onChange={(e) => this.handleFieldChange(e, 'uname')}
                                        placeholder="Enter username" name="uname" required value={uname || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Code Name <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="codename" required onChange={(e) => this.handleFieldChange(e, 'uname')}
                                        value={uname || ''} placeholder="Code Name" />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Country </label>
                                </div>
                                <div className="col-md-7 col-12">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="AD - Andorra (+376)"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={country || ''}
                                        name="country" onChange={(e) => { this.handleFieldChange(e, 'country') }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            this.state.allCountry.map((c, key) => (
                                                <Option key={key} value={c.value}>{c.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Mobile <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required
                                        value={mobile || ''}
                                        name="mobile" onChange={(e) => { this.handleFieldChange(e, 'mobile') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Email:<i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="email" className="form-control" name="email"
                                        value={email || ''}
                                        onChange={(e) => { this.handleFieldChange(e, 'email') }} placeholder="Enter Email" name="uname" required />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Zip Code <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required
                                        value={zipcode || ''}
                                        name="zipcode" onChange={(e) => { this.handleFieldChange(e, 'zipcode') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Address <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <TextArea rows={3} className="form-control" required
                                        value={address || ''}
                                        name="address" onChange={(e) => { this.handleFieldChange(e, 'address') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">VAT Reg. No. </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required
                                        value={vatreg || ''}
                                        name="vatreg" onChange={(e) => { this.handleFieldChange(e, 'vatreg') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Cash Name <i className="required">*</i></label>
                                </div>
                                <div className="col-md-7 col-12">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={group}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        // value={state || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="group" onChange={(e) => { this.handleFieldChange(e, 'group') }}
                                    >
                                        {
                                            this.state.allGroups.map((s, key) => (
                                                <Option key={key} value={s.value}>{s.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Time Zone <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={group}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        // value={state || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="group" onChange={(e) => { this.handleFieldChange(e, 'group') }}
                                    >
                                        {
                                            this.state.allGroups.map((s, key) => (
                                                <Option key={key} value={s.value}>{s.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="invoice_edit_lifespan" className="control-label">
                                        Invoice Edit Lifespan<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input type="number" className="form-control" required
                                        value={editlifespan || ''}
                                        name="editlifespan" onChange={(e) => { this.handleFieldChange(e, 'editlifespan') }} />
                                </div>
                                <div className="col-3">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={editlifespanunit}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={editlifespanunit || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="editlifespanunit" onChange={(e) => { this.handleFieldChange(e, 'editlifespanunit') }}
                                    >
                                        <Option key={0} value='minute'>Minute</Option>
                                        <Option key={1} value='second'>Second</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="invoice_delete_lifespan" className="control-label">
                                        Invoice Delete Lifespan<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-4">
                                    <input type="number" className="form-control" required
                                        value={deletelifespan || ''}
                                        name="editlifespan" onChange={(e) => { this.handleFieldChange(e, 'deletelifespan') }} />
                                </div>
                                <div className="col-3">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={deletelifespanunit}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={deletelifespanunit || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="deletelifespanunit" onChange={(e) => { this.handleFieldChange(e, 'deletelifespanunit') }}
                                    >
                                        <Option key={0} value='minute'>Minute</Option>
                                        <Option key={1} value='second'>Second</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="aftersellpage" className="control-label">
                                        After Sell Page<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={aftersellpage}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={aftersellpage || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="aftersellpage" onChange={(e) => { this.handleFieldChange(e, 'aftersellpage') }}
                                    >
                                        <Option key={0} value='pos'>POS</Option>
                                        <Option key={1} value='invoice'>Invoice</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="remote_printing" className="control-label">
                                        POS Printing<i className="required">*</i>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue={remote_printing}
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={remote_printing || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="remote_printing" onChange={(e) => { this.handleFieldChange(e, 'remote_printing') }}
                                    >
                                        <Option key={0} value='browser'>Web Browser</Option>
                                        <Option key={1} value='server'>PHP Server</Option>
                                    </Select>
                                    <div className="well wel-sm">
                                        <i>For local single machine installation: PHP Server will be the best choice and for live server or local server setup (LAN): you can install PHP Pos Print Server locally on each machine (recommended) or use web browser printing feature.</i>
                                    </div>
                                    <div className="well wel-sm">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <label htmlFor="receipt_printer" className="control-label">
                                                        Receipt Printer
                                                </label>
                                                    <div>
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="children"
                                                            defaultValue={receipt_printer}
                                                            /* onChange={handleChange}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur} */
                                                            value={receipt_printer || ''}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            name="receipt_printer" onChange={(e) => { this.handleFieldChange(e, 'receipt_printer') }}
                                                        >
                                                            <Option key={0} value='epson4'>epson4</Option>
                                                            <Option key={1} value='printer1'>printer1</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <label htmlFor="auto_print_receipt" className="control-label">
                                                        Auto Print Receipt
                                                </label>
                                                    <div>
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="children"
                                                            defaultValue={auto_print_receipt}
                                                            /* onChange={handleChange}
                                                            onFocus={handleFocus}
                                                            onBlur={handleBlur} */
                                                            value={auto_print_receipt || ''}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            name="auto_print_receipt" onChange={(e) => { this.handleFieldChange(e, 'auto_print_receipt') }}
                                                        >
                                                            <Option key={0} value='yes'>Yes</Option>
                                                            <Option key={1} value='no'>No</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="tax" className="control-label">
                                        TAX
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required
                                        value={tax || ''}
                                        name="tax" onChange={(e) => { this.handleFieldChange(e, 'tax') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="quantity" className="control-label">
                                        Stock Alert Quantity<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required
                                        value={quantity || ''}
                                        name="quantity" onChange={(e) => { this.handleFieldChange(e, 'quantity') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="limit" className="control-label">
                                        Datatable Item Limit<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required
                                        value={limit || ''}
                                        name="limit" onChange={(e) => { this.handleFieldChange(e, 'limit') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="text" className="control-label">
                                        Invoice Footer Text<i className="required">*</i>
                                        <span data-toggle="tooltip" title="" data-original-title="After this time you won't be able to delete invoice.">
                                        </span>
                                    </label>
                                </div>
                                <div className="col-7">
                                    <TextArea rows={3} className="form-control" required
                                        value={invoiceText || ''}
                                        name="text" onChange={(e) => { this.handleFieldChange(e, 'invoiceText') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Sound Effect </label>
                                </div>
                                <div className="col-7">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="Active"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={soundeffect || 'Active'}
                                        name="soundeffect" onChange={(e) => { this.handleFieldChange(e, 'soundeffect') }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="Active">Active</Option>
                                        <Option value="Inactive">Inactive</Option>
                                    </Select>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="currency">Currency <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <label className="form-check-label" >
                                        <input type="checkbox" className="form-check-input" required
                                            checked={currencySelect || false}
                                            name="currencySelect" onChange={(e) => { this.handleFieldChange(e, 'currencySelect') }} />
                                        <span>select/deselect</span>
                                    </label>
                                    <div>
                                        <input type="text" className="form-control" required name="searchCurrency"
                                            onChange={(e) => { this.handleSearchCurrency(e) }} />
                                    </div>
                                    <div className="form-check-fields" style={{ background: '#f5f5f5', padding: '15px 0px 0px' }}>
                                        {
                                            this.state.allCurrencys.map((s, key) => {

                                                let isSelected = currencys.indexOf(s) > -1;
                                                return (
                                                    <div key={key}>
                                                        <label className="form-check-label" >
                                                            <input type="checkbox" className="form-check-input" required checked={isSelected}
                                                                name="currencys" onChange={(e) => { this.handleFieldChange(e, 'currencys', s) }}
                                                            /><span>{s}</span>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="paymethod">Payment Method <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <label className="form-check-label" >
                                        <input type="checkbox" className="form-check-input" required
                                            checked={paymethodSelect || false}
                                            name="paymethodSelect" onChange={(e) => { this.handleFieldChange(e, 'paymethodSelect') }} />
                                        <span>select/deselect</span>
                                    </label>
                                    <div>
                                        <input type="text" className="form-control" required name="searchPaymethod"
                                            onChange={(e) => { this.handleSearchPaymethod(e) }} />
                                    </div>
                                    <div className="form-check-fields" style={{ background: '#f5f5f5', padding: '15px 0px 0px' }}>
                                        {
                                            this.state.allPayMethods.map((s, key) => {

                                                let isSelected = paymethod.indexOf(s) > -1;
                                                return (
                                                    <div key={key}>
                                                        <label className="form-check-label" >
                                                            <input type="checkbox" className="form-check-input" required checked={isSelected}
                                                                name="paymethod" onChange={(e) => { this.handleFieldChange(e, 'paymethod', s) }}
                                                            /><span>{s}</span>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
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

export default GneralTab;