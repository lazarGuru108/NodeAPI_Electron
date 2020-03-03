// @flow
import React from 'react';
import 'antd/dist/antd.css';
import { Table as BTable } from 'react-bootstrap';
import './Sales.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { Button, Icon, Select, Table, Input } from 'antd';
import TableView from './TableView';

const { Option } = Select;

class Sales extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" id="sales" style={{ height: '100%' }}>
                <div className="col-6 col-sm-6 p-2 pr-1">
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
                                        <Button>
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
                <div className="col-6 col-sm-6 p-2 pl-1">
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