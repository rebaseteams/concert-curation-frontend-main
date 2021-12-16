import Branding from './branding';
import Information from './information';
import './landing.scss';
import Products from './products';

const LandingPage = (): JSX.Element => (
  <div className="landing-page">
    <Branding />

    <Information />

    <Products />
  </div>
);

export default LandingPage;
