import { Col, Row, Tabs } from 'antd';
import React from 'react';
import { youtubeAnalytics } from '../../../../dataLayer/repositories/inmemory/mockData/analyticsData';
import AnalyticsCard from '../../AnalyticsCard';
import PieChart from '../../Chart/pie';

const { TabPane } = Tabs;

const ArtistInsights = (): JSX.Element => (
  <Tabs style={{ border: 'none' }} type="card" defaultActiveKey="youtube-tab" centered>
    <TabPane tab="Youtube Analytics" key="youtube-tab">
      <AnalyticsCard data={youtubeAnalytics} />
      <Row>
        <Col md={{ span: 8 }}>
          <div>
            <PieChart
              type="donut"
              data={[{ label: 'Male', value: 86 }, { label: 'Female', value: 14 }]}
              colors={['red', 'green', 'aqua']}
              classes=""
              XLables={['Audience gender']}
            />
          </div>
        </Col>
      </Row>
    </TabPane>

    <TabPane tab="Twitter Analytics" key="twitter-tab">
      <h1>Twitter Analytics</h1>
    </TabPane>

    <TabPane tab="Spotify Analytics" key="spotify-tab">
      <h1>Spotify Analytics</h1>
    </TabPane>
  </Tabs>
);

export default ArtistInsights;
