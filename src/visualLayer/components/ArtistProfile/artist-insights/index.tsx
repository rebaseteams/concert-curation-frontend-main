import { Col, Row, Tabs } from 'antd';
import { ArtistNew } from '../../../../model/types/artist';
import AnalyticsCard from '../../AnalyticsCard';
import PieChart from '../../Chart/pie';

const { TabPane } = Tabs;

const ArtistInsights = ({ artist }: {artist: ArtistNew}): JSX.Element => {
  const youTubeAnalyticsData = [
    {
      field: 'Subscribers',
      value: artist.youtubeInsights.channel.subscribersCount,
    },
    {
      field: 'Avg Likes',
      value: artist.youtubeInsights.channel.avgLikesCount,
    },
    {
      field: 'Engagment Ration',
      value: artist.youtubeInsights.channel.engagementRatio,
    },
    {
      field: 'Avg Views',
      value: artist.youtubeInsights.channel.avgViewsCount,
    },
  ];
  return (
    <Tabs style={{ border: 'none' }} type="card" defaultActiveKey="youtube-tab" centered>
      <TabPane tab="Youtube Analytics" key="youtube-tab">
        <AnalyticsCard data={youTubeAnalyticsData} />
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
};

export default ArtistInsights;
