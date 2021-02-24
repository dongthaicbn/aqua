import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'antd';
import { connect } from 'react-redux';
import './UserManagement.scss';
import UserModal from './components/UserModal';
// import api from '../../utils/helpers/api';

const UserManagement = (props) => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="user-wrapper">
      <div className="user-header">
        <p className="header-text">Quản lý người dùng</p>
        <UserModal />
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
export default connect(
  (state) => ({
    // isLoading: state.system.isLoading
  }),
  {}
)(withRouter(UserManagement));
