import React, { useEffect, useState } from 'react';
import {
  PageHeader, Button, Spin, Modal,
} from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import createArtistProfile from '../../components/ArtistProfile';
import services from '../../services';
import { ArtistNew } from '../../../model/types/artist';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';

const ArtistPage = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams(); // TODO: Use this id to sfetch artists information
  const [artist, setArtist] = useState<ArtistNew>();
  const { state }: { state: { recommendationId: string } } = useLocation();
  const recommendationId = state ? state.recommendationId : '';
  const navigate = useNavigate();
  const [collaborationModal, setCollaborationModal] = useState(false);

  const redirectBack = () => {
    navigate(-1);
  };

  const getArtistData = async () => {
    const response = await services.Artist.getArtist('Artist1');
    if (response.error) {
      return;
    }
    setArtist(response.data);
  };

  useEffect(() => {
    getArtistData();
  }, []);

  if (!artist) {
    return <Spin />;
  }
  const ArtistProfile = createArtistProfile({
    artist,
  });
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => redirectBack()}
        title={artist.name}
        subTitle={artist.bio.split(' ').slice(0, 6).join(' ')}
        extra={[
          <Button type="primary" onClick={() => setCollaborationModal(true)}>Collaborate</Button>,
        ]}
      />
      <div style={{ height: '88vh', overflow: 'auto' }}>
        <ArtistProfile />
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
        <CollaborationForm recommendationId={recommendationId} />
      </Modal>
    </div>
  );
};
export default ArtistPage;
