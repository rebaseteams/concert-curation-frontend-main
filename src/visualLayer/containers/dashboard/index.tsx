/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';

import {
  Layout, Button, Spin, Result,
} from 'antd';

import ConcertsTable from '../../components/ConcertsTable';

// styles
import './dashboard.style.scss';
import CurateConcertModal from '../../components/CurateConcertModal';
// import { getMyAllConcerts } from '../../services/recommendations';
import services from '../../services';
import { ConcertCreationResponse } from '../../../model/types/questions';

const { Content } = Layout;

interface Error {
  status: string | number | undefined;
  message: string | undefined;
}

const DashboardComponent = (): JSX.Element => {
  const [displayFormModal, setDisplayFormModal] = useState(false);
  const [forms, setForms] = useState<Array<ConcertCreationResponse>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const getConcerts = async () => {
    const response = await services.ArtistRecommendation.getAllRecommendations();
    if (response.error) {
      setError({ status: response.status, message: response.message });
    } else {
      setForms(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getConcerts();
  }, []);

  const renderLoading = (): JSX.Element => <Spin>Loading...</Spin>;

  const renderConcerts = (): JSX.Element => {
    if (error) {
      return (
        <Result
          status={404}
          title={error.status}
          subTitle={error.message}
        />
      );
    }
    return <ConcertsTable forms={forms} getConcerts={getConcerts} />;
  };

  return (
    <Content>
      <CurateConcertModal
        setDisplayFormModal={setDisplayFormModal}
        displayFormModal={displayFormModal}
        forms={forms}
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
          New Concert
        </Button>
      </div>
      { loading ? renderLoading() : renderConcerts() }
    </Content>
  );
};

export default DashboardComponent;
