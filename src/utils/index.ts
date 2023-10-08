export const getYesterday = (createdAt: Date | string): boolean => {
  return new Date().getTime() / 1000 - new Date(createdAt).getTime() / 1000 < 86400 ? true : false;
};
