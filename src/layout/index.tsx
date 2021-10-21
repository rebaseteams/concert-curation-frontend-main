/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Layout, Row, Col } from 'antd';

import './layout.scss';

import React, { useEffect, useState } from 'react';

import HeaderComponet from './header';

import getRecomendedArtists from '../services/getRecomandedArtists';

import CardView from '../components/cardView';

const { Content } = Layout;

const LayoutComponent = ():any => {
  const [artists, setArtists] = useState();

  const getData = async () => {
    const data: any = await getRecomendedArtists({ age: '10-29' });
    setArtists(data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout style={{ background: 'none' }} className="layout-container">
      <HeaderComponet />
      <Content>
        <div className="layout-workspace">
          {/* <Row>
               <Col className="content-box graph-box" span={24}>
                   <PieChart/>
               </Col>
            </Row> */}

          <Row className="card-container" align="bottom">
            <Col span={2} />
            { artists && <CardView data={artists} /> }
            <Col span={2} />
          </Row>
          <Row>
            <Col span={24}>
              <div className="summary-container">
                <h3>Summary</h3>
                <p>
                  Artist 1 is the best sutable option according
                  to your search beacuse he has
                  good popularity at the location Surat
                  and also the Milk products are very related
                  to the artist as he is a Fittest among all other.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
