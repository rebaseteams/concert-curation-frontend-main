import {
  Spin,
} from 'antd';
import { useArtistData as defaultuseArtistData, UseArtistData } from '../../../hooks/useArtistData';
import createArtistProfile from '../../components/ArtistProfile';
import ArtistInterface from '../../../model/interfaces/artist';
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { DocumentsInterface } from '../../../model/interfaces/documents';

interface createArtistPageProp {
  artistService: ArtistInterface;
  templatesService: TemplatesInterface;
  documentsService: DocumentsInterface;
  useArtistData?: UseArtistData;
}

const createArtistPage = ({
  artistService,
  templatesService,
  documentsService,
  useArtistData = defaultuseArtistData,
}:
  createArtistPageProp):
  () => JSX.Element => {
  const ArtistPage = (): JSX.Element => {
    const { artist, recommendationId } = useArtistData(artistService);
    if (!artist) {
      return <Spin />;
    }
    const ArtistProfile = createArtistProfile({
      artist, recommendationId, templatesService, documentsService,
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
