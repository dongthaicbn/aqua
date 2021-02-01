const has = Object.prototype.hasOwnProperty;

export const isDiff = (A, B) => JSON.stringify(A) !== JSON.stringify(B);

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};
export const rules = (mess, length) => {
  if (length) {
    if (mess) {
      return [
        { required: true, whitespace: true, message: mess },
        { max: length, message: `Cannot input more than ${length} characters` },
      ];
    } else {
      return [
        { max: length, message: `Cannot input more than ${length} characters` },
      ];
    }
  } else if (mess) return [{ required: true, whitespace: true, message: mess }];
  return [];
};
export const getLanguage = (lang) => {
  switch (lang) {
    case 'vi':
      return 'viet nam';
    case 'en':
      return 'english';
    default:
      return '';
  }
};
export const trimValue = (obj) => {
  let temp = { ...obj };
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key].valueOf() === 'string') {
      temp[key] = obj[key].trim();
    }
  });
  return temp;
};
