/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import './ArtistPieChart.scss';
import { ArtistsDataInterface, AssociatedBrands, Venue } from '../../RecomendationComponent/recomendedDataInterface';

const getBrands = (brands: Array<AssociatedBrands>) : string => brands.map((val : {name : string}) => val.name).join(', ');
const getAge = (age : {ageGroup : string, matchPercentage : number}) : string => `${age.ageGroup}, ${age.matchPercentage}`;
const getGender = (gender : {male : number, female : number}) : string => {
  if (gender.male > gender.female) return `Male, ${gender.male}`;
  if (gender.female > gender.male) return `Female, ${gender.female}`;
  return 'Both, 50';
};
const getLocations = (locations : Venue[]) : string => locations.map((val : {name : string}) => val.name).join(', ');

interface ArtistsPieChartProp {
  data: Array<ArtistsDataInterface>;
  patchConcertData: (discardedArtistId: string) => void
}

// eslint-disable-next-line
const ArtistPieChart = ({ data, patchConcertData }: ArtistsPieChartProp) : JSX.Element => {
  const artist = {
    id: '',
    brand: '',
    name: '',
    match: 0,
    img: '',
    age: '',
    gender: '',
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <div className="left-top-data-line">
        <div className="h-data-container">
          <div className="v-data-container">
            <div className="data-container" data-testid="matchingBrands">
              Matching Brands :
              {artist2.brand}
            </div>
          </div>
        </div>
      </div>
      <div className="left-bottom-data-line">
        <div className="h-data-container">
          <div className="v-data-container">
            <div className="data-container">
              Matching Brands :
              {artist1.brand}
            </div>
          </div>
        </div>
      </div>
      <div className="right-top-data-line">
        <div className="h-data-container-right">
          <div className="v-data-container">
            <div className="data-container">
              Matching Brands :
              {artist3.brand}
            </div>
          </div>
        </div>
      </div>
      <div className="right-bottom-data-line">
        <div className="h-data-container-right">
          <div className="v-data-container">
            <div className="data-container">
              Matching Brands :
              {artist4.brand}
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="row">
          <div className="top-data-line">
            <div className="h-data-container">
              <div className="v-data-container">
                <div className="data-container">
                  Age :
                  {artist2.age}
                  %
                </div>
                <div className="data-container">
                  %
                  Gender:
                  {artist2.gender}
                </div>
                <div className="data-container">Affinity Score : 87%</div>
              </div>
              <div className="v-data-container">
                <div className="data-container">
                  Location :
                  {artist2.locations}
                </div>
              </div>
            </div>
          </div>
          <div className="quarter-circle-bottom-right quarter-circle">
            <div className="matchcontainer-1 flex-match-content">
              <span role="button" tabIndex={0} className="close" onClick={() => patchConcertData(artist2.id)}>&times;</span>
              <div className="circle-img">
                <img src={artist2.img} alt="" />
              </div>
              <div className="name">
                {artist2.name}
              </div>
              <div className="match">
                Match :
                {artist2.match}
                %
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="quarter-circle-top-right quarter-circle">
            <div className="matchcontainer-4 flex-match-content">
              <div className="circle-img">
                <img src={artist1.img} alt="" />
              </div>
              <div className="name">
                {artist1.name}
              </div>
              <div className="match">
                Match :
                {artist1.match}
                %
              </div>
              <span role="button" tabIndex={0} className="close" onClick={() => patchConcertData(artist1.id)}>&times;</span>
            </div>
          </div>
          <div className="bottom-data-line">
            <div className="h-data-container">
              <div className="v-data-container-bottom">
                <div className="data-container">
                  Age :
                  {artist1.age}
                  %
                </div>
                <div className="data-container">
                  Gender:
                  {artist1.gender}
                  %
                </div>
                <div className="data-container">Affinity Score : 87%</div>
              </div>
              <div className="v-data-container-bottom">
                <div className="data-container">
                  Location :
                  {artist1.locations}
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
              <div className="v-data-container">
                <div className="data-container">
                  Age :
                  {artist3.age}
                  %
                </div>
                <div className="data-container">
                  Gender:
                  {artist3.gender}
                  %
                </div>
                <div className="data-container">Affinity Score : 87%</div>
              </div>
              <div className="v-data-container">
                <div className="data-container">
                  Location :
                  {artist3.locations}
                </div>
              </div>
            </div>
          </div>
          <div className="quarter-circle-bottom-left quarter-circle">
            <div className="matchcontainer-2 flex-match-content">
              <span role="button" tabIndex={0} className="close" onClick={() => patchConcertData(artist3.id)}>&times;</span>
              <div className="circle-img">
                <img src={artist3.img} alt="" />
              </div>
              <div className="name">
                {artist3.name}
              </div>
              <div className="match">
                Match :
                {artist3.match}
                %
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="quarter-circle-top-left quarter-circle">
            <div className="matchcontainer-3 flex-match-content">
              <div className="circle-img">
                <img src={artist4.img} alt="" />
              </div>
              <div className="name">
                {artist4.name}
              </div>
              <div className="match">
                Match :
                {artist4.match}
                %
              </div>
              <span role="button" tabIndex={0} className="close" onClick={() => patchConcertData(artist4.id)}>&times;</span>
            </div>
          </div>
          <div className="bottom-data-line">
            <div className="h-data-container-right">
              <div className="v-data-container-bottom">
                <div className="data-container">
                  Age :
                  {artist4.age}
                  %
                </div>
                <div className="data-container">
                  Gender:
                  {artist4.gender}
                  %
                </div>
                <div className="data-container">Affinity Score : 87%</div>
              </div>
              <div className="v-data-container-bottom">
                <div className="data-container">
                  Location :
                  {artist4.locations}
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
