// eslint-disable class-methods-use-this
import { ConcertInterface } from '../../../../model/interfaces/concert';
import { ConcertFilter, ConcertType } from '../../../../model/types/concert';

export class InMemConcertRepo implements ConcertInterface {
  // eslint-disable-next-line
  async getAll(f?: ConcertFilter | undefined): Promise<ConcertType[]> {
    const data = localStorage.getItem('concert-list');
    return JSON.parse(data || '[]') as Array<ConcertType>;
  }

  async get(id: string): Promise<ConcertType> {
    const data = localStorage.getItem('concert-list');
    const res = JSON.parse(data || '[]') as Array<ConcertType>;

    return res.find((x) => x.id === id) || {} as ConcertType;
  }

  async set(a: ConcertType): Promise<ConcertType> {
    const data = localStorage.getItem('concert-list');
    const res = JSON.parse(data || '[]') as Array<ConcertType>;

    if (res.find((x) => x.id === a.id)) {
      res.splice(res.findIndex((x) => x.id === a.id), 1);
    }

    res.push(a);
    localStorage.setItem('concert-list', JSON.stringify(res));

    return a;
  }

  async delete(id: string): Promise<void> {
    const data = localStorage.getItem('concert-list');
    const res = JSON.parse(data || '[]') as Array<ConcertType>;

    if (res.find((x) => x.id === id)) {
      res.splice(res.findIndex((x) => x.id === id), 1);
    }

    localStorage.setItem('concert-list', JSON.stringify(res));
  }
}
