/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Layout, Modal, Button,
} from 'antd';

import './layout.scss';

import React, { useEffect, useState } from 'react';

import HeaderComponet from './header';

import getRecommendedArtists from '../services/getRecommendedArtists';

// import CardView from '../components/cardView';
import QuestionsForm from '../components/question/index';

// interface ArtistData {
//     'artist_name': string;
//     'artist_id': string;
//     'artist_image': string;
//     'match_percentage': number;
//     'match_attributes': {
//       'venues': [
//         {
//           'id': string;
//           'name': string;
//           'address': {
//             'pincode': number;
//             'country': string;
//             'city': string;
//             'geo_location': {
//               'lat': number;
//               'lag': number;
//             }
//           },
//           'venue_capacity': number;
//           'match_percentage': number;
//         }
//       ];
//       'age': [
//         {
//           'age_group':string;
//           'match_percentage': number;
//         }
//       ];
//       'gender': {
//         'male': number;
//         'female': number;
//       };
//       'genre': [
//         {
//           'genre_name':string;
//           'value': number;
//         }
//       ];
//       'associated_brands': [
//         {
//           'id': string;
//           'name': string;
//           'contact': string;
//           'website': string;
//           'logo_url': string;
//         }
//       ]
//     };
//     'summary': string;
// }

const { Content } = Layout;

const LayoutComponent = ():JSX.Element => {
  const [artists, setArtists] = useState([]);
  const [summary, setSummary] = useState('');
  const [visible, setVisible] = useState(false);

  const getData = async () => {
    const data:any = await getRecommendedArtists({ age: '10-29' });
    setArtists(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const artistClicked = (artistSummary: string) => {
    setSummary(artistSummary);
  };

  // const showQuestions = (state: boolean) => {
  //   setPopQuestions(state);
  // };

  return (
    <Layout style={{ background: 'none' }} className="layout-container">
      <HeaderComponet />
      {/* <Content>
        <div className="layout-workspace">
          <Row align="middle">
            <Col span={14} style={{ border: '0px solid black' }}>
              <Row className="card-container" align="bottom">
                { artists && <CardView data={artists.slice(0, 3)} artistClicked={artistClicked} /> }
              </Row>
            </Col>
            <Col span={10} style={{ padding: '20px', border: '0px solid black' }}>
              { summary && showSummary(summary) }
            </Col>
          </Row>
        </div>
      </Content> */}

      <Content>
        <Button type="primary" onClick={() => setVisible(true)}>
          Curate Concert
        </Button>
        <Modal
          title="Choose your prefrences"
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1000}
          footer={[
            <Button form="myForm" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
        >
          <QuestionsForm />
        </Modal>
        {/* { popQuestions && <QuestionsCard closeQuestion={() => showQuestions(false)} /> } */}
      </Content>
    </Layout>
  );
};

function showSummary(summary:any):any {
  return (
    <div className="summary-container">
      <h3>Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

export default LayoutComponent;
