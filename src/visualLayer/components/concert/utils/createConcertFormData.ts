/* eslint-disable @typescript-eslint/no-explicit-any */
import { onSubmitFormDataType } from '../../../../model/types/concertForm';
import { QuestionsUI } from '../../../../model/types/questions';

type MappingData = {
  budget: {
    min: number;
    max: number;
}
      allBrands:Array<{ id: string, name: string}>
      venues: Array<{ id: string, name: string}>
      eventsType: Array<{ id: string, name: string}>
}
const createConcertFormData = (
  values: onSubmitFormDataType, mappingData: MappingData,
): QuestionsUI => ({
  ...values,
  userId: 'Mical001', // TODO: send proper user info through bearer tocken
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  eventType: mappingData.eventsType.find((e) => e.id === values.eventType)!,
  venue: mappingData.venues.filter((v) => values.venue.includes(v.id)),
  artistBudget: mappingData.budget,
  targetAudience: {
    ageGroup: values.age,
    gender: values.gender,
    genre: values.genre.map((genre: string) => ({
      genreId: '886863',
      genreName: genre,
    })),
  },
  wantedBrands: mappingData.allBrands.filter((b) => values.wantedBrands.includes(b.id)),
  unwantedBrands: mappingData.allBrands.filter((b) => values.unwantedBrands.includes(b.id)),
  whatSellsMost: {
    beer: [],
    liquor: [],
    softDrinks: [],
  },
});

export default createConcertFormData;
