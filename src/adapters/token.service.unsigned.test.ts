import { UnsecuredJWT, generateKeyPair, SignJWT } from 'jose';
import { TextEncoder, TextDecoder } from 'util';
import { UnsignedTokenService } from './token.service.unsigned';
/* eslint-disable*/
global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

describe('UnsignedTokenService', () => {
  it('should encode and decode data into a token', async () => {
    const issuer = 'issuer';
    const service = new UnsignedTokenService(issuer);
    const canonicalId = 'canonical-id';
    const email = 'email';
    const subject = 'subject';

    const token = await service.getToken({ canonicalId, email, subject });

    const data = await service.getData(token);

    expect(data).toStrictEqual({
      issuer,
      canonicalId,
      email,
      subject,
    });
  });

  it('should be able to decode UnsignedJWT tokens', async () => {
    const canonicalId = 'canonical-id';
    const email = 'email';
    const subject = 'subject';
    const unsignedToken = new UnsecuredJWT({
      'https://claims.auth0.com/email': email,
      'https://claims.auth0.com/canonical_id': canonicalId,
    })
      .setSubject(subject)
      .setIssuedAt()
      .setIssuer('unsignedTokenService')
      .setExpirationTime('1h')
      .encode();
    const issuer = 'issuer';
    const service = new UnsignedTokenService(issuer);
    const data = await service.getData(unsignedToken);

    expect(data).toStrictEqual({
      issuer,
      canonicalId,
      email,
      subject,
    });
  });


  it('should be able to decode SignedJWT tokens', async () => {
    const canonicalId = 'canonical-id';
    const email = 'email';
    const subject = 'subject';
    const algorithm = 'E256';
    const { privateKey } = await generateKeyPair(algorithm);
    const issuer = 'issuer';

    const signedToken = await new SignJWT({
      'https://claims.auth0.com/email': email,
      'https://claims.auth0.com/canonical_id': canonicalId,
    })
      .setSubject(subject)
      .setIssuedAt()
      .setIssuer(issuer)
      .setProtectedHeader({ alg: algorithm })
      .setJti('jwtId')
      .setExpirationTime('1h')
      .sign(privateKey);
    const service = new UnsignedTokenService(issuer);
    const data = await service.getData(signedToken);

    expect(data).toStrictEqual({
      issuer,
      canonicalId,
      email,
      subject,
    });
  });
});
