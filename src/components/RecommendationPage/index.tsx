/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  Tooltip,
  notification,
} from 'antd';
import * as _ from 'lodash';
import { ConcertDataResponse } from '../../interfaces/concertDataResponse';
import getRecommendedArtists from '../../services/getRecommendedArtists';
import ConcertData from './concertData';
import ArtistPieChart from './ArtistPieChart/ArtistPieChart';
import { ArtistsDataInterface } from '../RecomendationComponent/recomendedDataInterface';
import ErrorPage from '../ErrorPage';
import patchRecommendationArtist from '../../services/patchRecommendationArtist';
import ArtistsSummary from './ArtistsSummary';
import DownloadAsImageButton from '../Buttons/downloadAsImageButton';

// styles
import './recommendationPage.scss';

const renderSummary = (artistsData: Array<ArtistsDataInterface>) => _.times(4, (n) => (
  <ArtistsSummary summary={artistsData[n].summary} artistName={artistsData[n].artistName} />));

const RecommendationPage = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const [concertData, setConcertData] = useState<ConcertDataResponse>();
  const [artistsData, setArtistsData] = useState<Array<ArtistsDataInterface>>([]);
  const [error, setError] = useState<{status: string, message: string}>();

  const getConcertData = async () => {
    const data = await getRecommendedArtists(id);
    if (!data.success) {
      setError({ status: '404', message: data.data.error });
    }
    setConcertData(data.data.concertData);
    setArtistsData(data.data.artists);
  };

  // eslint-disable-next-line react/jsx-no-bind
  async function patchConcertData(discardedArtistId: string) {
    const res = await patchRecommendationArtist(id, discardedArtistId);
    setArtistsData(res.data);
  }

  useEffect(() => {
    getConcertData();
  }, [artistsData]);

  const downloadImage = () => {
    notification.info({
      message: 'Under Developement',
      description: 'This feature is under developement',
      placement: 'bottomRight',
    });
  };

  if (error) {
    return (
      <ErrorPage error={error} />
    );
  }
  return (
    <div>
      <div className="recommendation-page-header">
        <DownloadAsImageButton downloadImage={downloadImage} />
      </div>
      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 4 }}>
          { concertData && <ConcertData data={concertData} /> }
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          { artistsData.length > 0 && <ArtistPieChart data={artistsData} patchConcertData={patchConcertData} />}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 8 }}>
          <div className="summary-container">
            <h3>Summary</h3>
            <div>
              { artistsData.length > 0 && renderSummary(artistsData) }
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RecommendationPage;
