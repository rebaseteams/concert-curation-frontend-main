import React, { useEffect, useState } from 'react';
import {
  PageHeader, Image, Button, Modal, Spin,
} from 'antd';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import CollaborationForm from '../../components/CollaborationForm/collaborationForm';
import services from '../../services';
import { Artist } from '../../../model/types/artist';

const ArtistPage = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams(); // TODO: Use this id to sfetch artists information
  const [artist, setArtist] = useState<Artist>();
  const { state }: { state: { recommendationId: string } } = useLocation();
  const { recommendationId } = state;
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
  return (
    <div>
      <PageHeader
        className="site-page-header"
        onBack={() => redirectBack()}
        title={artist.artistName}
        subTitle={artist.artistBio.split(' ').slice(0, 6).join(' ')}
        extra={[
          <Button type="primary" onClick={() => setCollaborationModal(true)}>Collaborate</Button>,
        ]}
      />
      <Image
        width={300}
        src={artist.artistImage}
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
