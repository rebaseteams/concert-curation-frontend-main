/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Layout, Modal, Button, Row, Col, Card,
} from 'antd';

import './layout.scss';

import React, { useEffect, useState } from 'react';

import HeaderComponet from './header';

import getRecommendedArtists from '../services/getRecommendedArtists';

// import CardView from '../components/cardView';
import QuestionsForm from '../components/question/index';

import SubmittedCard from '../components/submittedCard';

import { returnMockData } from '../services/submitForm';

const { Content } = Layout;

const renderForm = (form: any) => (
  <Col span={24}>
    <Card title={form.event_type}>
      Card content
    </Card>
  </Col>
);

const LayoutComponent = ():JSX.Element => {
  const [artists, setArtists] = useState([]);
  const [summary, setSummary] = useState('');
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [forms, setForms] = useState([returnMockData]);

  const getData = async () => {
    const data:any = await getRecommendedArtists('8787383');
    if (!data.error) {
      setArtists(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const artistClicked = (artistSummary: string) => {
    setSummary(artistSummary);
  };

  return (
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

      <Content>
        <Button type="primary" onClick={() => setDisplayFormModal(true)}>
          Curate Concert
        </Button>
        <Modal
          title="Choose your prefrences"
          centered
          style={
            {
              height: 'calc(100vh - 100px)',
              overflowY: 'scroll',
              padding: '0',
            }
          }
          visible={displayFormModal}
          onOk={() => setDisplayFormModal(false)}
          onCancel={() => setDisplayFormModal(false)}
          width={800}
          className="questionsModal"
          footer={false}
        >
          <QuestionsForm setVisible={setDisplayFormModal} setForms={setForms} forms={forms} />
        </Modal>
        <h4 style={{ textAlign: 'center' }}>My Forms</h4>
        {forms.length > 0 ? (
          <Row>
            { forms.map((form:any, index:any) => (
              <SubmittedCard
                key={form.id + index}
                form={form}
              />
            ))}
          </Row>
        ) : (<span>No Foms available yet</span>)}
      </Content>
    </Layout>
  );
};

function showSummary(summary:any):any {
  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

export default LayoutComponent;
