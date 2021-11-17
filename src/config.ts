const server = {
  dev: {
    protocol: 'http',
    host: 'localhost',
    port: '4000',
  },
  prod: {
    protocol: 'http',
    host: '52.66.164.23',
    port: '80',
  },
};

const DEV_SERVER = `${server.dev.protocol}://${server.dev.host}:${server.dev.port}`;
const PROD_SERVER = `${server.prod.protocol}://${server.prod.host}:${server.prod.port}`;
const config = {
  DEV_SERVER,
  PROD_SERVER,
};
export default config;
