import { API_PROFILE_BY_NAME } from  "../constants.js";
import { headers } from "../headers.js";

/**
 * Updates the logged-in user's profile.
 * @param {string} username - The user’s name.
 * @param {Object} updates - { bio, avatar: { url, alt }, banner: { url, alt } }
 * @returns {Promise<Object>} - Updated profile data.
 */
export async function updateProfile(username, updates) {
  const response = await fetch(API_PROFILE_BY_NAME(username), {
    method: "PUT",
    headers: headers(true),
    body: JSON.stringify(updates),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.errors?.[0]?.message || "Failed to update profile.");
  }

  return result;
}
