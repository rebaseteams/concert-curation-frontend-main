import React, { useEffect } from 'react';
import services from '../services';

const Comp1 = () => {
  useEffect(() => {
    services.ArtistRecommendation.addNewRecommendation({
      concertName: 'Demo', eventType: 'Music Concert', venue: ['Delhi'], artistBudget: { min: 20000, max: 50000 }, sponsorshipType: 'Brand awareness', wantedBrands: [{ brandId: '65265373', brandName: 'Coca Cola' }], unwantedBrands: [{ brandId: '65265373', brandName: 'Coca Cola' }], userId: 'Mical001', targetAudience: { ageGroup: ['18-25'], gender: ['male'], genre: [{ genreId: '886863', genreName: 'Hollywood' }] }, whatSellsMost: { beer: [], liquor: [], softDrinks: [] },
    });
    services.ArtistRecommendation.getRecommendation('4ea34412-f533-4ad6-8cbc-844f576fe6d8');
    services.ArtistRecommendation.getAllRecommendations();
  }, []);

  return (
    <div>
      comp1
    </div>
  );
};

export default Comp1;
