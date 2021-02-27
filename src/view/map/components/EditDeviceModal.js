import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import { configDevice } from '../MapAction';
import { TOKEN } from 'utils/constants/constants';
import { isEmpty } from 'utils/helpers/helpers';

const EditDeviceModal = (props) => {
  const { fetchData, item, device_id, handleClose } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleClose();
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await configDevice({
        ...values,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success('Chỉnh sửa cấu hình device thành công');
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
      <Modal
        title="Chỉnh sửa cấu hình device"
        visible={true}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
          initialValues={{
            username: item.Value.username,
            device_id: device_id,
          }}
          form={form}
        >
          <p className="lab-text">Bạn có chắc chắn muốn xóa device dưới đây?</p>
          <span className="lab-text">Username</span>
          <Form.Item name="username">
            <Input disabled />
          </Form.Item>
          <span className="lab-text">Id thiết bị</span>
          <Form.Item name="device_id">
            <Input disabled />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={closeModal}>Hủy</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginLeft: 20 }}
              >
                &nbsp;&nbsp;
                <FormattedMessage id="IDS_OK" />
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditDeviceModal;
