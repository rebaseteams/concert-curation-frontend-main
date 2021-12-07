import { useEffect, useState } from 'react';
import {
  Spin,
} from 'antd';
import { useParams } from 'react-router-dom';
import createArtistProfile from '../../components/ArtistProfile';
import services from '../../services';
import { ArtistNew } from '../../../model/types/artist';

const ArtistPage = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams(); // TODO: Use this id to sfetch artists information
  const [artist, setArtist] = useState<ArtistNew>();

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
      <div style={{ height: '88vh', overflow: 'auto' }}>
        <ArtistProfile />
      </div>
    </div>
  );
};
export default ArtistPage;
