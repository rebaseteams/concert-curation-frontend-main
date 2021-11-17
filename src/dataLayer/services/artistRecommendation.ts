import ArtistRecommendationInterface from '../../model/interfaces/artistRecommendation';
import { PatchRequest } from '../../model/types/patch-request';
import { QuestionsUI } from '../../model/types/questions';

export default class ArtistRecommendation implements ArtistRecommendationInterface {
    private artistRecommendationRepo : ArtistRecommendationInterface;

    constructor(artistRecommendationRepo : ArtistRecommendationInterface) {
      this.artistRecommendationRepo = artistRecommendationRepo;
    }

    addNewRecommendation = (concertData : QuestionsUI) => {
      this.artistRecommendationRepo.addNewRecommendation(concertData);
    };

    getAllRecommendations = () => {
      this.artistRecommendationRepo.getAllRecommendations();
    };

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
