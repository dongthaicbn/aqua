const config = () => {
  const env = process.env.BUILD_MODE || 'local';
  let BASE_URL = 'https://smp-vos-stg-notification.vsmart.net';
  // ENV DEV
  if (env === 'dev') {
    BASE_URL = 'https://smp-vos-stg-notification.vsmart.net';
  } else if (env === 'stg') {
    // STG
    BASE_URL = 'https://smp-vos-stg-notification.vsmart.net';
  } else if (env === 'prod') {
    // PROD
    BASE_URL = 'https://smp-vos-notification.vsmart.net';
  }
  return { BASE_URL };
};
const serverConfig = config();

export default serverConfig;
