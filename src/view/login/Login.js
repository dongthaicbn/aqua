import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, Divider } from 'antd';
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
      // const { data } = await requestLogin(values);
      // cookie.set(TOKEN, data.id_token);
      cookie.set(TOKEN, 'token123456789');
      // props.getAccountInfo();
      props.history.push(routes.MAP.replace(':type', 'admin'));
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
      <div className="login-left">
        <div className="logo-content">
          <img src={icons.logo_transparent} alt="logo" />
          <div className="login-text">
            <p className="login-header">Water Network Management System</p>
            <Divider style={{ background: 'white' }} />
            <p className="sub-header">
              Chào mừng bạn đến với hệ thống quản lý mạng nước
            </p>
          </div>
        </div>
      </div>
      <div className="login-container">
        <img src={icons.logo_transparent} className="logo-img" alt="logo" />
        {showErrMes && <p className="fail-text">{showErrMes}</p>}
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
        >
          <span className="lab-text">Tài khoản</span>
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
            <Input placeholder="Nhập tài khoản" />
          </Form.Item>
          <span className="lab-text">Mật khẩu</span>
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
            <Input.Password placeholder="Nhập mật khẩu" />
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
