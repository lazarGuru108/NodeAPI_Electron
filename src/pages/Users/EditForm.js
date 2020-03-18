import React from 'react';
import 'antd/dist/antd.css';
import './ManageUsers.scss';
import { Select, Button, Icon } from 'antd';
import noImage from '../../assets/images/noimage.jpg'
import { Link } from 'react-router-dom';

const { Option } = Select;

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
            allGroups: [
                { value: 'group1', name: 'group1' },
                { value: 'group2', name: 'group2' },
                { value: 'group3', name: 'group3' },
            ],
            
            formData: { stores: [] }
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
        let otherFields = ['group', 'status'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

        if (field === 'storeSelect') {
            val = e.target.checked;
            let stores = val ? this.state.allStores : [];
            console.log(val, stores);
            formData.storeSelect = val;
            formData.stores = stores;
            this.setState({ formData }, () => {
                console.log(this.state.formData);
            });
        }
        if (field === 'stores') {

            val = e.target.checked;
            let stores = this.state.formData.stores || [];
            if (!val) {
                stores = stores.filter((ss) => ss !== s);
            } else {
                stores.push(s);
            }
            val = stores;
        }

        this.setState({ formData: { ...formData, [field]: val } }, () => {console.log(field,val);
        });
    }

    handleSearchStore = (e) => {
        let val = e.target.value;

    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
    }

    resetHandler() {
        this.setState({ formData: { stores: [] } });
    }

    render() {
        let { uname, email, mobile,group, password, repassword,
            storeSelect, stores, status, order } = this.state.formData;
        // console.log(group);
        // let repassword = '';
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label >Thumbnail </label>
                                </div>
                                <div className="col-7">
                                    <Link>
                                        <img src={noImage} />
                                    </Link>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
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
                                    <label htmlFor="password">Password <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="password" className="form-control" required
                                        value={password || ''}
                                        name="password" onChange={(e) => { this.handleFieldChange(e, 'password') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="repassword">Retype Password <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="password" className="form-control" required
                                        value={repassword || ''}
                                        name="repassword" onChange={(e) => { this.handleFieldChange(e, 'repassword') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Group </label>
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
                                    <label htmlFor="uname">Date of Birth </label>
                                </div>
                                <div className="col-7">
                                    <input type="date" className="form-control" required
                                        /* value={city || ''} */ defaultValue="2020-01-01"
                                        name="birth" onChange={(e) => { this.handleFieldChange(e, 'birth') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
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
                                            checked={storeSelect || false}
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
                                    <label htmlFor="uname">Status <i className="required">*</i></label>
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
                                        value={status || 'Active'}
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
                                    <label htmlFor="uname">Order <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="number" className="form-control" required
                                        value={order || ''}
                                        name="order" onChange={(e) => { this.handleFieldChange(e, 'order') }} />
                                </div>
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

export default EditForm;