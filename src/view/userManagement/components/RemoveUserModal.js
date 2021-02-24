import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { removeUser } from '../UserManagementAction';
import { TOKEN } from 'utils/constants/constants';
import { isEmpty } from 'utils/helpers/helpers';

const RemoveUserModal = (props) => {
  const { item, fetchData } = props;
  const [visible, setVisible] = useState(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);
  const onSubmit = async () => {
    try {
      const { data } = await removeUser({
        username: item.Value.username,
        [TOKEN]: localStorage.getItem(TOKEN),
      });
      if (!isEmpty(data.data)) {
        if (fetchData) fetchData();
        message.success('Xóa người dùng thành công');
        closeModal();
      } else {
        message.error(data.message);
      }
    } catch (err) {}
  };

  return (
    <>
      <Button type="danger" onClick={openModal}>
        Xóa
      </Button>
      <Modal
        title="Xóa người dùng"
        visible={visible}
        onOk={onSubmit}
        onCancel={closeModal}
      >
        <span>
          Bạn có chắc chắn muốn xóa người dùng: <b>{item.Value.username}</b>
        </span>
      </Modal>
    </>
  );
};
export default RemoveUserModal;
