import { Button, Modal } from 'antd';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import CollaborationForm from '../CollaborationForm/collaborationForm';

const ArtistContactDetails = ({ recommendationId }: { recommendationId: string }): JSX.Element => {
  const [collaborationModal, setCollaborationModal] = useState(false);
  return (
    <div>
      <Button style={{ marginRight: '0px', marginLeft: '46%' }} type="primary" onClick={() => setCollaborationModal(true)}>Collaborate</Button>
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
        <CollaborationForm recommendationId={recommendationId} />
      </Modal>
    </div>
  );
};

export default ArtistContactDetails;
