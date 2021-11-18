import * as _ from 'lodash';

import { AssociatedBrands, Venue } from '../../RecomendationComponent/recomendedDataInterface';

export const formatName = (name: string): string => (_.upperFirst(name.replace(/_/g, ' '))).split(' ').slice(0, 2).join(' ');

export const getBrands = (brands: Array<AssociatedBrands>) : Array<string> => {
  const result: Array<string> = brands.map((val : {logoUrl : string}) => val.logoUrl);
  return result;
};

export const getAge = (age : {ageGroup : string, matchPercentage : number}) : string => `${age.ageGroup}, ${age.matchPercentage}`;

export const getGender = (
  gender : {male : number, female : number},
) : { icon: string, percentage: number } => {
  if (gender.male > gender.female) {
    return {
      icon: 'male',
      percentage: gender.male,
    };
  }
  if (gender.male < gender.female) {
    return {
      icon: 'female',
      percentage: gender.female,
    };
  }
  return {
    icon: 'both',
    percentage: 50,
  };
};

export const getLocations = (locations : Venue[]) : string => locations.map((val : {name : string}) => val.name).join(', ');
