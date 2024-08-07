export const convertedUrl = (url) => {
  return url.replace(/ /g, "-");
};

export const convertedUrlBack = (url) => {
  return url.replace(/-/g, " ");
};
