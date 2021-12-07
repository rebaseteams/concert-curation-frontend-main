import { TextEncoder, TextDecoder } from 'util';

/* eslint-disable*/
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

import { UnsecuredJWT, JWTPayload } from 'jose';
import jwtDecode from 'jwt-decode';

import { TokenData, TokenService } from '../services/token.service';

export class UnsignedTokenService implements TokenService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly issuer = 'UnsignedTokenService',
    private readonly emailKey = 'https://claims.auth0.com/email',
    private readonly canonicalIdKey = 'https://claims.auth0.com/canonical_id',
  ) { }

  async getToken(data: Omit<TokenData, 'issuer'>): Promise<string> {
    return new UnsecuredJWT({
      [this.emailKey]: data.email,
      [this.canonicalIdKey]: data.canonicalId,
    })
      .setSubject(data.subject)
      .setIssuedAt()
      .setIssuer(this.issuer)
      .setExpirationTime('1h')
      .encode();
  }

  async getData(token: string): Promise<TokenData> {
    const payload = <JWTPayload>jwtDecode(token);
    const email = payload[this.emailKey];
    const canonicalId = payload[this.canonicalIdKey];

    if (typeof email !== 'string' || typeof canonicalId !== 'string' || typeof payload.sub !== 'string') {
      throw new Error('invalid token');
    }

    return {
      canonicalId,
      email,
      issuer: this.issuer,
      subject: payload.sub,
    };
  }
}
