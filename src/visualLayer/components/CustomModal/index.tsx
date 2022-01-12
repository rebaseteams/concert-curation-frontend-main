/* eslint-disable function-paren-newline */
import {
  Modal,
} from 'antd';
import { useState } from 'react';

const CustomModal = (
  title : string,
  okText : string,
  cancelText : string,
  okFunc : () => unknown,
  content : JSX.Element,
) : {modal : JSX.Element, showModal : () => void} => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    okFunc();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return {
    modal: (
      <>
        <Modal
          title={title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={okText}
          cancelText={cancelText}
        >
          {content}
        </Modal>
      </>),
    showModal,
  };
};

export default CustomModal;
