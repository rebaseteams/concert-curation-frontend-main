import React from 'react';
import {
  Col, Progress, Row, Typography,
} from 'antd';
import { ArtistNew } from '../../../../model/types/artist';

const { Text } = Typography;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mediaColors: any = {
  facebook: '#22F',
  youtube: '#F22',
  twitter: 'rgb(60, 167, 255)',
  spotify: '#2F4',
};

const ArtistOverview = ({ artist }: {artist: ArtistNew}): JSX.Element => (
  <div className="artist-profile-overview">
    <div className="row-flex justify-between align-center fan-container">
      <div className="column-flex align-center fan-circle">
        <Text type="secondary">Fans</Text>
        <Progress width={160} strokeWidth={10} strokeColor="#3FF" type="circle" percent={75} format={() => `${artist.popuarity}`} />
      </div>
      <Row style={{ width: '700px', height: '100%' }}>
        { artist.mediaHandles.map((media) => {
          const mediaColor: string = mediaColors[media.handleName] || '#FFF';
          return (
            <Col span={12}>
              <div className="row-flex align-center" style={{ color: mediaColor }}>
                <img
                  alt={media.handleName}
                  src={media.logo}
                  style={{ width: '70px', height: '70px', marginRight: '10px' }}
                />
                <div className="column-flex">
                  <Text style={{ color: mediaColor, fontSize: '23px' }}>{`${media.handleName} Followers`}</Text>
                  <Text style={{ color: mediaColor, fontSize: '25px' }}>{media.followers}</Text>
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

export default ArtistOverview;
