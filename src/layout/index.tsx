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
  Link,
} from 'react-router-dom';
import { Layout, Result } from 'antd';

// Styles
import './layout.scss';
import { Content } from 'antd/lib/layout/layout';

// Components
import HeaderComponet from './header';
import DashboardComponent from '../components/dashboard';
import RecommendationPage from '../components/RecommendationPage';
import EditorComponent from '../visualLayer/containers/editor';
import Signup from '../visualLayer/containers/signup/signup';
import ArtistPage from '../visualLayer/containers/artists/artist';

const LayoutComponent = ():JSX.Element => (
  <Layout
    style={{ background: 'none' }}
    className="layout-container"
  >

    <Layout>
      <Content
        className="layout-body"
      >
        <Router>
          <Switch>
            <Route path="/" exact>
              <HeaderComponet />
              <DashboardComponent />
            </Route>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/recommendations/:id" exact>
              {/* emable this for card View */}
              {/* <RecommendationComponent /> */}
              <RecommendationPage />
            </Route>
            <Route path="/artist/:id">
              <ArtistPage />
            </Route>
            <Route path="/editor/:id" exact>
              <EditorComponent />
            </Route>
            <Route path="/*" exact>
              <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Link to="/">Back Home</Link>}
              />
            </Route>
          </Switch>
        </Router>
      </Content>
    </Layout>
  </Layout>
);

export default LayoutComponent;
