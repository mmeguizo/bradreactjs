// utils/auth.js
export const decodeToken = (token) => {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1]; // Extract payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64)); // Decode & parse JSON
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
