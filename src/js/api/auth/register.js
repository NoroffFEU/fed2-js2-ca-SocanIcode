 import { API_AUTH_REGISTER } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Sends a login request to the API.
 * @param {Object} userInfo - Contains required Username, email and password.
 * @returns {Promise<Object>} Parsed JSON response.
 */
export async function registerUser(userData) {
  const res = await fetch(API_AUTH_REGISTER, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(userData),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.errors?.[0]?.message || "Registration failed");
  }

  return result;
}

