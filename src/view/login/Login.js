import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import * as icons from '../../assets';
import { FormattedMessage } from 'react-intl';
import { requestLogin } from './LoginService';
import { getAccountInfo } from '../../view/system/systemAction';
import './Login.scss';
import { routes, TOKEN } from '../../utils/constants/constants';
// import api from '../../utils/helpers/api';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [showErrMes, setErr] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await requestLogin(values);
      cookie.set(TOKEN, data.id_token);
      props.getAccountInfo();
      props.history.push(routes.SOLUTION);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err && err.data && err.data.status === 401) {
        setErr('Username hoặc password không chính xác!');
      } else if (err && err.data && err.data.status === 400) {
        setErr(err.data.errorMessage);
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-container">
          <img src={icons.vsmart_logo} alt="user" className="logo-img" />
        </div>
        {showErrMes && <p className="fail-text">{showErrMes}</p>}

        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <span className="lab-text">Username</span>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Hãy nhập username!',
              },
              { max: 50, message: 'Bạn không thể nhập quá 50 kí tự!' },
              { pattern: "^[_'.@A-Za-z0-9-]*$", message: 'Hãy nhập username' },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <span className="lab-text">Password</span>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Hãy nhập password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="footer-container">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-btn"
            >
              &nbsp;&nbsp;
              <FormattedMessage id="IDS_SMS_LOGIN" />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default connect(
  (state) => ({
    // isLoading: state.system.isLoading
  }),
  { getAccountInfo }
)(withRouter(Login));
