import React from 'react';
import { Menu, Dropdown, Modal } from 'antd';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import './Layout.scss';
import { routes, TOKEN, roles } from 'utils/constants/constants';
import * as icons from 'assets';
import { isEmpty } from 'utils/helpers/helpers';
import { requestLogout } from 'view/system/systemAction';
// import ChangePasswordModal from './ChangePasswordModal';

const Sider = (props) => {
  // const [visible, setVisible] = useState(false);
  const handleClick = ({ key }) => {
    props.history.push(key);
  };
  const handleClickAvatar = async ({ key }) => {
    if (key === routes.LOGIN) {
      Modal.confirm({
        title: 'Bạn có chắc chắn muốn đăng xuất?',
        content: null,
        centered: true,
        onOk: async () => {
          try {
            await requestLogout();
          } catch (err) {}
          cookie.remove(TOKEN);
          props.history.push(key);
        },
        onCancel: () => {},
      });
    } else {
      // setVisible(true);
    }
  };
  const itemStyle = {
    padding: 0,
    marginLeft: 13,
    width: 'calc(100% - 13px)',
    background: '#2A2D45',
    borderRadius: '23px 0 0 23px',
  };
  const menu = (
    <Menu onClick={handleClickAvatar}>
      {/* <Menu.Item key={routes.CHANGE_PASSWORD}>
        <FormattedMessage id="CHANGE_PASSWORD" />
      </Menu.Item> */}
      <Menu.Item key={routes.LOGIN}>
        <FormattedMessage id="IDS_SMS_LOGOUT" />
      </Menu.Item>
    </Menu>
  );
  const isAdmin = !isEmpty(props.role.filter((el) => el.name === roles.ADMIN));
  // const isGuest = !isEmpty(props.role.filter((el) => el.name === roles.GUEST));
  const menuList = [
    {
      normalIC: icons.voucher,
      activeIC: icons.voucher_red,
      text: 'Solutions',
      isActive: props.location.pathname === routes.SOLUTION,
      route: routes.SOLUTION,
      isShow: true,
    },
    {
      normalIC: icons.basket,
      activeIC: icons.basket_red,
      text: 'Notification',
      isActive: props.location.pathname === routes.NOTIFICATION,
      route: routes.NOTIFICATION,
      isShow: true,
    },
    {
      normalIC: icons.user,
      activeIC: icons.user_red,
      text: 'History',
      isActive: props.location.pathname === routes.HISTORY,
      route: routes.HISTORY,
      isShow: true,
    },
    {
      normalIC: icons.user,
      activeIC: icons.user_red,
      text: 'User',
      isActive: props.location.pathname === routes.USER,
      route: routes.USER,
      isShow: isAdmin,
    },
    {
      normalIC: icons.user,
      activeIC: icons.user_red,
      text: 'Setting',
      isActive: props.location.pathname === routes.SETTING,
      route: routes.SETTING,
      isShow: true,
    },
  ];
  return (
    <div className="sider-container">
      <div className="logo-container">
        <img src={icons.vsmart_logo} alt="logo user" className="logo-image" />
        <span className="logo-text">Push Notification</span>
      </div>
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
                  borderRadius: el.isActive ? '23px 0 0 23px' : 'none',
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
      <Dropdown overlay={menu}>
        <div className="footer-container">
          <img src={icons.avatar} alt="avatar" className="logo-image" />
          {!isEmpty(props.account) && (
            <p className="footer-text" title={props.account.fullName}>
              {props.account.fullName}
            </p>
          )}
        </div>
      </Dropdown>
      {/* {visible && (
        <ChangePasswordModal handleCloseModal={() => setVisible(false)} />
      )} */}
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
