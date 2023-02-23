// eslint-disable class-methods-use-this
import { ArtistInterface } from '../../../../model/interfaces/artist';
import { ArtistFilter, ArtistDetailsType } from '../../../../model/types/artist';

export class InMemArtistRepo implements ArtistInterface {
  constructor() {
    const data = localStorage.getItem('artist-list');
    if (!data) {
      const artists: Array<ArtistDetailsType> = [{
        id: '1',
        name: 'Megadeth',
        url: '/artist/1.png',
        genres: ['Pop', 'Electropop', 'Electro house', 'Folk'],
        cover: 'https://images.saymedia-content.com/.image/c_limit%2Ccs_srgb%2Cq_auto:eco%2Cw_700/MTc0NDkxOTM0NTY2MzkzMTky/100-best-rock-bands-of-the-2010s.webp',
        profileAvatar: 'https://i2-prod.walesonline.co.uk/news/uk-news/article23927263.ece/ALTERNATES/s810/0_F038F02A-D11F-11EC-A042-0A2111BCB09D.jpg',
        location: 'Miami, FL',
        type: 'Solo Artist',
        contact: {
          role: 'Manager',
          name: 'Chad Zenner',
          address: '3020 NW 24th Street, Miami, FL',
          phone: '(786) 121 1891',
          email: 'paigejenner_pop@gmail.com',
        },
      }];

      localStorage.setItem('artist-list', JSON.stringify(artists));
    }
  }
  // eslint-disable-next-line
  async getAll(f?: ArtistFilter | undefined): Promise<ArtistDetailsType[]> {
    const data = localStorage.getItem('artist-list');
    return JSON.parse(data || '[]') as Array<ArtistDetailsType>;
  }

  async get(id: string): Promise<ArtistDetailsType> {
    const data = localStorage.getItem('artist-list');
    const res = JSON.parse(data || '[]') as Array<ArtistDetailsType>;

    return res.find((x) => x.id === id) || {} as ArtistDetailsType;
  }

  async set(a: ArtistDetailsType): Promise<ArtistDetailsType> {
    const data = localStorage.getItem('artist-list');
    const res = JSON.parse(data || '[]') as Array<ArtistDetailsType>;

    if (res.find((x) => x.id === a.id)) {
      res.splice(res.findIndex((x) => x.id === a.id), 1);
    }

    res.push(a);
    localStorage.setItem('artist-list', JSON.stringify(res));

    return a;
  }

  async delete(id: string): Promise<void> {
    const data = localStorage.getItem('artist-list');
    const res = JSON.parse(data || '[]') as Array<ArtistDetailsType>;

    if (res.find((x) => x.id === id)) {
      res.splice(res.findIndex((x) => x.id === id), 1);
    }

    localStorage.setItem('artist-list', JSON.stringify(res));
  }
}
