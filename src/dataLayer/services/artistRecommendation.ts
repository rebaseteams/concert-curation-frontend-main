import ArtistRecommendationInterface from '../../model/interfaces/artistRecommendation';
import { PatchRequest } from '../../model/types/patch-request';
import { QuestionsUI } from '../../model/types/questions';
import { GetRecommendationResponse, ServiceResponse } from '../../model/types/service-response';

export default class ArtistRecommendation implements ArtistRecommendationInterface {
    private artistRecommendationRepo : ArtistRecommendationInterface;

    constructor(artistRecommendationRepo : ArtistRecommendationInterface) {
      this.artistRecommendationRepo = artistRecommendationRepo;
    }

    addNewRecommendation = (concertData : QuestionsUI) => {
      this.artistRecommendationRepo.addNewRecommendation(concertData);
    };

    getAllRecommendations = async (): Promise<ServiceResponse> => new Promise((resolve) => {
      this.artistRecommendationRepo.getAllRecommendations().then((data) => {
        resolve(data);
      });
    });

    // eslint-disable-next-line arrow-body-style
    getRecommendation = async (recommendationId : string): Promise<GetRecommendationResponse> => {
      return new Promise((resolve) => {
        this.artistRecommendationRepo.getRecommendation(recommendationId).then((val) => {
          resolve(val);
        });
      });
    };

    discardArtist = (data : PatchRequest) => {
      this.artistRecommendationRepo.discardArtist(data);
    };

    deleteRecommendation = (recommendationId : string) => {
      this.artistRecommendationRepo.deleteRecommendation(recommendationId);
    };
}
