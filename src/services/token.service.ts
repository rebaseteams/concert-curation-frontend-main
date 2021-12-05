export interface TokenData {
  email: string;
  subject: string;
  issuer: string;
  canonicalId: string;
}

export interface TokenService {
  getToken(data: Omit<TokenData, 'issuer'>): Promise<string>;
  getData(token: string): Promise<TokenData>;
}
