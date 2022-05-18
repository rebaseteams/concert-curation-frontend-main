import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BrandsInterface } from '../model/interfaces/brands';
import { NewBrandResponse } from '../model/types/brand';

type BrandData = {
  brand: NewBrandResponse | undefined;
}

const useBrandData = (brandService: BrandsInterface): BrandData => {
  const [brand, setBrand] = useState<NewBrandResponse>();
  const { id } = useParams();

  const getBrandData = async () => {
    if (id) {
      const response = await brandService.getById(id);
      if (response.success) {
        setBrand(response.data);
      }
    }
  };

  useEffect(() => {
    getBrandData();
  }, [id]);

  return {
    brand,
  };
};

export type UseBrandData = (brandService: BrandsInterface) => BrandData

export { useBrandData };
