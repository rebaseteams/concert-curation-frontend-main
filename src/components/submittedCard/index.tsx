/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col,
} from 'antd';
import getRecommendedArtists from '../../services/getRecommendedArtists';

// importing styles
import './submmitedForm.scss';

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
    <Col span={24}>
      <Link to={`recommendations/${form.id}`}>
        <div className="submmitedFormsCard">
          <div className="displayFlex">
            <h3>{form.concertName}</h3>
            <div>
              <Button
                onClick={async () => getRecomendation(form.id)}
              >
                View Recommended Artist
              </Button>
              <span className="material-icons" style={{ color: '#F00', fontSize: '25px' }}>
                remove_circle
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};

export default SubmittedCard;
