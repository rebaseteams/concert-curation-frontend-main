export default function extractUserToken(): { userId : string, token : string } {
  // TODO: this function should idealy pass a JWD token comming from AUTH0
  const userId = localStorage.getItem('userid') ?? '';
  const token = localStorage.getItem('token') ?? '';
  return { userId, token };
}
