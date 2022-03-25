import {
  Col, Progress, Row, Typography,
} from 'antd';
import * as _ from 'lodash';
import millify from 'millify';
import latestRelease from '../../../../dataLayer/repositories/inmemory/mockData/latestReleaseVideosa';
import { ArtistNew } from '../../../../model/types/artist';
import Line from '../../Chart/lineChart';
import brandAffinity from '../../../../dataLayer/repositories/inmemory/mockData/brandAffinity';

const { Text, Title } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mediaColors: any = {
  facebook: '#22F',
  youtube: '#F22',
  twitter: 'rgb(60, 167, 255)',
  spotify: '#2F4',
};

const ArtistOverview = ({ artist }: {artist: ArtistNew}): JSX.Element => {
  const totalFollowers: number = _.sumBy(artist.mediaHandles, 'followers');
  const progressPercent = totalFollowers >= 5000000
    ? 100
    : Math.round((totalFollowers * 100) / 5000000);
  return (
    <div className="artist-profile-overview">
      <div className="row-flex justify-between align-center fan-container">
        <div
          className="column-flex align-center fan-circle mx-10"
          style={{ marginLeft: '120px' }}
        >
          <Text type="secondary">Fans</Text>
          <Progress
            width={130}
            strokeWidth={10}
            strokeColor="#3FF"
            type="circle"
            percent={progressPercent}
            format={() => `${millify(totalFollowers)}`}
          />
        </div>
        <Row style={{ width: '700px', height: '100%' }}>
          { artist.mediaHandles.map((media) => {
            const mediaColor: string = mediaColors[media.handleName] || '#FFF';
            return (
              <Col span={12} key={media.handleName}>
                <div className="row-flex align-center" style={{ color: mediaColor }}>
                  <img
                    alt={media.handleName}
                    src={media.logo}
                    style={{ width: '40px', height: '40px', marginRight: '20px' }}
                  />
                  <div className="column-flex">
                    <Text style={{ color: mediaColor, fontSize: '20px' }}>{`${media.handleName} Followers`}</Text>
                    <Text style={{ color: mediaColor, fontSize: '22px' }}>{millify(media.followers)}</Text>
                  </div>
                </div>
              </Col>
            );
          }) }
        </Row>
      </div>

      <Row style={{ margin: '20px 0px' }}>
        <Col span={14}>
          <Line
            data={brandAffinity}
            xLables={['Affinity over brands']}
            strokeWidth={2}
            background="#000"
            forground="#FFF"
            aspect={2}
          />

        </Col>
        <Col span={10}>
          <Line
            data={brandAffinity}
            xLables={['Popularity']}
            strokeWidth={2}
            background="#000"
            forground="#FFF"
            aspect={1.4}
          />
        </Col>
      </Row>

      <Title className="mx-5" level={2}>Latest Release</Title>
      <Row>
        { _.map(latestRelease, (video) => (
          <Col md={{ span: 12 }} xs={{ span: 24 }} key={`${video.title}${video.views}`}>
            <div className="row-flex m-5">
              <div>
                <iframe
                  title={video.title}
                  style={{ border: '0.5px solid #595' }}
                  width="100%"
                  src={video.url}
                  allowFullScreen
                />
              </div>
              <div className="column-flex m-2">
                <Title level={4}>{video.title}</Title>
                <Text>
                  Views
                  {' '}
                  {video.views}
                </Text>
                <Text>
                  Channel
                  {' '}
                  {video.channelName}
                </Text>
                <Text italic>
                  Subscribers
                  {' '}
                  <span>{video.subscribers}</span>
                </Text>
              </div>
            </div>
          </Col>
        )) }
      </Row>
    </div>
  );
};

export default ArtistOverview;
