export const getValidImageUrl = (url) => {
  if (!url || typeof url !== 'string') return null;
  
  const trimmedUrl = url.trim();
  if (trimmedUrl === '' || trimmedUrl.toLowerCase() === 'string') {
    return null;
  }
  
  return trimmedUrl;
};
