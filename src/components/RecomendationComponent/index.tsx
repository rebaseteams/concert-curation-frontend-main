/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import { Layout, Row, Col } from 'antd';

import CardView from '../cardView';

import getRecommendedArtists from '../../services/getRecommendedArtists';
import userRecommendationChoice from '../../services/userRecommendationChoice';

const Content = Layout;
const discardedArtistList: any[] = [];

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
  const [artists, setArtists] = useState<any[]>([]);
  const [discardedArtists, setDiscardedArtists] = useState<any[]>([]);
  const [concertData, setConcertData] = useState({ concertName: null });

  const getData = async () => {
    const recommendedData: any = await getRecommendedArtists('8787383');
    setArtists(recommendedData.artists);
    setConcertData(recommendedData.concertData);
  };
  useEffect(() => {
    getData();
  }, []);
  const artistClicked = (artistSummary: string) => {
    setSummary(artistSummary);
  };
  const onRemoveArtist = (removedArtistName: any) => {
    let artistList: any[];
    const userId = '1234';
    const artistToRemove = artists.find((a) => a.artistName === removedArtistName);
    if (artistToRemove) {
      discardedArtistList.push(artistToRemove);
      setDiscardedArtists(discardedArtists);
      artistList = artists.filter((value) => value !== artistToRemove);
      setArtists(artistList);
    }
    userRecommendationChoice(userId, discardedArtists, artists);
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
              onRemoveArtist={onRemoveArtist}
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
