import React from 'react';
import 'antd/dist/antd.css';
import './StockTransfer.scss';
import { Select, Button, Icon, Input } from 'antd';
import attachImage from '../../assets/images/noimage.jpg';

const { Option } = Select;
const { TextArea } = Input;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStates: [
                { value: 'sent', name: 'Sent' },
                { value: 'pending', name: 'Pending' },
            ],
            allCountry: [
                { value: 'store01', name: 'Store01' },
                { value: 'store02', name: 'Store02' },
                { value: 'extra', name: 'Toko Laku Terus' },
            ],
            formData: {}
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);

    }

    componentWillReceiveProps(props) {
        this.setState({ formData: { ...props.initData } });
    }

    componentDidMount() {
        // console.log(this.props.initData);
        let initData = { ...this.props.initData }
        console.log(initData);
        // this.setState({formData: {...this.props.initData }});
        this.setState({ formData: initData });
    }

    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let val = e;
        let otherFields = ['state', 'country', 'status'];
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

        this.setState({ formData: { ...formData, [field]: val } }, () => {
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
        this.setState({ formData: {} });
    }

    render() {
        let { uname, address, state, country, refNo } = this.state.formData
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Attachment <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <div>
                                        <a><img src={attachImage} /></a>
                                    </div>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="refNo">Ref. No. <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="refNo" onChange={(e) => this.handleFieldChange(e, 'refNo')}
                                        placeholder="Enter username" name="refNo" required value={refNo || ''} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="sel1">Status </label>
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
                                        value={state || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="state" onChange={(e) => { this.handleFieldChange(e, 'state') }}
                                    >
                                        {
                                            this.state.allStates.map((s, key) => (
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
                            <div className="row" style={{ justifyContent: "center" }}>
                                <div className="col-2"></div>
                                <div className="col-8 bottomright" style={{
                                    padding: "0 0 15px 0px", display: "flex",
                                    justifyContent: "center"
                                }}>
                                    <Button type="primary" onClick={this.saveHandler}><span class="fa fa-fw fa-car"></span>Transfer Now</Button>&nbsp;&nbsp;&nbsp;
                                        <Button type="primary" onClick={this.resetHandler} style={{background: "#E08E0B"}}><span className="fa fa-fw fa-circle-o"></span>Reset</Button>
                                </div>
                                <div className="col-2"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default EditForm;