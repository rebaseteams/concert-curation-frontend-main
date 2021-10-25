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
    data: Array<any>
    artistClicked: any;
}

const CardView = ({ data, artistClicked }: CardViewProps) => {
  const span = 8;

  return (
    <>
      {
        // eslint-disable-next-line max-len
        data.map((artist: any, artistIndex: any) => renderCards(artist, artistIndex, span, artistClicked))
      }
    </>
  );
};

export default CardView;

function renderCards(artist: any, artistIndex:any, span:any, artistClicked:any): any {
  let order;
  switch (artistIndex) {
    case 0:
      order = 1;
      break;
    case 1:
      order = 0;
      break;
    default:
      order = artistIndex;
  }

  // eslint-disable-next-line max-len
  let gender;
  if (artist.match_attributes.gender.male > artist.match_attributes.gender.female) {
    gender = 'male';
  } else {
    gender = 'female';
  }

  return (
    <Col
      key={artistIndex}
      className="card"
      style={{ height: (artistIndex * 10 + 450) }}
      sm={{ span: 24 }}
      md={{ span }}
      order={order}
      onMouseEnter={() => artistClicked(artist.summary)}
    >
      <div className="inner-card" style={{ height: (artistIndex * -30 + 450) }}>
        <img className="profile-pic" src={artist.artist_image} alt="xprofile pic" />
        <div className="card-body">
          <div className="card-heading">
            <h3>{artist.artist_name}</h3>
            <p>
              {String(artist.match_percentage)}
              %
            </p>
          </div>
          <div className="venue">
            <div>
              <span
                className="material-icons"
                style={{ fontSize: '35px', color: '#f32' }}
              >
                location_on
              </span>
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
                {artist.match_attributes.age.age_group}
                {' '}
                {artist.match_attributes.age.match_percentage}
                %
              </h5>
            </div>

            <div className="field">
              <h5>
                {gender.toUpperCase()}
                {' '}
                <span>{artist.match_attributes.gender[gender]}</span>
                {'% '}
              </h5>
            </div>

            <div className="field">
              <h5>
                Genre
                { artist.match_attributes.genre.length > 0
                && displayGenre(artist.match_attributes.genre) }
              </h5>
            </div>
          </div>

          <h6>Associated Brands</h6>
          <div className="venue">
            {
              artist.match_attributes.associated_brands.length > 0
              && displayBrands(artist.match_attributes.associated_brands)
            }
          </div>
        </div>
      </div>
    </Col>
  );
}

function displayGenre(genre: any) {
  return genre.map((genre_item: any, index: any) => (
    <h4 key={genre_item.genre_name + index}>
      {genre_item.genre_name}
    </h4>
  ));
}

function displayBrands(brand: any) {
  return brand.map((brand_item: any, index: any) => (
    <div key={index}>
      <a href={brand_item.website}><img className="brand_logo" src={brand_item.logo_url} alt={brand_item.name} /></a>
    </div>
  ));
}
