import ArtistRecommendationRepo from '../dataLayer/repositories/http/artistRecommendation';
import AuthRepo from '../dataLayer/repositories/http/auth';
import ArtistRecommendation from '../dataLayer/services/artistRecommendation';
import Auth from '../dataLayer/services/auth';

const services = {
  ArtistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo()),
  Auth: new Auth(new AuthRepo()),
};

export default services;
