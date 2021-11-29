import ArtistRecommendationInterface from '../../model/interfaces/artistRecommendation';
import { PatchRequest } from '../../model/types/patch-request';
import { QuestionsUI } from '../../model/types/questions';
import {
  AddRecommendationResponse,
  DeleteRecommendationResponse,
  GetAllRecommendationsResponse,
  GetRecommendationResponse,
  PatchRecommendationResponse,
} from '../../model/types/service-response';

export default class ArtistRecommendation implements ArtistRecommendationInterface {
    private artistRecommendationRepo : ArtistRecommendationInterface;

    constructor(artistRecommendationRepo : ArtistRecommendationInterface) {
      this.artistRecommendationRepo = artistRecommendationRepo;
    }

    addNewRecommendation = async (concertData : QuestionsUI):
      Promise<AddRecommendationResponse> => new Promise((resolve) => {
      this.artistRecommendationRepo.addNewRecommendation(concertData).then(((response) => {
        resolve(response);
      }));
    });

    getAllRecommendations = async ():
      Promise<GetAllRecommendationsResponse> => new Promise((resolve) => {
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

    discardArtist = async (data : PatchRequest):
      Promise<PatchRecommendationResponse> => new Promise((resolve) => {
      this.artistRecommendationRepo.discardArtist(data).then((val) => {
        resolve(val);
      });
    });

    deleteRecommendation = async (recommendationId : string):
      Promise<DeleteRecommendationResponse> => new Promise((resolve) => {
      this.artistRecommendationRepo.deleteRecommendation(recommendationId).then((val) => {
        resolve(val);
      });
    });
}
