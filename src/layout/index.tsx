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
import { Layout } from 'antd';

// Styles
import './layout.scss';
import { Content } from 'antd/lib/layout/layout';

// Components
import HeaderComponet from './header';
import DashboardComponent from '../components/dashboard';
import RecommendationPage from '../components/RecommendationPage';

const LayoutComponent = ():JSX.Element => (
  <Layout
    style={{ background: 'none' }}
    className="layout-container"
  >
    <HeaderComponet />

    <Layout>
      <Content
        className="layout-body"
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <DashboardComponent />
            </Route>
            <Route path="/recommendations/:id" exact>
              {/* emable this for card View */}
              {/* <RecommendationComponent /> */}
              <RecommendationPage />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  </Layout>
);

export default LayoutComponent;
