/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Layout, Button, Modal, Spin,
} from 'antd';

import ConcertForm from '../concert/index';

import getMyAllConcerts from '../../services/getMyAllConcerts';

import ConcertsTable from '../ConcertsTable';
import ErrorPage from '../ErrorPage';

// styles
import './dashboard.style.scss';

const { Content } = Layout;

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
    return <ConcertsTable forms={forms} getConcerts={getConcerts} />;
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
        <ConcertForm
          setVisible={setDisplayFormModal}
          forms={forms}
          getConcerts={getConcerts}
        />
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
