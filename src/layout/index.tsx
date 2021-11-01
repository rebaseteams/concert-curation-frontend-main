/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Layout, Modal, Button, Row, Col, Card,
} from 'antd';

import './layout.scss';

import React, { useEffect, useState } from 'react';

import HeaderComponet from './header';

import getRecommendedArtists from '../services/getRecommendedArtists';
import DashboardComponent from '../components/dashboard';
import CardView from '../components/cardView';
import RecommendationComponent from '../components/RecomendationComponent';
import ArtistPieChart from '../components/ArtistPieChart/ArtistPieChart';

// import CardView from '../components/cardView';
const { Content } = Layout;

const renderForm = (form: any) => (
  <Col span={24}>
    <Card title={form.event_type}>
      Card content
    </Card>
  </Col>
);

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
          <ArtistPieChart />
        </Route>
      </Switch>
    </Router>
  </Layout>
);

export default LayoutComponent;
