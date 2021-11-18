export default function extractUserToken(): string {
  // TODO: this function should idealy pass a JWD token comming from AUTH0
  const userId = localStorage.getItem('userid') ?? '';
  return userId;
}
