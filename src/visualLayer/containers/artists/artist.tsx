import React, { useState } from 'react';
import {
  PageHeader, Image, Button, Modal,
} from 'antd';
import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';

const ArtistPage = (): JSX.Element => {
  // const { id }: {id: string} = useParams();
  const history = useHistory();
  const [collaborationModal, setCollaborationModal] = useState(false);

  const redirectBack = () => {
    history.goBack();
  };
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => redirectBack()}
        title="Nick"
        subTitle="Hip hop singer"
        extra={[
          <Button type="primary" onClick={() => setCollaborationModal(true)}>Collaborate</Button>,
        ]}
      />
      <Image
        width={300}
        src="https://randomuser.me/api/portraits/men/15.jpg"
      />
      <Modal
        bodyStyle={{
          height: '500px',
          overflowY: 'auto',
        }}
        centered
        visible={collaborationModal}
        onCancel={() => setCollaborationModal(false)}
        width={800}
        footer={false}
      >
        <CollaborationForm />
      </Modal>
    </div>
  );
};
export default ArtistPage;
