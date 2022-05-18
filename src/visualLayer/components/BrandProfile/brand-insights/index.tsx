/* eslint-disable react/jsx-indent */
import { Col, Row, Tabs } from 'antd';
import _ from 'lodash';
import AnalyticsCard from '../../AnalyticsCard';
import PieChart from '../../Chart/pie';
import { NewBrandResponse } from '../../../../model/types/brand';

const { TabPane } = Tabs;

const BrandInsights = ({ brand }: { brand: NewBrandResponse }): JSX.Element => {
  const youTubeAnalyticsData = [
    {
      field: 'Subscribers',
      value: brand.youtube_insights.channel.subscribersCount,
    },
    {
      field: 'Avg Likes',
      value: brand.youtube_insights.channel.avgLikesCount,
    },
    {
      field: 'Engagment Ratio',
      value: brand.youtube_insights.channel.engagementRatio,
    },
    {
      field: 'Avg Views',
      value: brand.youtube_insights.channel.avgViewsCount,
    },
  ];
  return (
    <Tabs style={{ border: 'none' }} type="card" defaultActiveKey="youtube-tab" centered>
      <TabPane tab="Youtube Analytics" key="youtube-tab">
        <AnalyticsCard data={youTubeAnalyticsData} />
        <Row>
          { _.map(brand.demographics, (res) => (
            <Col md={{ span: 8 }}>
              <div>
                <PieChart
                  type="donut"
                  // TODO: should come from backend or/and inMemory
                  data={res.fields}
                  colors={['red', 'green', 'aqua']}
                  classes=""
                  XLables={[res.demographicName]}
                />
              </div>
            </Col>
          ))}
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

export default BrandInsights;
