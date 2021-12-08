/* eslint-disable linebreak-style */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Col, Modal } from 'antd';
import './card-scopped.scss';
import { Link } from 'react-router-dom';
import { ARec, GenreRes } from '../../../../model/types/artist-recommendation';
import { AssociatedBrands } from '../../../../model/types/associatedBrands';
import { Venue } from '../../../../model/types/venue';

interface CardViewProps {
    data: Array<ARec>,
    recommendationId: string
}

const colorsPallate = ['#4FFFC2', '#fff41d', '#FBB823'];

const CardView = ({ data, recommendationId }: CardViewProps): JSX.Element => {
  const span = 8;

  const renderCards = (artist: ARec, artistIndex: number): JSX.Element => {
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
    let gender: 'male' | 'female';
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
              <Link
                className="font-color"
                to={`/artist/${artist.artistId}`}
                state={recommendationId}
              >
                <h4>{ artist.artistName }</h4>
              </Link>
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
                {artist.matchAttributes.venues.map((vanue: Venue, index:number) => (
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
  };

  return (
    <>
      {
        // eslint-disable-next-line arrow-body-style
        data.map((artist: ARec, artistIndex: number) => {
          return renderCards(artist, artistIndex);
        })
      }
    </>
  );
};

export default CardView;

function displayGenre(genre: Array<GenreRes>) {
  return genre.map((genreItem: GenreRes, index: number) => (
    <h4 key={genreItem.genreName + index}>
      {genreItem.genreName}
    </h4>
  ));
}

function displayBrands(brand: Array<AssociatedBrands>) {
  return brand.map((brandItem: AssociatedBrands, index: number) => (
    <div key={index}>
      <a href={brandItem.website}><img className="brand_logo" src={brandItem.logoUrl} alt={brandItem.name} /></a>
    </div>
  ));
}

function cancelButton(artistName: string) {
  Modal.confirm({
    title: 'Confirm',
    content: `Are you sure you want to remove ${artistName}`,
    okText: 'Remove',
    cancelText: 'Cancel',
  });
}
