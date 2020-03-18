// @flow
import React from 'react';
import 'antd/dist/antd.css';
import { Table as BTable } from 'react-bootstrap';
import './Sales.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { Button, Tabs, Select, Input } from 'antd';
import TableView from './TableView';



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BasicInfo from './AddCustomer/BasicInfo';
import ShippingInfo from './AddCustomer/ShippingInfo';
import BillingInfo from './AddCustomer/BillingInfo';

const { Option } = Select;
const TabPane = Tabs.TabPane;
class Sales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openAddCustomer: false,
        }
    }

    onAddCustomer = () => {
        this.setState({ openAddCustomer: true });
        console.log(this.state.openAddCustomer);
    }
    handleClose = () => {
        this.setState({ openAddCustomer: false });
        console.log('sdfwe');
    };

    callback = (key) => {
        console.log(key);
    }

    render() {
        let { openAddCustomer } = this.state;
        return (
            // <div className="container-fluid">
            <div className="row" id="sales" style={{ height: '100%'}}>
                <Dialog
                    open={openAddCustomer}
                    onClose={() => this.handleClose}
                    scroll="paper"
                    disableBackdropClick={true}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                    <DialogContent dividers={true}
                        children="<Button>Button</Button>"
                    >
                        <div className="dialogContent">
                            <input type="text" className="form-control" name=""/*  onChange={(e) => this.handleFieldChange(e, 'emailFrom')} */
                                        placeholder="CustomeName" required /* value={emailFrom || ''}  *//>
                            <label>You must provide a name to the customer.</label>
                            <Tabs defaultActiveKey="1" onChange={() => this.callback()}>
                                <TabPane tab="Basic Information" key="1">
                                    <BasicInfo />
                                </TabPane>
                                <TabPane tab="Billing Information" key="2"><BillingInfo /></TabPane>
                                <TabPane tab="Shipping Inforamtion" key="3"><ShippingInfo /></TabPane>
                            </Tabs>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()}>Close</Button>
                        <Button onClick={() => this.handleClose()}>Add Customer</Button>
                    </DialogActions>
                </Dialog>
                <div className="col-md-6 col-6 col-sm-6 p-2 pr-1">
                    <div className="left" style={{ background: 'rgb(240, 242, 245)', height: '100%' }}>
                        <div className="container" style={{ height: "100%" }}>
                            <div className="row">
                                <div className="input-group"
                                    style={{ justifyContent: "center", padding: "20px" }}>
                                    <Select
                                        style={{ width: "49%" }}
                                        showSearch
                                        placeholder="Select a person"
                                        optionFilterProp="children"
                                        /* onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch} */
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                    <Button.Group>
                                        <Button onClick={() => this.onAddCustomer()}>
                                            <i className="fa fa-user"></i>
                                            Add Customer
                                        </Button>
                                        <Button /* type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }} */>
                                            <i className="fa fa-pencil"></i>
                                            Note
                                        </Button>
                                        <Button >
                                            <i className="fa fa-truck"></i>
                                            Shipping
                                        </Button>
                                        <Button >
                                            <i className="fa fa-plus"></i>
                                            Item
                                        </Button>
                                    </Button.Group>
                                </div>
                            </div>
                            <div className="row salesTable" style={{ justifyContent: "center" }}>
                                <TableView style={{ width: "100%", height: "530px" }} />
                            </div>
                            <div className="row">
                                <BTable responsive="md">
                                    <tbody>
                                        <tr className="">
                                            <td className="firstCol">Number of products<font text="()" /></td>
                                            <td className="secondCol">Sub Total</td>
                                            <td className="thirdCol"><label className="itemTotal" value="0.00"></label></td>
                                        </tr>
                                        <tr className="">
                                            <td></td>
                                            <td className="secondCol">Discount on basket</td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                        <tr className="">
                                            <td></td>
                                            <td className="secondCol">Delivery</td>
                                            <td className="thirdCol"><label className="itemTotal" value="0.00"></label></td>
                                        </tr>
                                        <tr className="">
                                            <td></td>
                                            <td className="secondCol">Net to pay</td>
                                            <td className="thirdCol"></td>
                                        </tr>
                                    </tbody>
                                </BTable>
                            </div>
                            <div className="row bottomButton" style={{ padding: "0 15px 15px 15px", justifyContent: "center" }}>
                                <div className="input-group">
                                    <Button.Group style={{ width: "100%" }}>
                                        <Button style={{ width: "25%" }}>
                                            <i className="fa fa-money"></i>
                                            Pay
                                        </Button>
                                        <Button style={{ width: "25%" }}>
                                            <i className="fa fa-hand-stop-o"></i>
                                            Waiting
                                        </Button>
                                        <Button style={{ width: "25%" }}>
                                            <i className="fa fa-gift"></i>
                                            Discount
                                        </Button>
                                        <Button style={{ width: "25%" }}>
                                            <i className="fa fa-refresh"></i>
                                            To cancel
                                        </Button>
                                    </Button.Group>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-6 col-sm-6 p-2 pl-1">
                    <div className="left" style={{ background: 'rgb(240, 242, 245)', height: '100%' }}>
                        <div className="container">
                            <div className="row">
                                <div className="input-group"
                                    style={{ justifyContent: "center", padding: "20px" }}>
                                    <Button.Group>
                                        <Button>
                                            <i className="fa fa-search"></i>
                                        </Button>
                                        <Button>
                                            <i className="fa fa-barcode"></i>
                                        </Button>
                                    </Button.Group>
                                    <Input type="text" placeholder="Barcode, SKU, product or category name ..."
                                        style={{ width: "87%" }} >
                                    </Input>
                                </div>
                            </div>
                            <div className="row salesTable" style={{ justifyContent: "center" }}>
                                <TableView style={{ width: "100%" }} />
                            </div>
                            <div className="row">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        sales: state.sales,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers: () => dispatch(getAllUsers()),
        getAllSales: () => dispatch(getAllSales())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);