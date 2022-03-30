/* eslint-disable @typescript-eslint/no-explicit-any */
import { onSubmitFormDataType } from '../../../../model/types/concertForm';
import { QuestionsUI } from '../../../../model/types/questions';

type MappingData = {
  budget: {
    min: number;
    max: number;
  }
}
const createConcertFormData = (
  values: onSubmitFormDataType, mappingData: MappingData,
): QuestionsUI => ({
  ...values,
  userId: 'Mical001', // TODO: send proper user info through bearer tocken
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  artistBudget: mappingData.budget,
  targetAudience: {
    ageGroup: values.age,
    gender: values.gender,
    genre: values.genre.map((genre: string) => ({
      genreId: '886863',
      genreName: genre,
    })),
  },
  whatSellsMost: {
    beer: [],
    liquor: [],
    softDrinks: [],
  },
});

export default createConcertFormData;
