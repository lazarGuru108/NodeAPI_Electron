import React from 'react';
import 'antd/dist/antd.css';
import './StockTransfer.scss';
import { Select, Button, Icon, Input } from 'antd';
import attachImage from '../../assets/images/noimage.jpg';
import { Table } from 'react-bootstrap';

const { Option } = Select;
const { TextArea } = Input;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allStatus: [
                { value: 'sent', name: 'Sent' },
                { value: 'pending', name: 'Pending' },
            ],
            allStores: [
                { value: 'store01', name: 'Store01' },
                { value: 'store02', name: 'Store02' },
                { value: 'extra', name: 'Toko Laku Terus' },
            ],
            stockList: [
                { itemName: 'Sandwitch', invoiceId: 'B665', badgeNum: '45', transferQty: 0 },
                { itemName: 'Banana', invoiceId: 'B564564', badgeNum: '15', transferQty: 0 },
                { itemName: 'Berger Small', invoiceId: ' Blk;;', badgeNum: '112', transferQty: 0 },
                { itemName: 'maida', invoiceId: 'S345', badgeNum: '21', transferQty: 0 },
                { itemName: 'Chocolets', invoiceId: 'DF1434', badgeNum: '34', transferQty: 0 },
            ],
            addedTransfer: false,       //if Transfer List will be showed ?
            transferQty: '',
            searchStock: '',
            stockListTmp: [],
            formData: {}
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);

    }

    componentWillReceiveProps(props) {
        let addedTransfer = this.state.addedTransfer;
        let stockList = this.state.stockList;
        stockList.map((item, key) => {
            if(item.transferQty) addedTransfer = true;
            stockList[key].transferQty = 0;
        });
        this.setState({ formData: { ...props.initData },stockList: stockList, stockListTmp: this.state.stockList, addedTransfer: addedTransfer });
    }

    componentDidMount() {
        let addedTransfer = this.state.addedTransfer;
        let stockList = this.state.stockList;
        stockList.map((item, key) => {
            if(item.transferQty) addedTransfer = true;
            stockList[key].transferQty = 0;
        });
        this.setState({ formData: { ...this.props.initData },stockList: stockList, stockListTmp: this.state.stockList, addedTransfer: addedTransfer });
    }

    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let val = e;
        let otherFields = ['state', 'toStore', 'status'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

        this.setState({ formData: { ...formData, [field]: val } }, () => {
        });
    }

    changeSearchStock = (e) => {
        let val = e.target.value;
        let stockList = this.state.stockList;
        let stockListTmp = [];
        stockList.map((item, key) => {
            item.itemName.toLowerCase().indexOf(val.toLowerCase()) > -1 && stockListTmp.push(item);
        })
        this.setState({searchStock: val, stockListTmp: stockListTmp });
    }

    changeQty = (e, key) => {
        let stockList = this.state.stockList;
        stockList[key].transferQty = e.target.value;
        this.setState({stockList: stockList});
    }

    onDeleteItem = (e, key) => {
        let stockList = this.state.stockList;
        stockList[key].transferQty = 0;
        this.setState({stockList: stockList});
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

    onClickStockItem = (e, item, key) => {
        console.log(item, key);
        let stockList = this.state.stockList;
        stockList[key].transferQty++;
        console.log(stockList);
        this.setState({ stockList: stockList, addedTransfer: true });
    }

    render() {
        let { from, notes, status, toStore, refNo } = this.state.formData;
        let { stockList, stockListTmp, addedTransfer, searchStock } = this.state;
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="attachment">Attachment </label>
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
                                    <label htmlFor="refNo">Ref. No. </label>
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
                                    <label htmlFor="sel1">Status <i className="required">*</i></label>
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
                                        value={status || ''}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        name="status" onChange={(e) => { this.handleFieldChange(e, 'status') }}
                                    >
                                        {
                                            this.state.allStatus.map((s, key) => (
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
                                    <label htmlFor="notes">Notes </label>
                                </div>
                                <div className="col-7">
                                    <TextArea rows={3} className="form-control" required
                                        value={notes || ''}
                                        name="notes" onChange={(e) => { this.handleFieldChange(e, 'notes') }} />
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="from">From <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <label>{from} </label>
                                    {/* <input type="text" className="form-control" name="from" onChange={(e) => this.handleFieldChange(e, 'from')}
                                        placeholder="" name="from" required value={from || ''} /> */}
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="toStore">To <i className="required">*</i></label>
                                </div>
                                <div className="col-md-7 col-12">
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        defaultValue="AD - Andorra (+376)"
                                        /* onChange={handleChange}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} */
                                        value={toStore || ''}
                                        name="toStore" onChange={(e) => { this.handleFieldChange(e, 'toStore') }}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            this.state.allStores.map((c, key) => (
                                                <Option key={key} value={c.value}>{c.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", padding: "15px 5px" }}>
                            <div className="col-md-6 col-12 col-sm-12 left">
                                <h5><i>Stock List</i></h5>
                                <input type="text" className="form-control" name="searchStock" onChange={(e) => this.changeSearchStock(e)}
                                    placeholder="Search" name="searchStock" required value={searchStock || ''} />
                                <div className="search-list-container">
                                    <div className="search-list">
                                        {
                                            stockListTmp.map((item, key) => (
                                                <div key={key} className="stock-item" onClick={(e) => this.onClickStockItem(e, item, key)}>
                                                    <label>
                                                        -- {item.itemName},InvoiceId:{item.invoiceId},Stock:
                                                        <span className="badge badge-info">{item.badgeNum}</span>
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 col-sm-12 right">
                                <h5><i>Transfer List</i></h5>
                                {/* <input type="text" className="form-control" name="refNo" onChange={(e) => this.handleFieldChange(e, 'refNo')}
                                        placeholder="Search" name="refNo" required value={refNo || ''} />*/}
                                <div className="transfer-list-container">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th className="h-w-45">Item Name</th>
                                                <th className="h-w-25">Invoice Id</th>
                                                <th className="h-w-25">Transfer Qty.</th>
                                                <th className="h-w-5"><span className="fa fa-trash"></span></th>
                                            </tr>
                                        </thead>
                                    </Table>
                                    {addedTransfer && 
                                    <Table responsive="md" striped bordered hover>
                                        <tbody>
                                            {
                                                stockList.map((item, key) => (
                                                    item.transferQty ?
                                                    <tr key={key}>
                                                        <td className="w-45 transfer-list">{item.itemName}</td>
                                                        <td className="w-25 transfer-list">{item.invoiceId}</td>
                                                        <td className="w-25 transfer-list">
                                                            <input type="text" style={{ width: "100%" }} value={item.transferQty} name="transferQty" 
                                                                onChange={(e) => { this.changeQty(e, key) }} 
                                                            />
                                                        </td>
                                                        <td className="w-5 transfer-list">
                                                            <span className="fa fa-close pointer" style={{color: "red"}} onClick={(e) => this.onDeleteItem(e, key)}/>
                                                        </td>
                                                    </tr>
                                                    :
                                                    null
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    }
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
                                    <Button type="primary" onClick={this.saveHandler}><span className="fa fa-fw fa-car"></span>Transfer Now</Button>&nbsp;&nbsp;&nbsp;
                                        <Button type="primary" onClick={this.resetHandler} style={{ background: "#E08E0B" }}><span className="fa fa-fw fa-circle-o"></span>Reset</Button>
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