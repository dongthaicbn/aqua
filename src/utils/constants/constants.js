// common
export const TOKEN = 'tokenkey';
export const ACCOUNT = 'ACCOUNT';
export const SUCCESS_CODE = 'OK';
export const IOT_ADMIN_KEY = 'iotadmintokenkey';

// roles
export const roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
};

// routes
export const routes = {
  ERROR: '/error',
  LOGIN: '/login',
  LOGOUT: '/logout',
  MAP: '/map/:type',
  USER_MANAGEMENT: '/user-management',
  DEVICE_MANAGEMENT: '/device',
};
export const TYPE_MAP = {
  ADMIN: 'admin',
  HAWACO: 'hawaco',
  DEEPC: 'deepc',
  TEST: 'test',
};
export const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
};
export const NUMBER_REGEX = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
export const URL_REGEX = /^((ftp|http|https):\/\/).*$/;
