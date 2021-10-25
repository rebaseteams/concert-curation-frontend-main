/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { Layout, Row, Col } from 'antd';

import './layout.scss';

import React, { useEffect, useState } from 'react';

import HeaderComponet from './header';

import getRecomendedArtists from '../services/getRecomandedArtists';

import CardView from '../components/cardView';

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

const LayoutComponent = ():any => {
  const [artists, setArtists] = useState([]);
  const [summary, setSummary] = useState('');

  const getData = async () => {
    const data:any = await getRecomendedArtists({ age: '10-29' });
    setArtists(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const artistClicked = (artistSummary: string) => {
    setSummary(artistSummary);
  };

  return (
    <Layout style={{ background: 'none' }} className="layout-container">
      <HeaderComponet />
      <Content>
        <div className="layout-workspace">
          {/* <Row>
               <Col className="content-box graph-box" span={24}>
                   <PieChart/>
               </Col>
            </Row> */}
          <Row align="middle">
            <Col span={14} style={{ border: '0px solid black' }}>
              <Row className="card-container" align="bottom">
                {/* <Col span={3} /> */}
                { artists && <CardView data={artists.slice(0, 3)} artistClicked={artistClicked} /> }
                {/* <Col span={3} /> */}
              </Row>
            </Col>
            <Col span={10} style={{ padding: '20px', border: '0px solid black' }}>
              { summary && showSummary(summary) }
            </Col>
          </Row>
        </div>
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
