import React from 'react';
import { Menu, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Layout.scss';
import { routes } from 'utils/constants/constants';
import * as icons from 'assets';

const Sider = (props) => {
  const handleClick = ({ key }) => {
    props.history.push(key);
  };
  const itemStyle = { padding: 0, width: '100%', background: '#2A2D45' };
  const menuList = [
    {
      normalIC: icons.avatar,
      activeIC: icons.avatar,
      text: 'Admin',
      isActive: props.location.pathname === routes.MAP,
      route: routes.MAP,
      isShow: true,
    },
  ];
  return (
    <div className="sider-container">
      <div className="logo-container">
        <img src={icons.logo_white} alt="logo" />
      </div>
      <Divider style={{ background: 'white' }} />
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={[props.location.pathname]}
        mode="inline"
      >
        {menuList.map((el) => {
          if (el.isShow) {
            return (
              <Menu.Item
                key={el.route}
                style={{
                  ...itemStyle,
                  background: el.isActive ? '#2A2D45' : 'transparent',
                }}
              >
                {el.isActive ? (
                  <img src={el.activeIC} alt="user" className="icon-menu" />
                ) : (
                  <img src={el.normalIC} alt="user" className="icon-menu" />
                )}
                <span
                  className={`menu-item-text ${el.isActive && 'text-active'}`}
                >
                  {el.text}
                </span>
              </Menu.Item>
            );
          }
          return null;
        })}
      </Menu>
    </div>
  );
};

export default connect(
  (state) => ({
    account: state.system.account,
    role: state.system.role,
  }),
  null
)(withRouter(Sider));
