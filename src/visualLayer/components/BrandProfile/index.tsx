/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  Button,
  Image,
  Tabs,
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { NewBrandResponse } from '../../../model/types/brand';

// Importing components
import IconRenderer from '../IconRenderer';
import BrandContactDetails from './brand-contact';
import BrandInsights from './brand-insights';
import BrandOverview from './brand-overview';

// styles
import './brandProfile.scss';

const { Title } = Typography;
const { TabPane } = Tabs;

type BrandProfileProp = {
  brand: NewBrandResponse,
}

const createBrandProfile = ({ brand }: BrandProfileProp): () => JSX.Element | null => {
  return function BrandProfile(): JSX.Element {
    const navigate = useNavigate();
    const redirectBack = () => {
      navigate(-1);
    };
    return (
      <div className="brand-profile-container">
        <div
          className="brand-profile-heading"
          style={{
            background: `url(${brand.logo})`,
          }}
        >
          <Button className="back-button" type="text" onClick={() => redirectBack()}>
            {IconRenderer('back')}
          </Button>
          <Image
            className="brand-logo"
            width={200}
            src={brand.logo}
            preview={false}
          />
          <a href={brand.website} target="_blank" rel="noreferrer">
            <Title className="brand-name" level={1}>
              {brand.name}
            </Title>
          </a>
        </div>
        <div className="brand-profile-body">
          <Tabs centered>
            <TabPane tab="Overview" key="overview-tab">
              <div>
                <BrandOverview brand={brand} />
              </div>
            </TabPane>
            <TabPane tab="Insights" key="insights-tab">
              <BrandInsights brand={brand} />
            </TabPane>
            <TabPane tab="Contact details" key="contact-tab">
              <BrandContactDetails brand={brand} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };
};

export default createBrandProfile;
