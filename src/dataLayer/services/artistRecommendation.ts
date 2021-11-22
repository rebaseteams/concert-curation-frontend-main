import ArtistRecommendationInterface from '../../model/interfaces/artistRecommendation';
import { PatchRequest } from '../../model/types/patch-request';
import { QuestionsUI } from '../../model/types/questions';
import { ServiceResponse } from '../../model/types/service-response';

export default class ArtistRecommendation implements ArtistRecommendationInterface {
    private artistRecommendationRepo : ArtistRecommendationInterface;

    constructor(artistRecommendationRepo : ArtistRecommendationInterface) {
      this.artistRecommendationRepo = artistRecommendationRepo;
    }

    addNewRecommendation = (concertData : QuestionsUI) => {
      this.artistRecommendationRepo.addNewRecommendation(concertData);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getAllRecommendations = async (): Promise<any> => {
      const data: ServiceResponse = await this.artistRecommendationRepo.getAllRecommendations();
      return data;
    }

    getRecommendation = (recommendationId : string) => {
      this.artistRecommendationRepo.getRecommendation(recommendationId);
    };

    discardArtist = (data : PatchRequest) => {
      this.artistRecommendationRepo.discardArtist(data);
    };

    deleteRecommendation = (recommendationId : string) => {
      this.artistRecommendationRepo.deleteRecommendation(recommendationId);
    };
}
