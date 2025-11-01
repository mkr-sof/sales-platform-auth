import xss from 'xss';

export const sanitizeBody = (body) => {
  return Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, typeof value === 'string' ? xss(value) : value])
  );
};