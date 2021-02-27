import React, { useState } from 'react';
import { Collapse } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import '../Map.scss';
import { isEmpty } from 'utils/helpers/helpers';
import AddDeviceModal from './AddDeviceModal';
import RemoveDeviceModal from './RemoveDeviceModal';

const { Panel } = Collapse;

let itemSelected = null;
let device_id = null;
const DevicesList = (props) => {
  const { userInfo, userList, fetchUserList } = props;
  const [visible, setVisible] = useState(null);
  console.log('userInfo', userInfo, userList);
  console.log('visible', visible);

  const genExtra = (item) => (
    <PlusOutlined
      title="Thêm device"
      onClick={(event) => {
        setVisible('add');
        itemSelected = item;
        event.stopPropagation();
      }}
    />
  );
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
                el.Value.listDevices.map((it) => (
                  <p key={it} className="device-item ">
                    {it}
                    <DeleteOutlined
                      className="icon-center"
                      onClick={(event) => {
                        setVisible('remove');
                        itemSelected = el;
                        device_id = it;
                        event.stopPropagation();
                      }}
                    />
                  </p>
                ))}
              {!isEmpty(el.Value.listDevices) &&
                el.Value.listDevices.map((it) => (
                  <p key={it} className="device-item ">
                    {it}
                    <DeleteOutlined
                      className="icon-center"
                      onClick={(event) => {
                        setVisible('remove');
                        itemSelected = el;
                        device_id = it;
                        event.stopPropagation();
                      }}
                    />
                  </p>
                ))}
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
    </div>
  );
};

export default withRouter(DevicesList);
