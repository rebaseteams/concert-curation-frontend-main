import React, { useEffect, useState } from 'react';

import { Row, Col } from 'antd';

import { useParams } from 'react-router-dom';
import getRecommendedArtists from '../../services/getRecommendedArtists';

import { ConcertDataResponse } from '../../interfaces/concertDataResponse';

// styles
import './concertData.scss';

const ConcertData = (): JSX.Element => {
  const { id }: { id: string } = useParams();
  const [concertData, setConcertData] = useState<ConcertDataResponse>();

  const getConcertData = async () => {
    const data = await getRecommendedArtists(id);
    setConcertData(data.concertData);
  };

  useEffect(() => {
    getConcertData();
  });

  // concert Id extracted from url
  // eslint-disable-next-line no-console
  console.log(id);
  if (concertData) {
    return (
      <Row className="concertDataContainer">
        <Col span={24}>
          <h5>Concert Name</h5>
          <h3>{concertData.concertName}</h3>
        </Col>
        <Col span={24} className="information">
          <h4>Sponsorship Type</h4>
          <span>{concertData.sponsorshipType}</span>
        </Col>
        <Col span={24} className="information">
          <h4>Venues</h4>
          {concertData.venue.map((venue) => (<span>{`${venue}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Wanted Brands</h4>
          {concertData.wantedBrands.map((value) => (<span>{`${value}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Unwanted Brands</h4>
          {concertData.unwantedBrands.map((value) => (<span>{`${value}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Event Type</h4>
          <span>{concertData.eventType}</span>
        </Col>
        <Col span={24} className="information">
          <h4>Artist Budget</h4>
          <span>{`${concertData.artistBudget.min} to ${concertData.artistBudget.min}`}</span>
        </Col>
        <Col span={24} className="information">
          <h4>Age group</h4>
          {concertData.targetAudience.ageGroup.map((group) => (<span>{`${group}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Gender</h4>
          {concertData.targetAudience.gender.map((gender) => (<span>{`${gender.toLocaleUpperCase()}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Genre</h4>
          {concertData.targetAudience.genre.map((genre) => (<span>{`${genre}, `}</span>))}
        </Col>
      </Row>
    );
  }
  return (
    <span>
      No Concert Data
    </span>
  );
};

export default ConcertData;
