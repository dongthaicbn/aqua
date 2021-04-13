import React, { useState, Fragment } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  message,
  Row,
  Col,
  Divider,
  Checkbox,
} from "antd";
import { FormattedMessage } from "react-intl";
import { configDevice } from "../MapAction";
import { TOKEN } from "utils/constants/constants";
import { isEmpty } from "utils/helpers/helpers";

const EditDeviceModal = (props) => {
  const { fetchData, device_id, deviceInfo, handleClose } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    handleClose();
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let dataSubmit = {
        device_name: values.device_name,
        device_id: values.device_id,
        area: values.area,
        hasPump: values.hasPump,
        latitude: values.latitude,
        longitude: values.longitude,
      };
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((el) => {
        dataSubmit = {
          ...dataSubmit,
          [`config${el}`]: {
            input_name: values[`input_name_${el}`],
            input_unit: values[`input_unit_${el}`],
            is_display_data: values[`is_display_data_${el}`],
            is_display_graph: values[`is_display_graph_${el}`],
            high_level: values[`high_level_${el}`],
            low_level: values[`low_level_${el}`],
            xmin: values[`xmin_${el}`],
            xmax: values[`xmax_${el}`],
            ymin: values[`ymin_${el}`],
            ymax: values[`ymax_${el}`],
          },
        };
      });
      const { data } = await configDevice({
        ...dataSubmit,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success("Chỉnh sửa cấu hình thiết bị thành công");
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
  const getInitialValue = (info) => {
    let result = {
      device_name: info.device_name,
      device_id: info.device_id,
      area: info.area,
      hasPump: info.hasPump,
      latitude: info.latitude,
      longitude: info.longitude,
    };
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((el) => {
      result = {
        ...result,
        [`input_name_${el}`]: info[`config${el}`].input_name,
        [`input_unit_${el}`]: info[`config${el}`].input_unit,
        [`is_display_data_${el}`]: info[`config${el}`].is_display_data,
        [`is_display_graph_${el}`]: info[`config${el}`].is_display_graph,
        [`high_level_${el}`]: info[`config${el}`].high_level,
        [`low_level_${el}`]: info[`config${el}`].low_level,
        [`xmin_${el}`]: info[`config${el}`].xmin,
        [`xmax_${el}`]: info[`config${el}`].xmax,
        [`ymin_${el}`]: info[`config${el}`].ymin,
        [`ymax_${el}`]: info[`config${el}`].ymax,
      };
    });
    return result;
  };
  return (
    <>
      <Modal
        title="Chỉnh sửa cấu hình thiết bị"
        visible={true}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
        width={1200}
        className="device-modal edit-device-modal"
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="login-form"
          initialValues={{
            device_id: device_id,
            ...getInitialValue(deviceInfo),
          }}
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <span className="lab-text">Tên thiết bị</span>
              <Form.Item name="device_name">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span className="lab-text">Device ID</span>
              <Form.Item name="device_id">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span className="lab-text" style={{ opacity: 0 }}>
                Bơm
              </span>
              <Form.Item name="hasPump" valuePropName="checked">
                <Checkbox>Bơm</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <span className="lab-text">Khu vực</span>
              <Form.Item name="area">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span className="lab-text">Kinh độ (longitude)</span>
              <Form.Item name="longitude">
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <span className="lab-text">Vĩ độ (latitude)</span>
              <Form.Item name="latitude">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
            <Fragment key={el}>
              <Divider orientation="left">Cấu hình {el}</Divider>
              <Row gutter={16}>
                <Col span={8}>
                  <span className="lab-text">Tên sensor</span>
                  <Form.Item name={`input_name_${el}`}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <span className="lab-text">Đơn vị</span>
                  <Form.Item name={`input_unit_${el}`}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span className="lab-text" style={{ opacity: 0 }}>
                        Show trên marker
                      </span>
                      <Form.Item
                        name={`is_display_data_${el}`}
                        valuePropName="checked"
                      >
                        <Checkbox>Show trên marker</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="lab-text" style={{ opacity: 0 }}>
                        Show trên biểu đồ
                      </span>
                      <Form.Item
                        name={`is_display_graph_${el}`}
                        valuePropName="checked"
                      >
                        <Checkbox>Show trên biểu đồ</Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span className="lab-text">Ngưỡng mức cao</span>
                      <Form.Item name={`high_level_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="lab-text">Ngưỡng mức thấp</span>
                      <Form.Item name={`low_level_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span className="lab-text">xmin</span>
                      <Form.Item name={`xmin_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="lab-text">xmax</span>
                      <Form.Item name={`xmax_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span className="lab-text">ymin</span>
                      <Form.Item name={`ymin_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <span className="lab-text">ymax</span>
                      <Form.Item name={`ymax_${el}`}>
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Fragment>
          ))}
          <Form.Item className="device-footer-modal">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "12px 24px 24px",
              }}
            >
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
