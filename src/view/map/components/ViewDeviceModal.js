import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Modal,
  Form,
  message,
  Row,
  Col,
  Checkbox,
  DatePicker,
  Empty,
  Table,
} from 'antd';
import { readDeviceByDay, pumpControl } from '../MapAction';
import { TOKEN } from 'utils/constants/constants';
import { isEmpty } from 'utils/helpers/helpers';

const FORMAT_DATE = 'HH:mm:ss DD/MM/YYY';

const ViewDeviceModal = (props) => {
  const { device_id, handleClose } = props;
  const [form] = Form.useForm();
  const [dateView, setDate] = useState(moment());
  const [device, setDevice] = useState({});

  const closeModal = () => {
    handleClose();
    form.resetFields();
  };
  const fetchDeviceDetail = async () => {
    try {
      const { data } = await readDeviceByDay({
        device_id,
        datetime: 1614435641,
        // datetime: moment(dateView).format('X'),
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        console.log('test', data.data);
        setDevice(data.data);
      } else {
        message.error(data.message);
      }
    } catch (error) {}
  };
  const handlePumpControl = async (pumpValue) => {
    try {
      const { data } = await pumpControl({
        device_id,
        [TOKEN]: localStorage.getItem(TOKEN),
        pumpControl: pumpValue ? 'ON' : 'OFF',
      });
      if (!isEmpty(data.code === 'OK')) {
        fetchDeviceDetail();
        message.success(
          pumpValue
            ? 'Lệnh bật máy bơm đã gửi thành công'
            : 'Lệnh tắt máy bơm đã gửi thành công'
        );
      } else {
        message.error(data.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchDeviceDetail(); // eslint-disable-next-line
  }, [dateView]);
  const onChange = (date, dateString) => {
    setDate(date);
  };
  console.log('device', device);
  let columns = [
    { title: 'Thời gian', dataIndex: 'dt', key: 'dt' },
    { title: 'VIN [V]', dataIndex: 'vin', key: 'vin' },
    { title: 'Trạng thái máy bơm', dataIndex: 'pumpState', key: 'pumpState' },
  ];
  if (!isEmpty(device?.device)) {
    [1, 2, 3, 4, 5, 6, 7, 8].forEach((el) => {
      const tempConfig = device?.device[`config${el}`];
      columns.push({
        title: `${tempConfig.input_name} [${tempConfig.input_unit}]`,
        dataIndex: 'data',
        key: 'config',
        render: (text, row, index) => {
          return row.data[el - 1];
        },
      });
    });
  }
  return (
    <>
      <Modal
        title={
          <Row className="title-modal-custom">
            <span>Thông tin chi tiết thiết bị</span>
            {!isEmpty(device) && (
              <>
                <span className="title-field title-modal-text">
                  Cập nhật lần cuối:{' '}
                  {!isEmpty(device?.device)
                    ? moment(device?.device?.lastReceived).format(FORMAT_DATE)
                    : ''}
                </span>
              </>
            )}
            <span className="title-field title-modal-text">
              <span style={{ marginRight: 12 }}>Chọn ngày hiển thị</span>
              <DatePicker onChange={onChange} value={dateView} />
            </span>
            {device?.device?.hasPump && (
              <span className="title-field title-modal-text">
                <Checkbox
                  onChange={(e) => handlePumpControl(e.target.checked)}
                  checked={device?.device?.pump_state === 'ON'}
                >
                  Bật máy bơm
                </Checkbox>
              </span>
            )}
          </Row>
        }
        visible={true}
        onOk={closeModal}
        onCancel={closeModal}
        footer={null}
        width="95%"
        className="device-modal view-device"
      >
        {!isEmpty(device) ? (
          <>
            <Row gutter={16}>
              <Col span={8} className="device-info">
                <Col className="field-info">
                  <p className="title-field">Device Name</p>
                  <p className="sub-field">{device?.device?.device_name}</p>
                </Col>
                <Col className="field-info">
                  <p className="title-field">Device ID</p>
                  <p className="sub-field">{device?.device?.device_id}</p>
                </Col>
                <Col className="field-info">
                  <p className="title-field">Khu vực</p>
                  <p className="sub-field">{device?.device?.area}</p>
                </Col>
                <Col className="field-info">
                  <p className="title-field">Trạng thái</p>
                  <p
                    className="sub-field"
                    style={{
                      color: device?.device?.status ? '#39ca74' : 'red',
                    }}
                  >
                    {device?.device?.status ? 'Đang kết nối' : 'Mất kết nối'}
                  </p>
                </Col>
              </Col>
              <Col span={16} className="table-container">
                <Table
                  dataSource={
                    !isEmpty(device?.list_data_in_day)
                      ? device?.list_data_in_day
                      : []
                  }
                  columns={columns}
                  pagination={false}
                  bordered
                  scroll={{ y: 350 }}
                  size="small"
                  rowKey={(record) => record?.dt}
                />
              </Col>
            </Row>
          </>
        ) : (
          <Empty style={{ margin: 80 }} />
        )}
      </Modal>
    </>
  );
};
export default ViewDeviceModal;
