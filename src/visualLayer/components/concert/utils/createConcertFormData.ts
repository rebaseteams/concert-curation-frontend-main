/* eslint-disable @typescript-eslint/no-explicit-any */
import { onSubmitFormDataType } from '../../../../model/types/concertForm';
import { QuestionsUI } from '../../../../model/types/questions';

const createConcertFormData = (
  values: onSubmitFormDataType, budget: { min: number, max: number },
): QuestionsUI => ({
  ...values,
  userId: 'Mical001', // TODO: send proper user info through bearer tocken
  artistBudget: budget,
  targetAudience: {
    ageGroup: values.age,
    gender: values.gender,
    genre: values.genre.map((genre: string) => ({
      genreId: '886863',
      genreName: genre,
    })),
  },
  wantedBrands: values.wantedBrands.map((brand: string) => ({ brandId: '05265373', brandName: brand })),
  unwantedBrands: values.unwantedBrands.map((brand: string) => ({ brandId: '65260373', brandName: brand })),
  whatSellsMost: {
    beer: [],
    liquor: [],
    softDrinks: [],
  },
});

export default createConcertFormData;
