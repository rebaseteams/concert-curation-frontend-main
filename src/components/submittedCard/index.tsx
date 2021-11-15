/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Col,
  Checkbox,
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
  const concertSelected = (concertId: string) => {
    // Todo: have a list of selected concerts
    // Amd implement multiple delete feature
    return concertId;
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

      <div className="submmitedFormsCard">
        <div className="displayFlex">
          <Checkbox onChange={() => concertSelected(form.id)}><h3>{form.concertName}</h3></Checkbox>
          <p>{form.dateCreated.slice(0, 24)}</p>
          <div>
            <Link
              style={{
                width: '90%',
              }}
              to={`recommendations/${form.id}`}
            >
              <Button
                type="link"
                onClick={async () => getRecomendation(form.id)}
              >
                View Recommendation
              </Button>
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
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SubmittedCard;
