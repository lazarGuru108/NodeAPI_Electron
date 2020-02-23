// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './DashboardPage.scss';
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { connect } from 'react-redux';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

  }

  handleMenu = () => {
    // this.setState(menuInfo);
  }

  render() {
    return (
      <div className="row" id="dashboard">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <div className="small-box bg-green" style={{ color: '#fff' }}>
            <div className="inner">
              <h4><span className="count-number">13</span></h4>
              <p>Total Customer</p>
            </div>
            <div className="icon">
              <i className="fa fa-users"></i>
            </div>
            <a href="https://saleserpnew.bdtask.com/saleserp_v9.3-demo/Ccustomer/manage_customer" className="small-box-footer">Total Customer</a>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <div className="small-box" style={{ backgroundColor: '#6cabbc', color: '#fff' }}>
            <div className="inner">
              <h4><span className="count-number">9</span></h4>

              <p>Total Product</p>
            </div>
            <div className="icon">
              <i className="fa fa-shopping-bag"></i>
            </div>
            <a href="https://saleserpnew.bdtask.com/saleserp_v9.3-demo/Cproduct/manage_product" className="small-box-footer">Total Product</a>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <div className="small-box" style={{ backgroundColor: '#8459cf', color: '#fff' }}>
            <div className="inner">
              <h4><span className="count-number">10</span></h4>

              <p>Total Supplier</p>
            </div>
            <div className="icon">
              <i className="fa fa-user"></i>
            </div>
            <a href="https://saleserpnew.bdtask.com/saleserp_v9.3-demo/Csupplier/manage_supplier" className="small-box-footer">Total Supplier </a>
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
          <div className="small-box" style={{ backgroundColor: '#749057', color: '#fff' }}>
            <div className="inner">
              <h4><span className="count-number">54</span> </h4>

              <p>Total Sale</p>
            </div>
            <div className="icon">
              <i className="fa fa-money"></i>
            </div>
            <a href="https://saleserpnew.bdtask.com/saleserp_v9.3-demo/Cinvoice/manage_invoice" className="small-box-footer">Total Sale </a>
          </div>
        </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
