import {
  Spin,
} from 'antd';
import { useArtistData as defaultuseArtistData, UseArtistData } from '../../../hooks/useArtistData';
import createArtistProfile from '../../components/ArtistProfile';
import ArtistInterface from '../../../model/interfaces/artist';

interface createArtistPageProp {
  artistService: ArtistInterface
  useArtistData?: UseArtistData;
}

const createArtistPage = ({ artistService, useArtistData = defaultuseArtistData }:
  createArtistPageProp):
  () => JSX.Element => {
  const ArtistPage = (): JSX.Element => {
    const { artist } = useArtistData(artistService);

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

  return ArtistPage;
};

export default createArtistPage;
