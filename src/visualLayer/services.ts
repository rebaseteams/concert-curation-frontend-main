import ArtistRecommendationRepo from '../dataLayer/repositories/http/artistRecommendation';
import AuthRepo from '../dataLayer/repositories/http/auth';
import DocumentsRepo from '../dataLayer/repositories/http/documents';
import TemplatesRepo from '../dataLayer/repositories/http/templates';
import ArtistRepo from '../dataLayer/repositories/inmemory/artist';
import Artist from '../dataLayer/services/artist';
import ArtistRecommendation from '../dataLayer/services/artistRecommendation';
import Auth from '../dataLayer/services/auth';
import Documents from '../dataLayer/services/documents';
import Templates from '../dataLayer/services/templates';

const services = {
  Documents: new Documents(new DocumentsRepo()),
  ArtistRecommendation: new ArtistRecommendation(new ArtistRecommendationRepo()),
  Auth: new Auth(new AuthRepo()),
  Templates: new Templates(new TemplatesRepo()),
  Artist: new Artist(new ArtistRepo()),
};

export default services;
