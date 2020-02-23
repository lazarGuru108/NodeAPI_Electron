// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './Sales.scss';
import { connect } from 'react-redux';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { Button, Icon, Select, Table } from 'antd';
import TableView from './TableView';

const { Option } = Select;

class Sales extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row" id="sales" style={{ height: '100%' }}>
                <div className="col-6 p-2 pr-1">
                    <div className="left" style={{ background: 'rgb(240, 242, 245)', height: '100%' }}>
                        <div className="container">
                            <div className="row">
                                <div className="input-group"
                                    style={{ justifyContent: "center", padding: "20px" }}>
                                    <Select
                                        style={{ width: "50%" }}
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
                                        <Button type="normal" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-user"></i>
                                            Add Customer
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-pencil"></i>
                                            Note
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-truck"></i>
                                            Shipping
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-plus"></i>
                                            Item
                                        </Button>
                                    </Button.Group>
                                </div>
                            </div>
                            <div className="row salesTable" style={{justifyContent: "center"}}>
                                <TableView style={{width: "100%"}}/>
                            </div>
                            <div className="row"></div>
                        </div>
                    </div>
                </div>
                <div className="col-6 p-2 pl-1">
                    <div className="left" style={{ background: 'rgb(240, 242, 245)', height: '100%' }}>
                    <div className="container">
                            <div className="row">
                                <div className="input-group"
                                    style={{ justifyContent: "center", padding: "20px" }}>
                                    <Select
                                        style={{ width: "50%" }}
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
                                        <Button type="normal" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-user"></i>
                                            Add Customer
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-pencil"></i>
                                            Note
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-truck"></i>
                                            Shipping
                                        </Button>
                                        <Button type="primary" style={{ background: "#37a000cc", color: "white", border: "black" }}>
                                            <i className="fa fa-plus"></i>
                                            Item
                                        </Button>
                                    </Button.Group>
                                </div>
                            </div>
                            <div className="row salesTable" style={{justifyContent: "center"}}>
                                <TableView style={{width: "100%"}}/>
                            </div>
                            <div className="row"></div>
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