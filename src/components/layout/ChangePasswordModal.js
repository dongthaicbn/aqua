import React from 'react';
import { Form, Modal, Input, message, Icon } from 'antd';
import { changePassword } from '../../view/system/systemAction';

const ChangPasswordModal = Form.create()((props) => {
  const { getFieldDecorator, validateFields } = props.form;
  const handleOk = (e) => {
    validateFields(async (err, values) => {
      if (!err) {
        if (values.confirmPassword.trim() !== values.newPassword.trim()) {
          message.error('Xác nhận mật khẩu không chính xác!');
        } else {
          try {
            const data = {
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            };
            await changePassword(data);
            handleCancel();
            message.success('Thay đổi mật khẩu thành công!');
          } catch {
            handleCancel();
            message.error('Thay đổi mật khẩu thất bại!');
          }
        }
      }
    });
  };

  const handleCancel = (e) => {
    props.handleCloseModal();
  };

  return (
    <Modal
      title="Thay đổi mật khẩu"
      // confirmLoading={confirmLoading}
      visible={true}
      centered
      okText="Submit"
      onOk={handleOk}
      onCancel={handleCancel}
      // maskClosable={false}
    >
      <Form className="common-modal-container">
        <div className="item-container">
          <span className="title-item">Mật khẩu cũ</span>
          <Form.Item>
            {getFieldDecorator('currentPassword', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Vui lòng, nhập mật khẩu cũ!',
                },
              ],
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder="Điền mật khẩu cũ"
              />
            )}
          </Form.Item>
        </div>
        <div className="item-container">
          <span className="title-item">Mật khẩu mới</span>
          <span className="reg-text-pass">
            (tối thiểu 8 kí tự bao gồm chữ hoa, chữ thường, số và kí tự đặc
            biệt)
          </span>
          <Form.Item>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Vui lòng, nhập mật khẩu mới!',
                },
                {
                  pattern:
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
                  message: 'Mật khẩu không hợp lệ!',
                },
              ],
              getValueFromEvent: (e) => e.target.value.trim(),
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder="Điền mật khẩu mới"
              />
            )}
          </Form.Item>
        </div>
        <div className="item-container">
          <span className="title-item">Nhập lại mật khẩu mới</span>
          <Form.Item>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: 'Vui lòng, nhập mật khẩu mới!',
                },
              ],
              getValueFromEvent: (e) => e.target.value.trim(),
            })(
              <Input
                type="password"
                prefix={<Icon type="lock" />}
                placeholder="Điền mật khẩu mới"
              />
            )}
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
});

export default ChangPasswordModal;
