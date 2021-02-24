import React, { useEffect } from 'react';
import { Menu, Divider } from 'antd';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Layout.scss';
import { routes, TOKEN, TYPE_MAP } from 'utils/constants/constants';
import * as icons from 'assets';
import { isEmpty } from 'utils/helpers/helpers';
import { listUser } from 'view/userManagement/UserManagementAction';

const { SubMenu } = Menu;

const Sider = (props) => {
  // const { type } = props.match.params;
  // const { pathname } = props.location;
  const menuList = [
    {
      activeIC: icons.avatar,
      text: 'Admin',
      route: routes.MAP.replace(':type', TYPE_MAP.ADMIN),
      isSubmenu: true,
    },
    {
      activeIC: icons.avatar,
      text: 'Hawaco',
      route: routes.MAP.replace(':type', TYPE_MAP.HAWACO),
      isSubmenu: true,
    },
    {
      activeIC: icons.avatar,
      text: 'Deepc',
      route: routes.MAP.replace(':type', TYPE_MAP.DEEPC),
      isSubmenu: true,
    },
    {
      activeIC: icons.avatar,
      text: 'Test',
      route: routes.MAP.replace(':type', TYPE_MAP.TEST),
      isSubmenu: true,
    },
    {
      activeIC: icons.avatar,
      text: 'Quản lý người dùng',
      route: routes.USER_MANAGEMENT,
    },
  ];
  const getRootMenuKeys = () => {
    return menuList.map((el) => el.route);
  };
  const [openKeys, setOpenKeys] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const fetchData = async () => {
    try {
      const { data } = await listUser({ [TOKEN]: localStorage.getItem(TOKEN) });
      if (!isEmpty(data.data)) setUsers(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (getRootMenuKeys().indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleClick = (key) => {
    props.history.push(key);
  };
  // const itemStyle = { padding: 0, width: '100%', background: '#2A2D45' };
  console.log('users', users);
  return (
    <div className="sider-container">
      {/* <PerfectScrollbar> */}
      <div className="logo-container">
        <img src={icons.logo_white} alt="logo" />
      </div>
      <Divider style={{ background: 'white' }} />
      {!isEmpty(users) && (
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          className="menu-container"
        >
          {users.map((el, index) =>
            !isEmpty(el.Value.listDevices) ? (
              <SubMenu
                key={el.Key}
                icon={<img src={icons.avatar} alt="" className="icon-menu" />}
                title={el.Key}
              >
                <Menu.Item
                  key={el.Key + index}
                  style={{ color: 'white', marginLeft: 16 }}
                >
                  Option 5
                </Menu.Item>
              </SubMenu>
            ) : (
              <Menu.Item
                key={el.Key}
                onClick={() => handleClick(el.route)}
                icon={
                  <img src={icons.avatar} alt="user" className="icon-menu" />
                }
              >
                {el.Key}
              </Menu.Item>
            )
          )}
          <Menu.Item
            key={routes.USER_MANAGEMENT}
            onClick={() => handleClick(routes.USER_MANAGEMENT)}
            icon={<img src={icons.avatar} alt="" className="icon-menu" />}
          >
            Quản lý người dùng
          </Menu.Item>
        </Menu>
      )}
      {/* </PerfectScrollbar> */}
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
