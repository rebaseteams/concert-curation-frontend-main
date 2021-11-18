/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Layout, Button, Spin,
} from 'antd';

import getMyAllConcerts from '../../services/getMyAllConcerts';

import ConcertsTable from '../ConcertsTable';
import ErrorPage from '../ErrorPage';

// styles
import './dashboard.style.scss';
import CurateConcertModal from '../CurateConcertModal';

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
      <CurateConcertModal
        setDisplayFormModal={setDisplayFormModal}
        displayFormModal={displayFormModal}
        forms={forms}
        getConcerts={getConcerts}
      />
      <div className="row-flex justify-between width-md">
        <h4 style={{
          textAlign: 'center',
          color: '#FFF',
          fontSize: '25px',
        }}
        >
          {' '}
          Concert List
        </h4>
        <Button data-testid="curate-concert" type="primary" onClick={() => setDisplayFormModal(true)}>
          Curate Concert
        </Button>
      </div>
      { loading ? renderLoading() : renderConcerts() }
    </Content>
  );
};

export default DashboardComponent;
