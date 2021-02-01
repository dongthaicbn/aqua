// common
export const TOKEN = 'token';

// roles
export const roles = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  GUEST: 'ROLE_GUEST',
};

// routes
export const routes = {
  ERROR: '/error',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CHANGE_PASSWORD: '/change-password',
  SOLUTION: '/solution',
  NOTIFICATION: '/notification',
  HISTORY: '/history',
  USER: '/user',
  SETTING: '/setting',
};
export const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
};
export const NUMBER_REGEX = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
export const URL_REGEX = /^((ftp|http|https):\/\/).*$/;
