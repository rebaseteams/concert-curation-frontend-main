import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { ConcertDataResponse } from '../../interfaces/concertDataResponse';
import getRecommendedArtists from '../../services/getRecommendedArtists';
import ConcertData from '../concertData';
import ArtistPieChart from '../ArtistPieChart/ArtistPieChart';
import { ArtistsDataInterface } from '../RecomendationComponent/recomendedDataInterface';
import ErrorPage from '../ErrorPage';

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

  useEffect(() => {
    getConcertData();
  }, []);

  if (error) {
    return (
      <ErrorPage error={error} />
    );
  }
  return (
    <Row>
      <Col span={6}>
        { concertData && <ConcertData data={concertData} /> }
      </Col>
      <Col span={12}>
        { artistsData.length > 0 && <ArtistPieChart data={artistsData} />}
      </Col>
      <Col
        span={6}
      >
        Summary To be added
      </Col>
    </Row>
  );
};

export default RecommendationPage;
