import { Spin } from 'antd';
import { useBrandData as defaultuseBrandData, UseBrandData } from '../../../hooks/useBrandData';
import { BrandsInterface } from '../../../model/interfaces/brands';
import createBrandProfile from '../../components/BrandProfile';

interface createBrandPageProp {
  brandService: BrandsInterface;
  useBrandData?: UseBrandData;
}

const createBrandPage = ({
  brandService,
  useBrandData = defaultuseBrandData,
}:
  createBrandPageProp):
  () => JSX.Element => {
  const BrandPage = (): JSX.Element => {
    const { brand } = useBrandData(brandService);
    if (!brand) {
      return <Spin />;
    }
    const BrandProfile = createBrandProfile({ brand });
    return (
      <div>
        <div style={{ height: '88vh', overflow: 'auto' }}>
          <BrandProfile />
        </div>
      </div>
    );
  };

  return BrandPage;
};

export default createBrandPage;
