import React, { useState } from 'react';
import {
  PageHeader, Image, Button, Modal,
} from 'antd';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';

const ArtistPage = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id }: {id: string} = useParams(); // TODO: Use this id to sfetch artists information
  const { state }: { state: { recommendationId: string } } = useLocation();
  const { recommendationId } = state;
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
        title="Artist name"
        subTitle="rock start"
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
        <CollaborationForm recommendationId={recommendationId} />
      </Modal>
    </div>
  );
};
export default ArtistPage;
