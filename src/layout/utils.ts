/* eslint-disable linebreak-style */
export interface ArtistData {
    'artist_name': string;
    'artist_id': string;
    'artist_image': string;
    'match_percentage': number;
    'match_attributes': {
      'venues': [
        {
          'id': string;
          'name': string;
          'address': {
            'pincode': number;
            'country': string;
            'city': string;
            'geo_location': {
              'lat': number;
              'lag': number;
            }
          },
          'venue_capacity': number;
          'match_percentage': number;
        }
      ];
      'age': [
        {
          'age_group':string;
          'match_percentage': number;
        }
      ];
      'gender': {
        'male': number;
        'female': number;
      };
      'genre': [
        {
          'genre_name':string;
          'value': number;
        }
      ];
      'associated_brands': [
        {
          'id': string;
          'name': string;
          'contact': string;
          'website': string;
          'logo_url': string;
        }
      ]
    };
    'summary': string;
}
