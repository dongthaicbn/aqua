const config = () => {
  const env = process.env.BUILD_MODE || 'local';
  let BASE_URL = 'http://171.244.141.250:8888';
  // ENV DEV
  if (env === 'dev') {
    BASE_URL = 'http://171.244.141.250:8888';
  } else if (env === 'stg') {
    // STG
    BASE_URL = 'http://171.244.141.250:8888';
  } else if (env === 'prod') {
    // PROD
    BASE_URL = 'http://171.244.141.250:8888';
  }
  return { BASE_URL };
};
const serverConfig = config();

export default serverConfig;
