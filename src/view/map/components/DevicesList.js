import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import '../Map.scss';
import { isEmpty } from 'utils/helpers/helpers';
import AddDeviceModal from './AddDeviceModal';
import RemoveDeviceModal from './RemoveDeviceModal';
import EditDeviceModal from './EditDeviceModal';
import ViewDeviceModal from './ViewDeviceModal';

const { Panel } = Collapse;

let itemSelected = null;
let device_id = null;
const DevicesList = (props) => {
  const {
    account,
    userInfo,
    userList,
    deviceList,
    deviceSelected,
    fetchUserList,
    handleSelectDevice,
  } = props;
  const [visible, setVisible] = useState(null);
  const isAdmin = !isEmpty(account) && account.permission === 'admin';
  const genExtra = (item) => {
    if (!isAdmin) return null;
    return (
      <PlusOutlined
        title="Thêm device"
        onClick={(event) => {
          setVisible('add');
          itemSelected = item;
          event.stopPropagation();
        }}
      />
    );
  };
  const handleCloseModal = () => {
    itemSelected = null;
    device_id = null;
    setVisible(null);
  };
  return (
    <div className="device-list">
      <Collapse defaultActiveKey={['1']} ghost>
        {!isEmpty(userList) &&
          userList.map((el) => (
            <Panel header={el.Value.username} key={el.Key} extra={genExtra(el)}>
              {!isEmpty(el.Value.listDevices) &&
                el.Value.listDevices.map((it) => {
                  const item = deviceList.find((v) => v.device_id === it);
                  console.log('el', item);
                  return (
                    <p
                      key={it}
                      className={`device-item ${
                        deviceSelected.device_id === it ? 'active-device' : ''
                      }`}
                      onClick={() => handleSelectDevice(item)}
                    >
                      <span
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          marginRight: 8,
                        }}
                        title={`${item ? item.device_name : ''} (${it})`}
                      >
                        <Radio
                          checked
                          className={
                            item.status ? 'online-device' : 'offline-device'
                          }
                        />
                        {item ? item.device_name : ''} ({it})
                      </span>
                      <span style={{ display: 'flex' }}>
                        <EyeOutlined
                          className="icon-center"
                          title="Xem chi tiết"
                          style={{ marginRight: 8 }}
                          onClick={(event) => {
                            itemSelected = el;
                            device_id = it;
                            setVisible('view');
                            event.stopPropagation();
                          }}
                        />
                        {isAdmin && (
                          <>
                            <EditOutlined
                              className="icon-center"
                              title="Chỉnh sửa cấu hình"
                              style={{ marginRight: 8 }}
                              onClick={(event) => {
                                itemSelected = el;
                                device_id = it;
                                setVisible('edit');
                                event.stopPropagation();
                              }}
                            />
                            <DeleteOutlined
                              className="icon-center"
                              title="Xóa device"
                              onClick={(event) => {
                                itemSelected = el;
                                device_id = it;
                                setVisible('remove');
                                event.stopPropagation();
                              }}
                            />
                          </>
                        )}
                      </span>
                    </p>
                  );
                })}
            </Panel>
          ))}
      </Collapse>
      {visible === 'add' && (
        <AddDeviceModal
          fetchData={fetchUserList}
          item={itemSelected}
          handleClose={handleCloseModal}
        />
      )}
      {visible === 'remove' && (
        <RemoveDeviceModal
          fetchData={fetchUserList}
          item={itemSelected}
          device_id={device_id}
          handleClose={handleCloseModal}
        />
      )}
      {visible === 'edit' && (
        <EditDeviceModal
          fetchData={fetchUserList}
          device_id={device_id}
          deviceInfo={userInfo.list_device_info.find(
            (v) => v.device_id === device_id
          )}
          handleClose={handleCloseModal}
        />
      )}
      {visible === 'view' && (
        <ViewDeviceModal device_id={device_id} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default withRouter(DevicesList);
