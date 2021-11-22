/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import * as _ from 'lodash';
import './ArtistPieChart.scss';
import { ArtistsDataInterface } from '../../RecomendationComponent/recomendedDataInterface';
import {
  getAge,
  getBrands,
  getGender,
  getLocations,
} from './utils';
import IconRenderer from '../../IconRenderer';

interface ArtistsPieChartProp {
  data: Array<ArtistsDataInterface>;
  patchConcertData: (discardedArtistId: string) => void
}

// eslint-disable-next-line
const ArtistPieChart = ({ data, patchConcertData }: ArtistsPieChartProp) : JSX.Element => {
  const artist = {
    id: '',
    brand: [''],
    name: '',
    match: 0,
    img: '',
    age: '',
    gender: { icon: 'male', percentage: 50 },
    locations: '',
  };

  const [artist1, setArtist1] = useState(artist);
  const [artist2, setArtist2] = useState(artist);
  const [artist3, setArtist3] = useState(artist);
  const [artist4, setArtist4] = useState(artist);

  const getData = async () => {
    const artists = data;
    const [a1, a2, a3, a4] = artists;
    setArtist1((prevState) => ({
      ...prevState,
      id: a1.artistId,
      name: a1.artistName,
      brand: getBrands(a1.matchAttributes.associatedBrands),
      match: a1.matchPercentage,
      img: a1.artistImage,
      age: getAge(a1.matchAttributes.age),
      gender: getGender(a1.matchAttributes.gender),
      locations: getLocations(a1.matchAttributes.venues),
    }));
    setArtist2((prevState) => ({
      ...prevState,
      id: a2.artistId,
      name: a2.artistName,
      brand: getBrands(a2.matchAttributes.associatedBrands),
      match: a2.matchPercentage,
      img: a2.artistImage,
      age: getAge(a2.matchAttributes.age),
      gender: getGender(a2.matchAttributes.gender),
      locations: getLocations(a2.matchAttributes.venues),
    }));
    setArtist3((prevState) => ({
      ...prevState,
      id: a3.artistId,
      name: a3.artistName,
      brand: getBrands(a3.matchAttributes.associatedBrands),
      match: a3.matchPercentage,
      img: a3.artistImage,
      age: getAge(a3.matchAttributes.age),
      gender: getGender(a3.matchAttributes.gender),
      locations: getLocations(a3.matchAttributes.venues),
    }));
    setArtist4((prevState) => ({
      ...prevState,
      id: a4.artistId,
      name: a4.artistName,
      brand: getBrands(a4.matchAttributes.associatedBrands),
      match: a4.matchPercentage,
      img: a4.artistImage,
      age: getAge(a4.matchAttributes.age),
      gender: getGender(a4.matchAttributes.gender),
      locations: getLocations(a4.matchAttributes.venues),
    }));
  };

  const cancelbutton = (artistName: string, artistId: string) => {
    Modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to remove ${artistName}`,
      okText: 'Remove',
      onOk: () => patchConcertData(artistId),
      cancelText: 'Cancel',
    });
  };
  useEffect(() => {
    getData();
  }, [data]);

  const renderBrandsLogo = (brand: Array<string>) => brand.map((brandItem: string) => (
    <div key={brandItem}>
      <img className="brand_logo" src={brandItem} alt={brandItem} />
    </div>
  ));

  const renderGender = (gender: {icon: string; percentage: number}) => (
    <div className="row-flex">
      <span className="material-icons">
        {gender.icon}
      </span>
      <h2>
        {gender.percentage}
        %
      </h2>
    </div>
  );

  return (
    <div className="container">
      <div className="left-top-data-line">
        <div className="h-data-container">
          <div className="v-data-container artist2-data">
            <div className="data-container" data-testid="matchingBrands">
              <h4 className="bold-16">Matching Brands</h4>
              <div className="row-flex">
                {artist2.brand && renderBrandsLogo(artist2.brand)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-bottom-data-line">
        <div className="h-data-container bottom-matching-brands">
          <div className="v-data-container">
            <div className="data-container artist1-data">
              <h4 className="bold-16">Matching Brands</h4>
              <div className="row-flex">
                {artist1.brand && renderBrandsLogo(artist1.brand)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-top-data-line">
        <div className="h-data-container-right">
          <div className="v-data-container">
            <div className="data-container artist3-data">
              <h4 className="bold-16">Matching Brands</h4>
              <div className="row-flex">
                {artist3.brand && renderBrandsLogo(artist3.brand)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-bottom-data-line">
        <div className="h-data-container-right bottom-matching-brands">
          <div className="v-data-container">
            <div className="data-container artist4-data">
              <h4 className="bold-16">Matching Brands</h4>
              <div className="row-flex">
                {artist4.brand && renderBrandsLogo(artist4.brand)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <div className="top-data-line">
            <div className="h-data-container">
              <div className="v-data-container artist2-data">
                <div className="data-container artist2-data">
                  <span className="bold-16">
                    Age
                    <span>
                      {artist2.age}
                      %
                    </span>
                  </span>
                </div>
                <div className="data-container artist2-data">
                  {artist2.gender && renderGender(artist2.gender)}
                </div>
                <span className="bold-16">
                  Affinity
                  <span className="bold-18">
                    87%
                  </span>
                </span>
              </div>
              <div className="v-data-container artist2-data">
                <div className="data-container artist2-data locations">
                  {IconRenderer('location')}
                  <h4>
                    {artist2.locations}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="quarter-circle-bottom-right quarter-circle">
            <div className="matchcontainer-1 flex-match-content">
              <span role="button" tabIndex={0} className="close" onClick={() => cancelbutton(artist2.name, artist2.id)}>&times;</span>
              <div className="circle-img">
                <img src={artist2.img} alt="" />
              </div>
              <h4 className="name">
                { _.upperFirst(artist2.name) }
              </h4>
              <span className="match">
                {artist2.match}
                <span>%</span>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="quarter-circle-top-right quarter-circle">
            <div className="matchcontainer-4 flex-match-content">
              <div className="circle-img">
                <img src={artist1.img} alt="" />
              </div>
              <h4 className="name">
                { _.upperFirst(artist1.name)}
              </h4>
              <span className="match">
                {artist1.match}
                <span>%</span>
              </span>
              <span role="button" tabIndex={0} className="close" onClick={() => cancelbutton(artist1.name, artist1.id)}>&times;</span>
            </div>
          </div>
          <div className="bottom-data-line">
            <div className="h-data-container">
              <div className="v-data-container-bottom artist1-data">
                <div className="data-container artist1-data">
                  <span className="bold-16">
                    Age
                    <span>
                      {artist1.age}
                      %
                    </span>
                  </span>
                </div>
                <div className="data-container artist1-data">
                  {artist1.gender && renderGender(artist1.gender)}
                </div>
                <span className="bold-16">
                  Affinity
                  <span className="bold-18">
                    87%
                  </span>
                </span>
              </div>
              <div className="v-data-container-bottom bottom-location-box-1 artist1-data">
                <div className="data-container artist1-data locations">
                  {IconRenderer('location')}
                  <h4>
                    {artist1.locations}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <div className="top-data-line">
            <div className="h-data-container-right">
              <div className="v-data-container artist3-data">
                <div className="data-container artist3-data">
                  <span className="bold-16">
                    Age
                    <span>
                      {artist3.age}
                      %
                    </span>
                  </span>
                </div>
                <div className="data-container artist3-data">
                  {artist3.gender && renderGender(artist3.gender)}
                </div>
                <span className="bold-16">
                  Affinity
                  <span className="bold-18">
                    87%
                  </span>
                </span>
              </div>
              <div className="v-data-container artist3-data">
                <div className="data-container artist3-data locations">
                  {IconRenderer('location')}
                  <h4>
                    {artist3.locations}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="quarter-circle-bottom-left quarter-circle">
            <div className="matchcontainer-2 flex-match-content">
              <span role="button" tabIndex={0} className="close" onClick={() => cancelbutton(artist3.name, artist3.id)}>&times;</span>
              <div className="circle-img">
                <img src={artist3.img} alt="" />
              </div>
              <h4 className="name">
                {_.upperFirst(artist3.name)}
              </h4>
              <span className="match">
                {artist3.match}
                <span>%</span>
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="quarter-circle-top-left quarter-circle">
            <div className="matchcontainer-3 flex-match-content">
              <div className="circle-img">
                <img src={artist4.img} alt="" />
              </div>
              <h4 className="name">
                {_.upperFirst(artist4.name)}
              </h4>
              <span className="match">
                {artist4.match}
                <span>%</span>
              </span>
              <span role="button" tabIndex={0} className="close" onClick={() => cancelbutton(artist4.name, artist4.id)}>&times;</span>
            </div>
          </div>
          <div className="bottom-data-line">
            <div className="h-data-container-right">
              <div className="v-data-container-bottom artist4-data">
                <div className="data-container artist4-data">
                  <span className="bold-16">
                    Age
                    <span>
                      {artist4.age}
                      %
                    </span>
                  </span>
                </div>
                <div className="data-container artist4-data">
                  {artist4.gender && renderGender(artist4.gender)}
                </div>
                <span className="bold-16">
                  Affinity
                  <span className="bold-18">
                    87%
                  </span>
                </span>
              </div>
              <div className="v-data-container-bottom bottom-location-box-2 artist4-data">
                <div className="data-container artist4-data locations">
                  {IconRenderer('location')}
                  <h4>
                    {artist4.locations}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPieChart;
