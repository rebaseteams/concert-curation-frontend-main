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
    <Layout>
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
            {artists && renderCards(artists)}
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

function renderCards(data: any): any {
  const span = 20 / data.artists_data.length;
  return data.artists_data.map((artist: any, artistIndex: any) => (
    <Col className="card" style={{ height: (artistIndex * 10 + 450) }} span={span}>
      <div className="inner-card" style={{ height: (artistIndex * -30 + 450) }}>
        <div className="card-heading">
          <h3 style={{ color: '#fff' }}>{artist.artist_name}</h3>
          <p>
            {String(artist.match_percentage)}
            %
          </p>
        </div>
        <div className="vanue">
          <div>
            <span className="material-icons" style={{ fontSize: '35px', color: '#f32' }}>location_on</span>
          </div>
          <ul>
            {artist.match_attributes.venues.map((vanue: any, index:any) => (
              <li key={index}>
                {vanue.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="affinity">
          <h6>Affinities</h6>
          <div className="field">
            <h5>
              Age
              {' '}
              <span>{artist.match_attributes.age}</span>
              {' '}
            </h5>
          </div>

          <div className="field">
            <h5>
              Gender
              {' '}
              <span>{artist.match_attributes.gender}</span>
              {' '}
            </h5>
          </div>

          <div className="field">
            <h5>
              Genre
              {' '}
              <span>{artist.match_attributes.genre}</span>
              {' '}
            </h5>
          </div>
        </div>

        {/* <div className="vanue">
          <h6>Associated Brands</h6>
          <ul />
        </div> */}
      </div>
    </Col>
  ));
}

export default LayoutComponent;
