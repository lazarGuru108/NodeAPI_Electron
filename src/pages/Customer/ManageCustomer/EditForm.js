import React from 'react';
import 'antd/dist/antd.css';
import './ManageCustomer.scss';
import { Select, Button, Icon, Input } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStores: [
                'store 1',
                'store 2',
                'store 3',
                'store 4',
            ],
            allStates: [
                { value: 'jack', name: 'Andaman & Nicobar'},
                { value: 'lucy', name: 'Arunachal Pradesh'},
                { value: 'Yiminghe', name: 'Assam'},
            ],
            allCountry: [
                { value: 'AD - Andorra (+376)', name: 'AD - Andorra (+376)'},
                { value: 'AE - United Arab Emirates (+971)', name: 'AE - United Arab Emirates (+971)'},
                { value: 'Yiminghe', name: 'yiminghe'},
            ],
            allSex: [
                {value: 'Male', name: 'Male'},
                {value: 'Female', name: 'Female'}
            ],
            formData: {stores: []}
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);

    }

    componentWillReceiveProps(props) {
        this.setState({formData: {...props.initData}});
    }

    componentDidMount() {
        this.setState({formData: {...this.props.initData }});
    }

    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s=undefined) => {
        let val = e;
        let otherFields = ['state', 'country', 'status', 'sex'];
        let formData = this.state.formData;
        if(otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }
        
        if(field === 'storeSelect') {
           val = e.target.checked;
           let stores = val?this.state.allStores:[];
           console.log(val, stores);
           formData.storeSelect = val;
           formData.stores = stores;
           this.setState({ formData }, ()=>{
               console.log(this.state.formData);
           });
        }
        if(field === 'stores') {
            
            val = e.target.checked;
            let stores = this.state.formData.stores || [];
            if(!val) {
                stores = stores.filter((ss)=>ss!== s);
            }else{
                stores.push(s);
            }
            val = stores;
        }
        
        this.setState({ formData: {...formData, [field]: val}}, ()=>{
        });
    }

    handleSearchStore = (e)=>{
        let val = e.target.value;

    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
        console.log(this.state.formData);
    }

    resetHandler () {
        this.setState({formData: {stores: []}});
    }

    render() {
        let { uname, email, phone, gtin, address, city, 
            state, country, storeSelect, stores, balance, status, order, sex, age} = this.state.formData
            console.log(stores);
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
                                        placeholder="Enter username" name="uname" required  value={uname||''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="balance">Credit Balance </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="balance" required onChange={(e) => this.handleFieldChange(e, 'balance')} 
                                    value={balance||''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Phone </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required 
                                    value={phone||''}
                                    name="phone" onChange={(e) => { this.handleFieldChange(e, 'phone') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Date of Birth </label>
                                </div>
                                <div className="col-7">
                                    <input type="date" className="form-control" name="codename" required defaultValue={null} /* onChange={(e) => this.handleFieldChange(e, 'uname')}  */
                                    /* value={uname||''} */ />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Email:</label>
                                </div>
                                <div className="col-7">
                                    <input type="email" className="form-control" name="email" 
                                    value={email||''}
                                    onChange={(e) => { this.handleFieldChange(e, 'email') }} placeholder="Enter Email" name="uname" required />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Sex </label>
                                </div>
                                <div className="col-md-7 col-12">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="AD - Andorra (+376)"
                                        defaultValue="lucy"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={sex||''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="state" onChange={(e) => { this.handleFieldChange(e, 'sex') }}
                                    >
                                        {
                                            this.state.allSex.map((s, key)=>(
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
                                    <label htmlFor="uname">Age </label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required 
                                    value={age||''}
                                    name="age" onChange={(e) => { this.handleFieldChange(e, 'age') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Gtin </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required 
                                    value={gtin||''}
                                    name="gtin" onChange={(e) => { this.handleFieldChange(e, 'gtin') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Address </label>
                                </div>
                                <div className="col-7">
                                    <TextArea rows={3} className="form-control" required 
                                    value={address||''}
                                    name="address" onChange={(e) => { this.handleFieldChange(e, 'address') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">City </label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" required 
                                    value={city||''}
                                    name="city" onChange={(e) => { this.handleFieldChange(e, 'city') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">State <i className="required">*</i></label>
                                </div>
                                <div className="col-md-7 col-12">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="AD - Andorra (+376)"
                                        defaultValue="lucy"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={state||''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="state" onChange={(e) => { this.handleFieldChange(e, 'state') }}
                                    >
                                        {
                                            this.state.allStates.map((s, key)=>(
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
                                        value={country||''}
                                        name="country" onChange={(e) => { this.handleFieldChange(e, 'country') }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            this.state.allCountry.map((c, key)=>(
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
                                    <label htmlFor="uname">Store <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <label className="form-check-label" >
                                        <input type="checkbox" className="form-check-input" required 
                                        checked={storeSelect||false}
                                        name="storeSelect" onChange={(e) => { this.handleFieldChange(e, 'storeSelect') }} />
                                        <span>select/deselect</span>
                                    </label>
                                    <div>
                                        <input type="text" className="form-control" required name="searchStore" 
                                        onChange={(e) => { this.handleSearchStore(e) }} />
                                    </div>
                                    <div className="form-check-fields" style={{ background: '#f5f5f5', padding: '15px 0px 0px' }}>
                                        {
                                            this.state.allStores.map((s, key) => {
                                                
                                                let isSelected = stores.indexOf(s) > -1;
                                               return (
                                                <div key={key}>
                                                    <label className="form-check-label" >
                                                        <input type="checkbox" className="form-check-input" required checked={isSelected}
                                                            name="stores" onChange={(e) => { this.handleFieldChange(e, 'stores', s) }}
                                                            
                                                    /><span style={{color:"#555"}}>{s}</span>
                                                    </label>
                                                </div>
                                                )}
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
                                    <label htmlFor="uname">Status </label>
                                </div>
                                <div className="col-7">
                                    {/* <input type="text" className="form-control" required /> */}

                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="Active"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={status||'Active'}
                                        name="status" onChange={(e) => { this.handleFieldChange(e, 'status') }}
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
                                    <label htmlFor="uname">Order </label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required 
                                    value={order||''}
                                    name="order" onChange={(e) => { this.handleFieldChange(e, 'order') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    {/* <label htmlFor="uname">Order <i className="required">*</i></label> */}
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="primary" className="form-btn" onClick={this.saveHandler}><Icon type="save" />Save</Button>
                                </div>
                                <div className="col-12 col-md-1 col-sm-12">
                                    <Button type="danger" className="form-btn" onClick={this.resetHandler}><Icon type="sync" />Reset</Button>
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

export default EditForm;