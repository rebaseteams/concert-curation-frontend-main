import { Link } from 'react-router-dom';
import checkResourceAction from '../../../utils/checkResourceAction';

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
    {
      checkResourceAction(
        'superadmin dashboard',
        'view',
        <Link className="button-text" to="superadmin/dashboard">
          SuperAdmin Dashboard
        </Link>,
      )
    }

  </div>
);

export default Branding;
