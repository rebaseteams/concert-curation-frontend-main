import { Link } from 'react-router-dom';

const Branding = (): JSX.Element => (
  <div className="height-100 column-flex justify-center align-center first-sec">
    <h4>Cuttime</h4>
    <p>
      Music and Brands
    </p>
    <p>
      Quantified and connected
    </p>
    <Link className="button-text" to="dashboard">
      Dashboard
    </Link>
  </div>
);

export default Branding;
