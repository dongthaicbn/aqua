import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';
import './UserManagement.scss';
import UserModal from './components/UserModal';
import { getUsers } from './UserManagementAction';
import RemoveUserModal from './components/RemoveUserModal';

const UserManagement = (props) => {
  const { users } = props;
  let isMounted = true;
  const fetchData = () => {
    if (isMounted) props.getUsers();
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMounted = true;
    fetchData();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (value, row, index) => {
        return <RemoveUserModal item={row} fetchData={fetchData} />;
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
