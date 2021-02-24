import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import { addUser } from '../UserManagementAction';
import { TOKEN } from 'utils/constants/constants';
import { isEmpty } from 'utils/helpers/helpers';

const UserModal = (props) => {
  const { fetchData } = props;
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await addUser({
        ...values,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success('Thêm người dùng thành công');
        closeModal();
      } else {
        message.error(data.message);
      }
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
        title="Thêm người dùng"
        visible={visible}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
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
            required
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
          <span className="lab-text">Permission</span>
          <Form.Item name="permission">
            <Select placeholder="Chọn permission">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="footer-container">
            <Button onClick={closeModal}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-btn"
            >
              &nbsp;&nbsp;
              <FormattedMessage id="IDS_OK" />
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
