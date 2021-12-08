import { Row, Col } from 'antd';

import { Questions } from '../../../../model/types/questions';
// styles
import './concertData.scss';

interface ConcertDataProp {
  data: Questions;
}

const ConcertData = ({ data }: ConcertDataProp): JSX.Element => {
  const concertData = data;

  // concert Id extracted from url
  if (concertData) {
    return (
      <Row className="concertDataContainer">
        <Col span={24} className="information">
          <span className="material-icons">
            location_on
          </span>
          {concertData.venue.map((venue) => (<span key={venue}>{`${venue}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Wanted Brands</h4>
          {concertData.wantedBrands.map((value) => (<span key={value.brandId}>{`${value.brandName}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Unwanted Brands</h4>
          {concertData.unwantedBrands.map((value) => (<span key={value.brandId}>{`${value.brandName}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Age group</h4>
          {concertData.targetAudience.ageGroup.map((group) => (<span key={group}>{`${group}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Gender</h4>
          {concertData.targetAudience.gender.map((gender) => (<span key={gender}>{`${gender.toLocaleUpperCase()}, `}</span>))}
        </Col>
        <Col span={24} className="information">
          <h4>Genre</h4>
          {concertData.targetAudience.genre.map((genre) => (<span key={genre.genreId}>{`${genre.genreName}, `}</span>))}
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
