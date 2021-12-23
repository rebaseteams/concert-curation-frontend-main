import { Button, Modal } from 'antd';
import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import CollaborationForm from '../CollaborationForm/collaborationForm';
import collaborationImage from '../../../assets/job.png';

const ArtistContactDetails = ({ recommendationId, artistId }:
  { recommendationId: string; artistId: string }): JSX.Element => {
  const [collaborationModal, setCollaborationModal] = useState(false);
  return (
    <div style={{ width: '70%', margin: 'auto' }} className="row-flex ">
      <img
        src={collaborationImage}
        alt="collaboration"
        width={400}
      />
      <div className="width-100 column-flex justify-center align-center">
        <h4 style={{ fontSize: '50px', fontWeight: 100 }}>Collaborate Now</h4>
        <Button style={{ }} type="primary" onClick={() => setCollaborationModal(true)}>Select Template</Button>
      </div>
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
        <CollaborationForm recommendationId={recommendationId} artistId={artistId} />
      </Modal>
    </div>
  );
};

export default ArtistContactDetails;
