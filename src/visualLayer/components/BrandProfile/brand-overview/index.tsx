import {
  Col, Progress, Row, Typography,
} from 'antd';
import millify from 'millify';
import _ from 'lodash';
import Line from '../../Chart/lineChart';
import { NewBrandResponse } from '../../../../model/types/brand';

const { Text, Title } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mediaColors: any = {
  youtube: '#F22',
  twitter: 'rgb(60, 167, 255)',
  spotify: '#2F4',
};

const BrandOverview = ({ brand }: { brand: NewBrandResponse }): JSX.Element => {
  const totalFollowers = 1200000;
  const progressPercent = totalFollowers >= 5000000
    ? 100
    : Math.round((totalFollowers * 100) / 5000000);
  return (
    <div className="brand-profile-overview">
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
          {/* Brand Media Handles data should be in format with Artist Media Handles from DB */}
          { brand.media_handles.map((media) => {
            const mediaColor: string = mediaColors[media.handleName] || '#FFF';
            return (
              <Col span={14} key={media.handleName}>
                <div className="row-flex align-center" style={{ color: mediaColor }}>
                  <div className="column-flex">
                    <a href={media.url} target="_blank" rel="noreferrer">
                      <Text style={{ color: mediaColor, fontSize: '20px' }}>
                        {`${media.handleName ? media.handleName : 'Currently Not Available'}`}
                      </Text>
                    </a>
                  </div>
                </div>
              </Col>
            );
          }) }
        </Row>
        <Col span={12}>
          <Line
            data={brand.brand_affinity}
            xLables={['Affinity over brands']}
            strokeWidth={2}
            background="#000"
            forground="#FFF"
            aspect={2}
          />
        </Col>
      </div>

      <Title className="mx-5" level={2}>Latest Release</Title>
      <Row>
        { _.map(brand.latest_youtube_release, (video) => (
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

export default BrandOverview;
