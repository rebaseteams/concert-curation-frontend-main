/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Layout, Button, Modal, Row,
} from 'antd';

import ConcertForm from '../concert/index';

import getMyAllConcerts from '../../services/getMyAllConcerts';

import SubmittedCard from '../submittedCard';
import ErrorPage from '../ErrorPage';

const { Content } = Layout;

const renderError = (setDisplayFormModal: any): JSX.Element => (
  <div>
    <ErrorPage error={{ status: 'Opps', message: 'You havn\'t created concerts created yet' }} />
    <Button type="link" onClick={() => setDisplayFormModal(true)}>
      Curate Concert Now
    </Button>
  </div>
);

const DashboardComponent = (): JSX.Element => {
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [forms, setForms] = useState([]);
  const userId = 'TODO: When authentication will stablished';

  const getConcerts = async () => {
    const allConcerts = await getMyAllConcerts(userId);
    setForms(allConcerts);
  };

  useEffect(() => {
    getConcerts();
  }, []);

  return (
    <Content>
      <Button type="primary" onClick={() => setDisplayFormModal(true)}>
        Curate Concert
      </Button>
      <Modal
        title="Choose your prefrences"
        centered
        style={
          {
            padding: '0',
          }
        }
        bodyStyle={
            {
              height: 'calc(100vh - 200px)',
              padding: '0',
              overflowY: 'scroll',
              margin: '0',
            }
          }
        visible={displayFormModal}
        onOk={() => setDisplayFormModal(false)}
        onCancel={() => setDisplayFormModal(false)}
        width={800}
        className="questionsModal"
        footer={false}
      >
        <ConcertForm setVisible={setDisplayFormModal} setForms={setForms} forms={forms} />
      </Modal>
      <h4 style={{ textAlign: 'center' }}>My Forms</h4>
      {forms.length > 0 ? (
        <Row>
          { forms.map((form:any) => (
            <SubmittedCard
              key={form.id + Math.random()}
              form={form}
            />
          ))}
        </Row>
      ) : renderError(setDisplayFormModal) }
    </Content>
  );
};

export default DashboardComponent;
