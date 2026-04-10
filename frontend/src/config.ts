export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1313/api";

export const getWSBaseURL = (url: string) => {
  return url.replace(/^http/, "ws");
};

export const WS_BASE_URL = getWSBaseURL(API_BASE_URL);
