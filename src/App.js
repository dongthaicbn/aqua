import React, { useEffect, useState } from 'react';
import { Layout, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAccountInfo } from 'view/system/systemAction';
import 'App.scss';
import { routes, TOKEN } from 'utils/constants/constants';
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
    if (localStorage.getItem(TOKEN)) localStorage.removeItem(TOKEN);
    return <Login />;
  }
  console.log('account', props.account);
  return (
    <div className="app-container">
      <Layout>
        {!collapsed && (
          <Layout.Sider width={325} style={{ transition: '1s linear' }}>
            <Sider />
          </Layout.Sider>
        )}
        <Layout>
          <Layout.Header
            style={{
              background: '#173d6a',
              color: 'white',
              fontSize: 24,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                { className: 'trigger', onClick: toggle }
              )}
              <span style={{ marginLeft: 8, fontSize: 20 }}>IoT Thủy Sản</span>
            </div>
            {!isEmpty(props.account) && (
              <span style={{ marginLeft: 8, fontSize: 20 }}>
                <Avatar
                  style={{ backgroundColor: '#f56a00', marginRight: 8 }}
                  size="large"
                >
                  {(props.account.username || 'A')
                    .substring(0, 1)
                    .toUpperCase()}
                </Avatar>
                {props.account.username || ''}
              </span>
            )}
          </Layout.Header>
          <Layout.Content className="content-container">
            <Routes />
          </Layout.Content>
        </Layout>
      </Layout>
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
