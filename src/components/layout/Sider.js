import React from 'react';
import { Menu, Divider } from 'antd';
import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Layout.scss';
import { routes } from 'utils/constants/constants';
import * as icons from 'assets';
import { getUsers } from 'view/userManagement/UserManagementAction';

const Sider = (props) => {
  const handleClick = ({ key }) => {
    props.history.push(key);
  };
  return (
    <div className="sider-container">
      {/* <PerfectScrollbar> */}
      <div className="logo-container">
        <img src={icons.logo} alt="logo" />
        <p style={{ margin: 0, marginLeft: 12 }}>IOT THỦY SẢN</p>
      </div>
      <Divider style={{ background: 'white' }} />
      <Menu
        mode="inline"
        onClick={handleClick}
        selectedKeys={[props.location.pathname]}
        className="menu-container"
      >
        <Menu.Item
          key={routes.DEVICE_MANAGEMENT}
          icon={<img src={icons.avatar} alt="" className="icon-menu" />}
        >
          Quản lý device
        </Menu.Item>
        <Menu.Item
          key={routes.USER_MANAGEMENT}
          icon={<img src={icons.avatar} alt="" className="icon-menu" />}
        >
          Quản lý người dùng
        </Menu.Item>
      </Menu>
      {/* </PerfectScrollbar> */}
    </div>
  );
};

export default connect(
  (state) => ({
    account: state.system.account,
    users: state.system.users,
    role: state.system.role,
  }),
  { getUsers }
)(withRouter(Sider));
