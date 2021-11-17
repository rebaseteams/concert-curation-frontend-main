/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  Layout, Row, Col, Button,
  Modal,
} from 'antd';

import SendEamilForm from '../sendEamilForm';

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
  const [sendEmailModal, setSendEmailModal] = useState(false);

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
          <Button
            onClick={() => setSendEmailModal(true)}
          >
            <span className="material-icons">
              share
            </span>
          </Button>
          <Modal
            title="Enter email"
            centered
            visible={sendEmailModal}
            onOk={() => setSendEmailModal(false)}
            onCancel={() => setSendEmailModal(false)}
            footer={false}
          >
            <SendEamilForm setSendEmailModal={setSendEmailModal} />
          </Modal>
          <Row className="card-container" align="bottom">
            { artists && (
            <CardView
              data={artists.slice(0, 3)}
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
