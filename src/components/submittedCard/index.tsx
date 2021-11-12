/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col,
} from 'antd';
import getRecommendedArtists from '../../services/getRecommendedArtists';
import deleteConcertForm from '../../services/deleteConcertForm';

interface SubmittedCardInterface {
  form: {
    id: string,
    dateCreated: string,
    concertName: string,
    status: string
  }
}

const SubmittedCard = ({ form }: SubmittedCardInterface): JSX.Element => {
  const getRecomendation = async (formId: string) => {
    // below line will fetch artists recomended by form id
    // will return recommended artist data
    await getRecommendedArtists(formId);
  };
  return (
    <Col
      span={24}
      style={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <Link
        style={{
          width: '90%',
        }}
        to={`recommendations/${form.id}`}
      >
        <div className="submmitedFormsCard">
          <div className="displayFlex">
            <h3>{form.concertName}</h3>
            <h3>{form.dateCreated}</h3>
            <div>
              <Button
                type="link"
                onClick={async () => getRecomendation(form.id)}
              >
                View Recommended Artist
              </Button>
            </div>
          </div>
        </div>
      </Link>
      <Button
        onClick={async () => deleteConcertForm(form.id)}
        type="link"
      >
        <span
          className="material-icons"
          style={{ color: '#F00', fontSize: '25px' }}
        >
          remove_circle
        </span>
      </Button>
    </Col>
  );
};

export default SubmittedCard;
