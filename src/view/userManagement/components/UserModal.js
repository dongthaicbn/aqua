import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { addUser } from '../UserManagementAction';

const UserModal = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const handleOk = () => {
    setVisible(false);
  };
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await addUser(values);
      console.log('data', data);
      closeModal();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      <Button type="primary" onClick={openModal}>
        Thêm người dùng
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={closeModal}
      >
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
      </Modal>
    </>
  );
};
export default UserModal;
