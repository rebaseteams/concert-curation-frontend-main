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

const { Title } = Typography;
const { TabPane } = Tabs;

type ArtistProfileProp = {
  artist: ArtistNew,
}

const createArtistProfile = ({
  artist,
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
            background: `url(${artist.coverImage})`,
          }}
        >
          <Button className="back-button" type="text" onClick={() => redirectBack()}>{IconRenderer('back')}</Button>
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
              <ArtistInsights />
            </TabPane>
            <TabPane tab="Tour Details" key="tour-tab">
              <ArtistToursView />
            </TabPane>
            <TabPane tab="Contact details" key="contact-tab">
              <ArtistContactDetails artist={artist} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };
};

export default createArtistProfile;
