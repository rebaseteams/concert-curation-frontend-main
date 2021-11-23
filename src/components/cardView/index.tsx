/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Col, Modal } from 'antd';
import './card-scopped.scss';

interface CardViewProps {
    data: Array<any>
}

const colorsPallate = ['#4FFFC2', '#fff41d', '#FBB823'];

const CardView = ({ data }: CardViewProps): JSX.Element => {
  const span = 8;

  return (
    <>
      {
        // eslint-disable-next-line arrow-body-style
        data.map((artist: any, artistIndex: any) => {
          return renderCards(artist, artistIndex, span);
        })
      }
    </>
  );
};

export default CardView;

function renderCards(artist: any, artistIndex:any, span:any): any {
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
  if (artist.matchAttributes.gender.male > artist.matchAttributes.gender.female) {
    gender = 'male';
  } else {
    gender = 'female';
  }

  return (
    <Col
      key={artistIndex}
      className="card"
      style={{
        height: (artistIndex * 10 + 450),
      }}
      sm={{ span: 24 }}
      md={{ span }}
      order={order}
    >
      <div
        className="inner-card"
        style={{
          height: (artistIndex * -30 + 450),
          background: colorsPallate[artistIndex],
        }}
      >
        <img className="profile-pic" src={artist.artistImage} alt="xprofile pic" />
        <button className="card-button" type="button" onClick={() => cancelButton(artist.artistName)}>X</button>
        <div className="card-body">
          <div className="card-heading">
            <h3>{artist.artistName}</h3>
            <p>
              {String(artist.matchPercentage)}
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
              {artist.matchAttributes.venues.map((vanue: any, index:any) => (
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
                {artist.matchAttributes.age.ageGroup}
                {' '}
                {artist.matchAttributes.age.matchPercentage}
                %
              </h5>
            </div>

            <div className="field">
              <h5>
                {gender.toUpperCase()}
                {' '}
                <span>{artist.matchAttributes.gender[gender]}</span>
                {'% '}
              </h5>
            </div>

            <div className="field">
              <h5>
                Genre
              </h5>
              { artist.matchAttributes.genre.length > 0
                && displayGenre(artist.matchAttributes.genre) }
            </div>
          </div>

          <h6>Associated Brands</h6>
          <div className="venue">
            {
              artist.matchAttributes.associatedBrands.length > 0
              && displayBrands(artist.matchAttributes.associatedBrands)
            }
          </div>
        </div>
      </div>
    </Col>
  );
}

function displayGenre(genre: any) {
  return genre.map((genre_item: any, index: any) => (
    <h4 key={genre_item.genreName + index}>
      {genre_item.genreName}
    </h4>
  ));
}

function displayBrands(brand: any) {
  return brand.map((brand_item: any, index: any) => (
    <div key={index}>
      <a href={brand_item.website}><img className="brand_logo" src={brand_item.logoUrl} alt={brand_item.name} /></a>
    </div>
  ));
}

function cancelButton(artistName: any) {
  Modal.confirm({
    title: 'Confirm',
    content: `Are you sure you want to remove ${artistName}`,
    okText: 'Remove',
    cancelText: 'Cancel',
  });
}
