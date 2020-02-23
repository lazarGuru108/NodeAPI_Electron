// @flow
import React, { Component } from 'react';
import logo from "../../assets/images/logo.png";
import routes from '../../constants/routes.json';
import './HomePage.scss'
import { getAllUsers } from '../../store/actions/userAction';
import { getAllSales } from '../../store/actions/saleAction';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0,
      username: '',
      password: '',
      rememberCheck: true,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler = (field, event) => {
    console.log(event.target);
    let val = event.target.value;
    this.setState({ [field]: val });
  }


  render() {
    let { stage, username, password, rememberCheck } = this.state;
    return (
      <div id="home">
        {
          stage === 0 &&
          <div className="container-fluid">
            <div className="loginlink" onClick={() => this.setState({ stage: 1 })} >
              <img alt="Logo" src={logo} className="mx-auto d-block"></img>
            </div>
          </div>
        }
        {
          stage === 1 &&
          <div id="login">
            <h1>Log In</h1>
            <span className="close-btn" onClick={() => this.setState({ stage: 0 })} >
              <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" />
            </span>
            <form>
              <p className="label">Username</p>
              <input type="User" name="username" value={username} placeholder="User" onChange={(e) => this.onChangeHandler('username', e)} />
              <p className="label">Password</p>
              <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => this.onChangeHandler('password', e)} />
              <div id="remember-container">
                <input type="checkbox" id="checkbox-2-1" className="checkbox" name="rememberCheck" value={rememberCheck} onChange={(e) => this.onChangeHandler('rememberCheck', e)} />
                <span className="remember">Remember me </span>
              </div>
              <Link className="btn" to="#" onClick={() => this.setState({ stage: 2 })}>Log in</Link>
            </form>
          </div>
        }
        {
          stage === 2 &&
          <div id="login" className="container">
            <div className="row">
              <div className="col-1">
                <h1></h1>
              </div>
              <div className="col-10">
                <h1>Log In</h1>
              </div>
              <div className="col-1">
                <span className="close-btn" onClick={() => this.setState({ stage: 0 })} >
                  <img src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png" />
                </span>
              </div>
            </div>
            <div className="row">
              <div className="container">
                <div className="login-box" id="store">
                  <div className="login-logo">
                    <div className="text">
                      <p className="selectStore">
                        <strong>
                          Select Store
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div id="store-launcher" className="login-box-body">
                    <ul className="list-unstyled list-group store-list ps ps--theme_default" data-ps-id="91ace11e-4571-a460-2fdf-ac77946d3353">
                      <li className="list-group-item">
                      {/* <Link to="dashboard">Store 01</Link> */}
                        <Link className="activate-store" to={routes.DASHBOARD}>
                          <div className="store-icon">
                            <svg className="svg-icon"><use href="#icon-store"></use></svg>
                          </div>
                          <div className="store-name">
                            Store 01                <span className="pull-right">→</span>
                          </div>
                        </Link>
                      </li>
                      <li className="list-group-item">
                        {/* <Link to="dashboard">Store 02</Link> */}
                        <Link className="activate-store" to={routes.DASHBOARD}>
                          <div className="store-icon">
                            <svg className="svg-icon"><use href="#icon-store"></use></svg>
                          </div>
                          <div className="store-name">
                            Store 02                <span className="pull-right">→</span>
                          </div>
                        </Link>
                        
                      </li>
                      <div className="ps__scrollbar-x-rail">
                        <div className="ps__scrollbar-x" tabIndex="0">
                        </div></div>
                      <div className="ps__scrollbar-y-rail">
                        <div className="ps__scrollbar-y" tabIndex="0">
                        </div>
                      </div>
                    </ul>
                  </div>
                  <div className="copyright text-center">
                    <p><a className="copyrightlink" href="http://itsolution24.com">© ITsolution24.com, v3.0</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);