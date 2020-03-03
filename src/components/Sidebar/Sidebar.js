import React from 'react';
import { Menu, Icon } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import logo from '../../assets/images/logo.png'
import profile from '../../assets/images/profile.jpg'
import "./Sidebar.scss";
import { Link, NavLink } from 'react-router-dom';
// import Logo from '../Logo/Logo';

const menuData = require('../../constants/menudata.json');
const routes = require('../../constants/routes.json');

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedMenu: []
        }
    }

    handleMenu = (param) => {
        const { item, key, keyPath, domEvent } = param;
        // console.log(param);
        let title = "";
        let subtitle = "";
        let len = keyPath.length;
        let pKey = parseInt(keyPath[0]);
        let cKey = "";
        let url = "";
        if (len > 1) {
            pKey = parseInt(keyPath[1]);
            cKey = parseInt(keyPath[0].replace(keyPath[1], ""));
        }

        title = menuData.menus[pKey].title;
        url = routes[menuData.menus[pKey].url];
        if (cKey !== "") {
            subtitle = menuData.menus[pKey].children[cKey].title;
            url = routes[menuData.menus[pKey].children[cKey].url];
        }
        this.props.handleMenu(keyPath, title, subtitle, url);
    }

    onOpenChange = (openKeys) => {
        this.props.onOpenChange(openKeys);
    }

    render() {
        let { param } = this.props;
        // console.log(param);
        return (
            <>
                <div className="dashlogo container">
                    <Link to="#">
                        <img className="img-fluid dashboard mx-auto hide-collapsed" src={logo} />
                        {/* <Logo /> */}
                        <label className="show-collapsed">R&A</label>
                    </Link>
                </div>
                <div className="user-panel text-center">
                    <div className="image">
                        <img src={profile} className="avatar img-circle" alt="User Image" />
                    </div>
                    <div className="info">
                        <p className="m-0">{param.userName}</p>
                        <a href="#" className="text-success" style={{ fontSize: 11 }}><i className={`fa fa-circle mr-3px text-success ${param.isOnline ? 'online' : 'offline'}`} />
                            {param.isOnline ? 'Online' : 'Offline'}</a>
                    </div>
                </div>
                <Menu theme="dark" className="sidebar-menu" mode="inline" 
                selectedKeys={param.selectedKeys} openKeys={param.openKeys} onOpenChange={this.onOpenChange} subMenuCloseDelay='12' subMenuOpenDelay={5000} forceSubMenuRender={true}
                    onClick={this.handleMenu}>
                    {
                        menuData.menus.map((menu, pKey) => (
                            menu.hasChild === false ?
                                <Menu.Item key={pKey}>
                                    <NavLink to={routes[menu.url]}>
                                        {menu.icon && <Icon type={menu.icon} />}
                                        <span>{menu.title}</span>
                                    </NavLink>
                                </Menu.Item>
                                :
                                <SubMenu
                                    key={pKey}
                                    // key="sub1"
                                    title={
                                        <span>
                                            <Icon type={menu.icon} />
                                            <span>{menu.title}</span>
                                        </span>
                                    }
                                >
                                    {
                                        menu.children.map((cMenu, cKey) =>
                                            <Menu.Item key={pKey.toString() + cKey.toString()}>
                                                <NavLink to={routes[cMenu.url]}>
                                                    <span>{cMenu.title}</span>
                                                </NavLink>
                                            </Menu.Item>
                                        )
                                    }
                                </SubMenu>
                        ))
                    }
                </Menu>
            </>
        );
    }
}

export default Sidebar;