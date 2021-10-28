/* eslint-disable linebreak-style */
/* eslint-disable arrow-body-style */
import React from 'react';
import {
  Button, Col,
} from 'antd';
import getRecommendedArtists from '../../services/getRecommendedArtists';

// importing styles
import './submmitedForm.scss';

interface SubmittedCardInterface {
  form: {
    'id': string;
    'form_name': string;
    'event_type': string;
    'venue': Array<string>,
    'artist_budget': {'min': number, 'max':number},
    'sponsorship_type':string,
    'wanted_brands':Array<string>,
    'target_audience': {
      'age_group': Array<string>,
      'gender': Array<string>,
      'genre':Array<string>
    }
  }
}

const SubmittedCard = ({ form }: SubmittedCardInterface): JSX.Element => {
  const getRecomendation = async (formId: string) => {
    // below line will fetch artists recomended by form id
    await getRecommendedArtists(formId); // will return recommended artist data
  };
  return (
    <Col span={24}>
      <div className="submmitedFormsCard">
        <div className="displayFlex">
          <h3>{form.form_name}</h3>
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
    </Col>
  );
};

export default SubmittedCard;
