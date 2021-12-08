import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArtistNew } from '../../../model/types/artist';
import CollaborationForm from '../CollaborationForm/collaborationForm';

const ArtistContactDetails = ({ artist }: { artist: ArtistNew }): JSX.Element => {
  // eslint-disable-next-line no-console
  console.log(artist);
  const { state }: { state: { recommendationId: string } } = useLocation();
  const recommendationId = state ? state.recommendationId : '';
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
