import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import MapGoogle from './components/MapGoogle';
import DevicesList from './components/DevicesList';
import './Map.scss';
import { getUserInfo } from './MapAction';
import { TOKEN } from 'utils/constants/constants';
import { getUsers } from '../userManagement/UserManagementAction';
import { isEmpty } from 'utils/helpers/helpers';

const Map = (props) => {
  const { users } = props;
  const [userInfo, setUserInfo] = useState({});
  let isMounted = true;
  const fetchUserList = () => {
    if (isMounted) props.getUsers();
  };
  const fetchData = async () => {
    try {
      if (isMounted) {
        const { data } = await getUserInfo({
          [TOKEN]: localStorage.getItem(TOKEN),
        });
        if (!isEmpty(data.data)) {
          if (JSON.stringify(userInfo) !== JSON.stringify(data.data)) {
            setUserInfo(data.data);
          }
        } else {
          message.error(data.message);
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    // eslint-disable-next-line
    isMounted = true;
    fetchData();
    fetchUserList();
    const interval = setInterval(() => fetchData(), 10000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []);
  return (
    <div
      style={{
        height: 'calc(100vh - 64px)',
        width: '100%',
        background: '#F5F5F5',
        position: 'relative',
      }}
      className="map-container"
    >
      <MapGoogle />
      <DevicesList
        userInfo={userInfo}
        userList={users}
        fetchUserList={fetchUserList}
      />
    </div>
  );
};

export default connect(
  (state) => ({
    users: state.system.users,
  }),
  { getUsers }
)(withRouter(Map));
