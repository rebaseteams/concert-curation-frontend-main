import { Link } from 'react-router-dom';

const Branding = (): JSX.Element => (
  <div className="height-100 column-flex justify-center align-center first-sec">
    <h4>Cuttime</h4>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Odit ab voluptate assumenda maiores cumque itaque nostrum,
      expedita amet ratione neque sequi nisi illum vel explicabo animi eius,
      ut atque. Similique.
    </p>
    <Link className="button-text" to="dashboard">
      Dashboard
    </Link>
  </div>
);

export default Branding;
