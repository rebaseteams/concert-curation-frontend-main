import React, { useState } from 'react';
import {
  PageHeader, Image, Button, Modal,
} from 'antd';
// import { useParams } from 'react-router-dom';
import CollaborationForm from '../../components/collaborationForm';

const ArtistPage = (): JSX.Element => {
  // const { id }: {id: string} = useParams();
  const [collaborationModal, setCollaborationModal] = useState(false);
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Nick"
        subTitle="Hip pop singer"
      />
      <Image
        width={200}
        src="https://randomuser.me/api/portraits/men/99.jpg"
      />
      <Modal
        title="Collaboration"
        centered
        visible={collaborationModal}
        onCancel={() => setCollaborationModal(false)}
        width={600}
        footer={false}
      >
        <CollaborationForm />
      </Modal>
      <Button type="default" onClick={() => setCollaborationModal(true)}>collaborate</Button>
    </div>
  );
};
export default ArtistPage;
