import { Link } from 'react-router-dom';
import checkResource from '../../../utils/checkResourceAction';

const Branding = (): JSX.Element => (
  <div className="height-100 column-flex justify-center align-center first-sec">
    <h4>Cuttime</h4>
    <p>
      Music and Brands
    </p>
    <p>
      Quantified and connected
    </p>
    <Link style={{ margin: '10px' }} className="button-text" to="dashboard">
      Dashboard
    </Link>
    { checkResource('superadmin dashboard',
      'view',
      (
        <Link style={{ margin: '10px' }} className="button-text" to="superadmin/dashboard">
          SuperAdmin Dashboard
        </Link>
      )) }
  </div>
);

export default Branding;
