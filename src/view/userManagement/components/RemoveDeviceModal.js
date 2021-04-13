import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { removeDeviceID } from "../UserManagementAction";
import { TOKEN } from "utils/constants/constants";
import { isEmpty } from "utils/helpers/helpers";

const RemoveDeviceModal = (props) => {
  const { fetchData, item, device_id } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const { data } = await removeDeviceID({
        ...values,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success("Remove device thành công");
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
      <Tag color="#108ee9">
        {device_id}
        <CloseOutlined
          onClick={openModal}
          style={{ marginLeft: 8, cursor: "pointer" }}
        />
      </Tag>

      <Modal
        title="Remove device"
        visible={visible}
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
export default RemoveDeviceModal;
