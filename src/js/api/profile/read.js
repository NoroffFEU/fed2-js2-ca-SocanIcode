import { API_PROFILE_BY_NAME } from "../constants.js";
import { headers } from "../headers.js";

/**
 * Fetches a user's profile from the API.
 * @param {string} username - Username to fetch.
 * @returns {Promise<Object>} - Profile data.
 */
export async function readProfile(username) {
  const response = await fetch(API_PROFILE_BY_NAME(username), {
    method: "GET",
    headers: headers(true),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to load profile.");
  }

  return result;
}
