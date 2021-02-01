import React, { useEffect } from 'react';
import { Layout } from 'antd';
import cookie from 'js-cookie';
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
  useEffect(() => {
    if (
      !isEmpty(cookie.get(TOKEN)) &&
      props.location.pathname !== routes.LOGIN
    ) {
      props.getAccountInfo();
    }
    // eslint-disable-next-line
  }, []);
  const isLogin = props.location.pathname === routes.LOGIN;
  if (isLogin) {
    // if (cookie.get(TOKEN)) cookie.remove(TOKEN);
    return <Login />;
  }
  const getTitle = () => {
    switch (props.location.pathname) {
      case `${routes.SOLUTION}`:
        return 'Solution';
      case `${routes.NOTIFICATION}`:
        return 'Notification';
      case `${routes.HISTORY}`:
        return 'History';
      case `${routes.USER}`:
        return 'User';
      case `${routes.SETTING}`:
        return 'Setting';
      default:
        return '';
    }
  };
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
          <Layout.Sider width={325}>
            <Sider />
          </Layout.Sider>
          <Layout>
            <Layout.Header>
              <p className="header-page">{getTitle()}</p>
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
