/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import axios from 'axios';

// import config from './config.json';

// const { baseURL } = config;

interface QuestionsFormDataInterface {
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
  concertName: 'Friday Night Rock',
  status: 'pending',
  dateCreated: '2021-10-30',
};

const submitQuestionsForm = async (data: QuestionsFormDataInterface): Promise<any> => {
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
