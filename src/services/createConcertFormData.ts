/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuestionsFormDataInterface } from './submitForm';
import { onSubmitFormDataType } from '../interfaces/concertForm';

const createConcertFormData = (
  values: onSubmitFormDataType, budget: { min: number, max: number },
): QuestionsFormDataInterface => ({
  ...values,
  userId: 'TODO: get user id after login',
  artistBudget: budget,
  targetAudience: {
    ageGroup: values.age,
    gender: values.gender,
    genre: values.genre.map((genre: string) => ({
      genreId: '886863',
      genreName: genre,
    })),
  },
  wantedBrands: values.wantedBrands.map((brand: string) => ({ brandId: '65265373', brandName: brand })),
  unwantedBrands: values.unwantedBrands.map((brand: string) => ({ brandId: '65265373', brandName: brand })),
  whatSellsMost: {
    beer: [],
    liquor: [],
    softDrinks: [],
  },
});

export default createConcertFormData;
