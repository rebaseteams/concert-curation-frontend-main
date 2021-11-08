/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { Layout, Row, Col } from 'antd';

import CardView from '../cardView';

import getRecommendedArtists from '../../services/getRecommendedArtists';

import { RecommendedData, ArtistsDataInterface, ConcertDataInterface } from './recomendedDataInterface';

const Content = Layout;

function showSummary(summary:string):JSX.Element {
  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

const RecommendationComponent = (): JSX.Element => {
  const [summary, setSummary] = useState('');
  const [artists, setArtists] = useState<Array<ArtistsDataInterface>>();
  const [concertData, setConcertData] = useState<ConcertDataInterface>();

  const getData = async () => {
    const recommendedData: RecommendedData = await getRecommendedArtists('8787383');
    setArtists(recommendedData.artists);
    setConcertData(recommendedData.concertData);
  };
  useEffect(() => {
    getData();
  }, []);
  const artistClicked = (artistSummary: string) => {
    setSummary(artistSummary);
  };
  return (
    <Content className="layout-workspace">
      <Row align="middle" style={{ background: '#FFF00' }}>
        <Col span={14} style={{ border: '0px solid black' }}>
          <Row className="card-container" align="bottom">
            { artists && (
            <CardView
              data={artists.slice(0, 3)}
              artistClicked={artistClicked}
            />
            ) }
          </Row>
        </Col>
        <Col span={10} style={{ padding: '20px', border: '0px solid black' }}>
          { summary && showSummary(summary) }
        </Col>
      </Row>
    </Content>
  );
};

export default RecommendationComponent;
