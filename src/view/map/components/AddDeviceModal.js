import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { FormattedMessage } from "react-intl";
import { TOKEN } from "utils/constants/constants";
import { isEmpty } from "utils/helpers/helpers";
import { addDeviceID } from "view/userManagement/UserManagementAction";

const AddDeviceModal = (props) => {
  const { fetchData, item, handleClose } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleClose();
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await addDeviceID({
        ...values,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success("Thêm device thành công");
        closeModal();
      } else {
        message.error(data.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {};
  return (
    <>
      <Modal
        title="Thêm device"
        visible={true}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
          form={form}
          initialValues={{ username: item.Value.username }}
        >
          <span className="lab-text">Username</span>
          <Form.Item name="username">
            <Input disabled />
          </Form.Item>
          <span className="lab-text">Id thiết bị</span>
          <Form.Item
            name="device_id"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Hãy nhập Id thiết bị!",
              },
            ]}
          >
            <Input placeholder="Nhập Id thiết bị" />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
export default AddDeviceModal;
