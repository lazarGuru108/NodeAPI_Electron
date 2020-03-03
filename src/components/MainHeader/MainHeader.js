import React from 'react';
import "./MainHeader.scss";
import { Link } from 'react-router-dom';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { collapsed: true };
    }

    render() {
        return (
            <div id="header" style={{ background: '#fff', padding: 0 }}>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-12 text-left vertical-center">
                            <a className="sidebar-toggle"><span className="pe-7s-keypad trigger" onClick={() => this.props.toggle()}></span></a>

                        </div>
                        <div className="col-md-8 col-sm-10 col-12 vertical-center text-center">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="p-1">
                                        <Link to={'sale'} className="btn btn btn-success btn-outline"><i className="fa fa-balance-scale" />Sale</Link>
                                    </div>
                                    <div className="p-1">
                                        <Link to="supplier_payment" className="btn btn-success btn-outline">
                                            <i className="fa fa-money" aria-hidden="true"></i> Supplier Payment</Link>
                                    </div>
                                    <div className="p-1">
                                        <Link to="purchase" className="btn btn-success btn-outline">
                                            <i className="ti-shopping-cart"></i> Purchase</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-12 col-sm-12 vertical-center">
                            <div className="container setting">
                                <div className="row justify-content-right mr-6px">
                                    <div className="p-1 vertical-center">
                                        <Link to="#" className="position-relative">
                                            <i className="pe-7s-attention" /><span className="label label-danger" style={{ fontSize: 12 }}>0</span></Link>
                                    </div>
                                    <div className="p-1 vertical-center">
                                        <Link to="#"><i className="pe-7s-settings" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default MainHeader;