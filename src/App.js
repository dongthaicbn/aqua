import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccountInfo } from 'view/system/systemAction';
import 'App.scss';
import { routes, TOKEN, roles } from 'utils/constants/constants';
import Routes from 'Routes';
import Sider from 'components/layout/Sider';
import Login from 'view/login/Login';
import { isEmpty } from 'utils/helpers/helpers';

const App = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  useEffect(() => {
    if (
      !isEmpty(localStorage.getItem(TOKEN)) &&
      props.location.pathname !== routes.LOGIN
    ) {
      // props.getAccountInfo();
    }
    // eslint-disable-next-line
  }, []);
  const isLogin = props.location.pathname === routes.LOGIN;
  if (isLogin) {
    // if (cookie.get(TOKEN)) cookie.remove(TOKEN);
    return <Login />;
  }
  const isGuest = !isEmpty(props.role.filter((el) => el.name === roles.GUEST));
  return (
    <div className="app-container">
      {isGuest ? (
        <div className="permission-container">
          <div>
            <p>Bạn không có quyền truy cập hệ thống!</p>
            <p> Vui lòng contact admin để biết thêm thông tin chi tiết.</p>
          </div>
        </div>
      ) : (
        <Layout>
          {!collapsed && (
            <Layout.Sider width={325} style={{ transition: '1s linear' }}>
              <Sider />
            </Layout.Sider>
          )}
          <Layout>
            <Layout.Header
              style={{ background: '#173d6a', color: 'white', fontSize: 24 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                { className: 'trigger', onClick: toggle }
              )}
              <span style={{ marginLeft: 8, fontSize: 20 }}>
                Quản lý mạng nước
              </span>
            </Layout.Header>
            <Layout.Content className="content-container">
              <Routes />
            </Layout.Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    isLoading: state.system.isLoading,
    account: state.system.account,
    role: state.system.role,
  }),
  { getAccountInfo }
)(withRouter(App));
