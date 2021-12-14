import AuthRepo from '../dataLayer/repositories/http/auth';
import DocumentsRepo from '../dataLayer/repositories/http/documents';
import TemplatesRepo from '../dataLayer/repositories/http/templates';
import ArtistRepo from '../dataLayer/repositories/http/artist';
import Artist from '../dataLayer/services/artist';
import Auth from '../dataLayer/services/auth';
import Documents from '../dataLayer/services/documents';
import Templates from '../dataLayer/services/templates';

const services = {
  Documents: new Documents(new DocumentsRepo()),
  Auth: new Auth(new AuthRepo()),
  Templates: new Templates(new TemplatesRepo()),
  Artist: new Artist(new ArtistRepo()),
};

export default services;
