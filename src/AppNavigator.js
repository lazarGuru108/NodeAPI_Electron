import React from 'react';
import routes from './constants/routes.json';
import 'antd/dist/antd.css';
import { Switch, Route, BrowserRouter, Redirect, HashRouter, useRouteMatch, MemoryRouter, StaticRouter } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.js';
import DashboardPage from './pages/DashboardPage/DashboardPage.js';
import HomePage from './pages/HomePage/HomePage.js';
import ManageSupplier from './pages/Supplier/ManageSupplier/ManageSupplier.js';
import Purchase from './pages/Purchase/Purchase.js';
import Product from './pages/Product/Product.js';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar/Sidebar.js';
import MainHeader from './components/MainHeader/MainHeader.js';
import ContentHeader from './components/ContentHeader/ContentHeader.js';
import MainFooter from './components/MainFooter/MainFooter.js';
import AdminLayout from './pages/Layouts/AdminLayout.js';
import { getAllSales } from './store/actions/saleAction.js';
import { getAllUsers } from './store/actions/userAction.js';
import { connect } from 'react-redux';
import Sales from './pages/Sales/Sales.js';
import menuData from './constants/menudata.json';

const { Sider, Content } = Layout;


class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      collapsed: false,
      sidebarParams: {
        userName: "Admin User",
        isOnline: true,
        selectedKeys: ['0'],
        openKeys: ['0']
      },
      title: 'Dashboard',
      subTitle: '',
    };
  }

  componentDidMount() {
    let url = window.location.pathname;
    let urlKey = "";
    for(let key in routes) {
      if(routes[key] === url) {
        urlKey = key;
        break;
      }
    }

    let allMenus = menuData.menus;
    let pk = "", ck ="", children, i, j, title, subTitle;
    for(i = 0; i<allMenus.length; i++) {
      pk = i;
      children = allMenus[i].children;
      title =  allMenus[i].title;
      if(allMenus[i].url === urlKey) {
        ck = "";
        break;
      }
      for(j = 0; j<children.length; j++) {
        if(children[j].url === urlKey) {
          ck = pk.toString() + j.toString();
          subTitle = children[j].title;
          break;
        }
      }
      if(ck) {
        break;
      }
    }
    
    let selectedKeys = [ck.toString()];
    let openKeys = [pk.toString()];
    let sidebarParams = {...this.state.sidebarParams, selectedKeys: selectedKeys, openKeys: openKeys};
    this.setState({sidebarParams, title, subTitle});
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  changeMenu = (keyPath, title, subTitle, url) => {
    console.log(keyPath, title, subTitle);
    let { selectedKeys, openKeys } = this.state.sidebarParams;
    console.log(selectedKeys, openKeys);
    let sidebarParams = {
      ...this.state.sidebarParams,
      openKeys: keyPath[1]?[keyPath[1]]:[keyPath[0]],
      selectedKeys: keyPath[1]?[keyPath[0]]:[]
    }
    if(title && subTitle, url) {
      this.setState({ title, subTitle, sidebarParams });
      return <Redirect to={url} />
    }else{
      if(keyPath[1]) {
        openKeys.push(keyPath[1]);
        selectedKeys.push(keyPath[0]);
      }else{
        openKeys.push(keyPath[0]);
      }
      
      sidebarParams = {
        ...this.state.sidebarParams,
        openKeys: openKeys,
        selectedKeys: selectedKeys
      }
      console.log(sidebarParams);
      this.setState({sidebarParams});
    }
  }

  render() {
    return (
      <HashRouter basename={routes.HOME}>
        <Switch>
          <Route path={routes.HOME} exact component={HomePage} />
          <AdminLayout id="admin">
            <Sider id="sidebar" trigger={null} collapsible collapsed={this.state.collapsed} width={250}>
              <Sidebar changeMenu={this.changeMenu} param={this.state.sidebarParams} toggleMenu={this.handleMenu} />
            </Sider>
            <Layout>
              <MainHeader toggle={this.toggle} />
              <ContentHeader title={this.state.title} subTitle={this.state.subTitle} />
              <Content className="content">
                <Route path={routes.DASHBOARD} exact component={DashboardPage} />
                <Route path={routes.MANAGESUPPLIER} exact component={ManageSupplier} />
                <Route path={routes.PURCHASE} exact component={Purchase} />
                <Route path={routes.PRODUCT} exact component={Product} />
                <Route path={routes.SALES} exact component={Sales} />
              </Content>
              <MainFooter />
            </Layout>
          </AdminLayout>
          <Route component={NotFoundPage} />
        </Switch>
      </HashRouter>
    );
  }

}

const mapStateToProps = (state)=>{
  return {
    users: state.users,
    sales: state.sales,
  }
};

const mapDispatchToProps = (dispatch)=>{
  return {
    getAllUsers: ()=>dispatch(getAllUsers()),
    getAllSales: ()=>dispatch(getAllSales())
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppNavigator);