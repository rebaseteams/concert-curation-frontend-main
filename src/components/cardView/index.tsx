/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Col } from 'antd';
import './card-scopped.scss';

interface CardViewProps {
    data: {
        artists_data: Array<any>;
      }
    artistClicked: any;
}

const CardView = ({ data, artistClicked }: CardViewProps) => {
  const span = 20 / data.artists_data.length;

  return (
    <>
      {
           // eslint-disable-next-line max-len
           data.artists_data.map((artist: any, artistIndex: any) => renderCards(artist, artistIndex, span, artistClicked))
    }
    </>
  );
};

export default CardView;

function renderCards(artist: any, artistIndex:any, span:any, artistClicked:any): any {
  return (
    <Col
      key={artistIndex}
      className="card"
      style={{ height: (artistIndex * 10 + 450) }}
      sm={{ span: 24 }}
      md={{ span }}
      onMouseEnter={() => artistClicked(artist.summary)}
    >
      <div className="inner-card" style={{ height: (artistIndex * -30 + 450) }}>
        <div className="card-heading">
          <h3 style={{ color: '#fff' }}>{artist.artist_name}</h3>
          <p>
            {String(artist.match_percentage)}
            %
          </p>
        </div>
        <div className="vanue">
          <div>
            <span className="material-icons" style={{ fontSize: '35px', color: '#f32' }}>location_on</span>
          </div>
          <ul>
            {artist.match_attributes.venues.map((vanue: any, index:any) => (
              <li key={index}>
                {vanue.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="affinity">
          <h6>Affinities</h6>
          <div className="field">
            <h5>
              Age
              {' '}
              <span>{artist.match_attributes.age}</span>
              {' '}
            </h5>
          </div>

          <div className="field">
            <h5>
              Gender
              {' '}
              <span>{artist.match_attributes.gender}</span>
              {' '}
            </h5>
          </div>

          <div className="field">
            <h5>
              Genre
              {' '}
              <span>{artist.match_attributes.genre}</span>
              {' '}
            </h5>
          </div>
        </div>

        {/* <div className="vanue">
            <h6>Associated Brands</h6>
            <ul />
          </div> */}
      </div>
    </Col>
  );
}
