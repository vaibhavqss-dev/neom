/**
 * Auth utilities for token management and authentication
 */

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Save token to localStorage
export const setToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("token");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

// Create Authorization header
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check token expiration (if your token is a JWT)
export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    // JWT tokens are in format: header.payload.signature
    const payload = token.split(".")[1];
    if (!payload) return true;

    // Decode the base64 payload
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(window.atob(base64));

    // Check if token has expiration claim
    if (!decodedPayload.exp) return false;

    // Check if token is expired
    const expirationTime = decodedPayload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (e) {
    console.error("Error checking token expiration:", e);
    return true; // Assume expired if we can't validate it
  }
};
