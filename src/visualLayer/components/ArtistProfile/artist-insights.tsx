import { Tabs } from 'antd';
import React from 'react';
import AnalyticsCard from '../AnalyticsCard';

const { TabPane } = Tabs;

const ArtistInsights = (): JSX.Element => (
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
);

export default ArtistInsights;
