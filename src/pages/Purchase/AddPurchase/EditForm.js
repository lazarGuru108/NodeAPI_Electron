import React from 'react';
import 'antd/dist/antd.css';
import '../Purchase.scss';
import { Select, Button, Icon, Modal, Table } from 'antd';
import ProductTable from './ProductTable';
import productData from './productData.json';
import attachImage from '../../../assets/images/noimage.jpg';
import { Table as BTable } from 'react-bootstrap';

const { Option } = Select;
const dataSource = productData.tables;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStates: [
                { value: 'No Supplier', name: 'No Supplier' },
                { value: 'ghgf', name: 'ghgf', },
                { value: 'tahir', name: 'tahir', },
                { value: 'Hamza', name: 'Hamza', },
                { value: 'Future', name: 'Future', },
            ],
            addedDataSource: [],
            addedProduct: ''
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);

    }

    componentWillReceiveProps(props) {
        // this.setState({ formData: { ...props.initData } });
    }

    componentDidMount() {
        // this.setState({ formData: { ...this.props.initData } });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let that = this;
        if (field === 'addProduct') {
            // let productText = e;
            let productText = e.target.value;
            let tmpDataSource = dataSource.filter(row => {
                if (row.product.toLowerCase().indexOf(productText.toLowerCase()) > -1)
                    return row;
            });
            if (tmpDataSource.length === 1) {
                this.setState({ addedProduct: tmpDataSource[0].product });
                let added = this.state.addedDataSource;
                let isExist = false;
                added.map(row => {
                    if (row.product.toLowerCase().indexOf(tmpDataSource[0].product.toLowerCase()) > -1) isExist = true;
                })
                if (!isExist) {
                    Modal.confirm({
                        title: 'Confirm',
                        content: 'Do you want to add "'+ tmpDataSource[0].product +'" ?',
                        okText: 'Confirm',
                        cancelText: 'Cancel',
                        onOk() {
                            console.log('OK');
                            added.push(tmpDataSource[0]);
                            that.setState({ addedDataSource: added });
                        },
                    });

                }
                // this.setState({ addedDataSource: added });
                // this.setState({addedProduct: ''});
                // console.log(added);
            }
        }
        if (field === 'supplier') {
            // console.log(e);
        }
        /* let val = e;
        console.log(val,field);
        let otherFields = ['state', 'country', 'status'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

        this.setState({ formData: { ...formData, [field]: val } }, () => {
        }); */
    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
    }

    resetHandler() {
        this.setState({ formData: { stores: [] } });
    }

    render() {
        // let { uname, email, mobile, gtin, address, city,
        // state, country, storeSelect, stores, detail, status, order } = this.state.formData
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="cdate">Date <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="date" className="form-control" name="cdate" onChange={(e) => this.handleFieldChange(e, 'cdate')}
                                        name="cdate" />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="refno">Ref.No <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="text" className="form-control" name="refno" required onChange={(e) => this.handleFieldChange(e, 'refno')} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="notes">Notes:<i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <input type="textarea" className="form-control"
                                        onChange={(e) => { this.handleFieldChange(e, 'notes') }} name="notes" required />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
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
                        <div className="below">
                            <div className="form-group" style={{ paddingTop: "20px" }}>
                                <div className="row">
                                    <div className="col-3 title">
                                        <label htmlFor="uname">Supplier <i className="required">*</i></label>
                                    </div>
                                    <div className="col-7">
                                        <Select
                                            showSearch
                                            optionFilterProp="children"
                                            // defaultValue="AD - Andorra (+376)"
                                            placeholder="---Please Select---"
                                            /* onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur} */
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            name="supplier" onChange={(e) => { this.handleFieldChange(e, 'supplier') }}
                                        >
                                            {
                                                this.state.allStates.map((s, key) => (
                                                    <Option key={key} value={s.value}>{s.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-3 title">
                                        <label htmlFor="uname">Add Product <i className="required">*</i></label>
                                    </div>
                                    <div className="col-7">
                                        <div className="input-group wide-tip">
                                            <div className="input-group-addon paddinglr-10">
                                                <i className="fa fa-barcode addIcon fa-2x"></i>
                                            </div>
                                            <input type="text" name="addProduct" className="form-control input-lg" placeholder="Search Product"
                                                onChange={(e) => { this.handleFieldChange(e, 'addProduct') }} />
                                            {/* <Select
                                                showSearch
                                                optionFilterProp="children"
                                                // defaultValue="AD - Andorra (+376)"
                                                placeholder="Search Product"
                                                
                                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                name="supplier" onChange={(e) => { this.handleFieldChange(e, 'addProduct') }}
                                            >
                                                {
                                                    dataSource.map((row,key) => (
                                                        <Option key={key} value={row.product}>{row.product}</Option>
                                                    ))
                                                }
                                            </Select> */}
                                            <div className="input-group-addon paddinglr-10">
                                                <a id="add_new_product" href="product.php">
                                                    Register new Product
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="valid-feedback">Valid.</div>
                                    <div className="invalid-feedback">Please fill out this field.</div>
                                </div>
                            </div>
                            <div className="productTable">
                                <ProductTable dataSource={this.state.addedDataSource} />
                            </div>
                            <div className="productTable container-fluid">
                                <BTable responsive="md" striped bordered hover>
                                    <tbody>
                                        <tr className="grayBack">
                                            <td className="firstCol">Subtotal</td>
                                            <td className="secondCol"><label className="itemTotal" value="0.00"></label></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="grayBack">
                                            <td className="firstCol">Order Tax (%)</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="ordertax" onChange={(e) => { this.handleFieldChange(e, 'ordertax') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="grayBack">
                                            <td className="firstCol">Shipping Charge</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="shippingcharge" onChange={(e) => { this.handleFieldChange(e, 'shippingcharge') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="grayBack">
                                            <td className="firstCol">Other Charge</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="othercharge" onChange={(e) => { this.handleFieldChange(e, 'othercharge') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="grayBack">
                                            <td className="firstCol">Discount</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="discount" onChange={(e) => { this.handleFieldChange(e, 'discount') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="yellowBack">
                                            <td className="firstCol">Payable Amount</td>
                                            <td className="secondCol"><label className="itemTotal" value="0.00"></label></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="blueBack">
                                            <td className="firstCol">Payment Method</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="paymethod" onChange={(e) => { this.handleFieldChange(e, 'paymethod') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="blueBack">
                                            <td className="firstCol">Paid Amount	</td>
                                            <td className="secondCol"><input type="text" className="itemTotal" value="0.00" name="paidamount" onChange={(e) => { this.handleFieldChange(e, 'paidamount') }}></input></td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr>
                                            <td className="grayBack" style={{textAlign: "right"}}>Due Amount	</td>
                                            <td className="redBack"></td>
                                            <td className="grayBack"></td>
                                        </tr>
                                        <tr>
                                            <td className="grayBack" style={{textAlign: "right"}}>Change Amount	</td>
                                            <td className="greenBack"></td>
                                            <td className="grayBack"></td>
                                        </tr>
                                    </tbody>
                                </BTable>
                            </div>

                            <div className="form-group">
                                <div className="row" style={{justifyContent: "center"}}>
                                    <div className="col-2"></div>
                                    <div className="col-8 bottomright" style={{padding: "0 0 15px 0px", display: "flex",
                                    justifyContent: "center"}}>
                                        <Button type="primary" className="form-btn" onClick={this.saveHandler}><i className="fa fa-fw fa-save"></i>Save</Button>&nbsp;&nbsp;&nbsp;
                                        <Button type="primary" className="form-btn" onClick={this.resetHandler}><span className="fa fa-fw fa-circle-o"></span>Reset</Button>
                                    </div>
                                    <div className="col-2"></div>
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