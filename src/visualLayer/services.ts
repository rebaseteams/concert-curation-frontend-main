import ArtistRecommendationRepo from '../dataLayer/repositories/http/artistRecommendation';
import AuthRepo from '../dataLayer/repositories/http/auth';
import DocumentsRepo from '../dataLayer/repositories/http/documents';
import ArtistRecommendation from '../dataLayer/services/artistRecommendation';
import Auth from '../dataLayer/services/auth';
import Documents from '../dataLayer/services/documents';

const services = {
  Documents: new Documents(new DocumentsRepo()),
  ArtistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo()),
  Auth: new Auth(new AuthRepo()),
};

export default services;
