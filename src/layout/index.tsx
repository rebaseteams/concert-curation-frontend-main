/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Layout, Col, Row,
} from 'antd';

// Styles
import './layout.scss';

// Components
import HeaderComponet from './header';
import DashboardComponent from '../components/dashboard';
import RecommendationComponent from '../components/RecomendationComponent';
import ArtistPieChart from '../components/ArtistPieChart/ArtistPieChart';
import ConcertData from '../components/concertData';

// import CardView from '../components/cardView';
const { Content } = Layout;

const LayoutComponent = ():JSX.Element => (
  <Layout style={{ background: 'none' }} className="layout-container">
    <HeaderComponet />
    {/* Commenting this for now later will be utilized for displaying recomended artist */}
    {/* <Content>
        <div className="layout-workspace">
          <Row align="middle">
            <Col span={14} style={{ border: '0px solid black' }}>
              <Row className="card-container" align="bottom">
                { artists && <CardView data={artists.slice(0, 3)} artistClicked={artistClicked} /> }
              </Row>
            </Col>
            <Col span={10} style={{ padding: '20px', border: '0px solid black' }}>
              { summary && showSummary(summary) }
            </Col>
          </Row>
        </div>
      </Content> */}

    <Router>
      <Switch>
        <Route path="/" exact>
          <DashboardComponent />
        </Route>
        <Route path="/recommendations/:id" exact>
          {/* <RecommendationComponent /> */}
          <Row>
            <Col span={6}>
              <ConcertData />
            </Col>
            <Col span={12}>
              <ArtistPieChart />
            </Col>
            <Col
              span={6}
            >
              Summary
            </Col>
          </Row>
        </Route>
      </Switch>
    </Router>
  </Layout>
);

export default LayoutComponent;
