/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

import config from '../config/backend.json';

const { baseURL } = config;

interface QuestionFormData {
    'event_type': string;
    'venue': Array<string>,
    'artist_budget':{'min': number, 'max':number},
    'sponsorship_type':string,
    'wanted_brands':Array<string>,
    'target_audience': {
      'age_group': Array<string>,
      'gender': Array<string>,
      'genre':Array<string>
  }
}

const returnMockData = {
  _id: '876875656745',
  event_type: 'Colleges and Universities',
  venue: ['London', 'Mumbai'],
  artist_budget: { min: 20000, max: 50000 },
  sponsorship_type: 'Direct sales',
  wanted_brands: ['Limca'],
  unwanted_brands: ['Mirenda', 'Pepsi'],
  target_audience: {
    age_group: ['26-35', '36-60'],
    gender: ['female', 'both'],
    genre: ['DJ', 'Classic'],
  },
};

const submitQuestionsForm = async (data: QuestionFormData): Promise<any> => {
  try {
    await axios.post(`${baseURL}/recommender/api/submitForm/`, data);
    return returnMockData;
  } catch (error) {
    return 0;
  }
};

export default submitQuestionsForm;
