/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import {
  Col,
  Image,
  Progress,
  Row,
  Tabs,
  Typography,
} from 'antd';
import { ArtistNew } from '../../../model/types/artist';

// styles
import './artistprofile.scss';
import AnalyticsCard from '../AnalyticsCard';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

type ArtistProfileProp = {
  artist: ArtistNew,
}

const createArtistProfile = ({
  artist,
}: ArtistProfileProp): () => JSX.Element | null => {
  return function ArtistProfile(): JSX.Element {
    return (
      <div className="artist-profile-container">
        <div
          className="artist-profile-heading"
          style={{
            background: `url(${artist.coverImage})`,
          }}
        >
          <Image
            className="profile-pic"
            width={200}
            src={artist.image}
          />
          <Title className="artist-name" level={1}>{artist.name}</Title>
        </div>
        <div className="artist-profile-body">
          <Tabs defaultActiveKey="overview-tab" centered>
            <TabPane tab="Overview" key="overview-tab">
              <ArtistOverview artist={artist} />
            </TabPane>
            <TabPane tab="Insights" key="insights-tab">
              <Tabs style={{ border: 'none' }} type="card" defaultActiveKey="youtube-tab" centered>
                <TabPane tab="Youtube Analytics" key="youtube-tab">
                  <h1>Youtube Analytics</h1>
                  <AnalyticsCard data={[]} />
                </TabPane>

                <TabPane tab="Twitter Analytics" key="twitter-tab">
                  <h1>Twitter Analytics</h1>
                </TabPane>

                <TabPane tab="Spotify Analytics" key="spotify-tab">
                  <h1>Spotify Analytics</h1>
                </TabPane>
              </Tabs>
            </TabPane>
            <TabPane tab="Tour Details" key="tour-tab">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Contact details" key="contact-tab">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };
};

const ArtistOverview = ({ artist }: {artist: ArtistNew}) => (
  <div className="artist-profile-overview">
    <div className="row-flex justify-between align-center fan-container">
      <div className="column-flex align-center fan-circle">
        <Text type="secondary">Fans</Text>
        <Progress type="circle" percent={75} format={() => `${artist.popuarity}`} />
      </div>
      <Row style={{ width: '700px', height: '100%' }}>
        { artist.mediaHandles.map((media) => {
          return (
            <Col span={12}>
              <div className="row-flex">
                <img
                  alt="spotify logo"
                  src={media.logo}
                  style={{ width: '50px', height: '50px', marginRight: '10px' }}
                />
                <div className="column-flex">
                  <Title level={3}>{media.handleName}</Title>
                  <span>{media.followers}</span>
                </div>
              </div>
            </Col>
          );
        }) }
      </Row>
    </div>

    <Row style={{ marginTop: '20px' }}>
      <Col span={14}>
        <h3>Affinity Over Brands</h3>

      </Col>
      <Col span={10}>
        <h5>Popularity</h5>
      </Col>
    </Row>
  </div>
);

export default createArtistProfile;
