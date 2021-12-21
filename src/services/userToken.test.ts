import mockLocalStorage from '../testUtils/mockLocalstorage';
import extractUserToken from './userToken';

const { getItemMock } = mockLocalStorage();

describe('User Token From Localstorage', () => {
  it('Should return user tocker if localstorage have userid', () => {
    getItemMock.mockReturnValue('1238989');
    expect(extractUserToken().userId).toEqual('1238989');
  });

  it('Should return "" empty if localstorage do not have userid', () => {
    getItemMock.mockReturnValue(null);
    expect(extractUserToken().userId).toEqual('');
  });
});
