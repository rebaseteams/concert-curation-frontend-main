/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import axios from 'axios';

// import config from './config.json';

// const { baseURL } = config;

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

export const returnMockData = {
  id: '63878378973',
  form_name: 'Friday Night Rock',
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
    // await axios.post(`${baseURL}/recommender/api/submitForm/`, data);

    // For now Returning mock data
    return {
      ...data,
      _id: String(Math.random() * 7676763),
    };
  } catch (error) {
    return { error: true, message: error };
  }
};

export default submitQuestionsForm;
