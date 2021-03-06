/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Button,
  Image,
  Tabs,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArtistNew } from '../../../model/types/artist';

// Importing components
import IconRenderer from '../IconRenderer';
import ArtistOverview from './artist-overview/index';
import ArtistInsights from './artist-insights/index';
import ArtistToursView from './artist-tour';
import ArtistContactDetails from './artist-contact';

// styles
import './artistprofile.scss';
import { TemplatesInterface } from '../../../model/interfaces/templates';
import { DocumentsInterface } from '../../../model/interfaces/documents';

const { Title } = Typography;
const { TabPane } = Tabs;

type ArtistProfileProp = {
  artist: ArtistNew,
  recommendationId: string,
  templatesService: TemplatesInterface,
  documentsService: DocumentsInterface,
}

const createArtistProfile = ({
  artist, recommendationId, templatesService, documentsService,
}: ArtistProfileProp): () => JSX.Element | null => {
  return function ArtistProfile(): JSX.Element {
    const navigate = useNavigate();
    const redirectBack = () => {
      navigate(-1);
    };
    return (
      <div className="artist-profile-container">
        <div
          className="artist-profile-heading"
          style={{
            background: `url(${artist.coverImage})`, // 'url(https://picsum.photos/1500/600?random=2)',
          }}
        >
          <Button className="back-button" type="text" onClick={() => redirectBack()}>
            {IconRenderer('back')}
          </Button>
          <Image
            className="profile-pic"
            width={200}
            src={artist.image}
            preview={false}
          />
          <Title className="artist-name" level={1}>{artist.name}</Title>
        </div>
        <div className="artist-profile-body">
          <Tabs centered>
            <TabPane tab="Overview" key="overview-tab">
              <div>
                <ArtistOverview artist={artist} />
              </div>
            </TabPane>
            <TabPane tab="Insights" key="insights-tab">
              <ArtistInsights artist={artist} />
            </TabPane>
            <TabPane tab="Tour Details" key="tour-tab">
              <ArtistToursView />
            </TabPane>
            <TabPane tab="Contact details" key="contact-tab">
              <ArtistContactDetails
                recommendationId={recommendationId}
                artistId={artist.id}
                templateService={templatesService}
                documentService={documentsService}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };
};

export default createArtistProfile;
