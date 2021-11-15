/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Layout, Button, Modal, Row, Spin, Col,
} from 'antd';

import ConcertForm from '../concert/index';

import getMyAllConcerts from '../../services/getMyAllConcerts';

import SubmittedCard from '../submittedCard';
import ErrorPage from '../ErrorPage';

// styles
import './dashboard.style.scss';

const { Content } = Layout;

const renderError = (setDisplayFormModal: any): JSX.Element => (
  <div>
    <ErrorPage error={{ status: 'No data', message: 'You have not created concerts yet' }} />
    <Button type="link" onClick={() => setDisplayFormModal(true)}>
      Curate Concert Now
    </Button>
  </div>
);

const DashboardComponent = (): JSX.Element => {
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{status: string, message: string}>();

  const userId = 'TODO: When authentication will stablished';

  const getConcerts = async () => {
    const response = await getMyAllConcerts(userId);
    if (response.error) {
      setError({ status: 'Oops', message: 'Network Error:' });
    }
    setForms(response);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getConcerts();
  }, []);

  const renderLoading = (): JSX.Element => <Spin>Loading...</Spin>;

  const renderConcerts = (): JSX.Element => {
    if (error) {
      return <ErrorPage error={error} />;
    }
    if (forms.length > 0) {
      return (
        <Row>
          <Col span={24}>
            <div className="submmitedFormsCard headingForms">
              <div className="displayFlex">
                <h3>Concert name</h3>
                <h3>Created date</h3>
                <div> </div>
                <div> </div>
              </div>
            </div>
          </Col>
          { forms.map((form:any) => (
            <SubmittedCard
              key={form.id + Math.random()}
              form={form}
            />
          ))}
        </Row>
      );
    }
    return renderError(setDisplayFormModal);
  };

  return (
    <Content>
      <Button data-testid="curate-concert" type="primary" onClick={() => setDisplayFormModal(true)}>
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
      <h4 style={{
        textAlign: 'center',
        color: '#FFF',
        fontSize: '25px',
      }}
      >
        {' '}
        Concert List
      </h4>
      { loading ? renderLoading() : renderConcerts() }
    </Content>
  );
};

export default DashboardComponent;
