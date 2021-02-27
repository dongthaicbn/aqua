import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';
import './UserManagement.scss';
import UserModal from './components/UserModal';
import { getUsers } from './UserManagementAction';
import RemoveUserModal from './components/RemoveUserModal';
import AddDeviceModal from './components/AddDeviceModal';
import RemoveDeviceModal from './components/RemoveDeviceModal';

const UserManagement = (props) => {
  const { users } = props;
  let isMounted = true;
  const fetchData = () => {
    if (isMounted) props.getUsers();
  };
  useEffect(() => {
    // eslint-disable-next-line
    isMounted = true;
    fetchData();
    return () => {
      // eslint-disable-next-line
      isMounted = false;
    };
  }, []);
  const columns = [
    { title: 'Key', dataIndex: 'Key', key: 'Key' },
    {
      title: 'Permission',
      dataIndex: 'permission',
      key: 'permission',
      render: (value, row, index) => {
        return row.Value.permission;
      },
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (value, row, index) => {
        return row.Value.username;
      },
    },
    {
      title: 'Devices',
      dataIndex: 'listDevices',
      key: 'listDevices',
      width: 400,
      render: (value, row, index) => {
        // return row.Value.listDevices.join(', ');
        return (
          <div>
            {row.Value.listDevices.map((el) => (
              <RemoveDeviceModal
                fetchData={fetchData}
                item={row}
                device_id={el}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 260,
      render: (value, row, index) => {
        return (
          <>
            <AddDeviceModal fetchData={fetchData} item={row} />
            &nbsp;&nbsp;&nbsp;
            <RemoveUserModal item={row} fetchData={fetchData} />
          </>
        );
      },
    },
  ];

  return (
    <div className="user-wrapper">
      <div className="user-header">
        <p className="header-text">Quản lý người dùng</p>
        <UserModal fetchData={fetchData} />
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};
export default connect(
  (state) => ({
    users: state.system.users,
  }),
  { getUsers }
)(withRouter(UserManagement));
