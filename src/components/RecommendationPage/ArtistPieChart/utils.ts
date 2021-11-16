import * as _ from 'lodash';

import { AssociatedBrands, Venue } from '../../RecomendationComponent/recomendedDataInterface';

export const formatName = (name: string): string => (_.upperFirst(name.replace(/_/g, ' '))).split(' ').slice(0, 2).join(' ');

export const getBrands = (brands: Array<AssociatedBrands>) : string => brands.map((val : {name : string}) => val.name).join(', ');

export const getAge = (age : {ageGroup : string, matchPercentage : number}) : string => `${age.ageGroup}, ${age.matchPercentage}`;

export const getGender = (gender : {male : number, female : number}) : string => {
  if (gender.male > gender.female) return `Male, ${gender.male}`;
  if (gender.female > gender.male) return `Female, ${gender.female}`;
  return 'Both, 50';
};

export const getLocations = (locations : Venue[]) : string => locations.map((val : {name : string}) => val.name).join(', ');
