import ArtistRecommendationRepo from '../dataLayer/repositories/http/artistRecommendation';
import ArtistRecommendation from '../dataLayer/services/artistRecommendation';

const services = {
  ArtistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo()),
};

export default services;
