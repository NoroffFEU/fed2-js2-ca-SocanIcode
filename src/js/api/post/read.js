// this handles all the delete post and comments
import { API_POST_BY_ID } from "../constants.js";

import { headers } from "../headers.js";
/**
 * get a single post by its ID.
 * @param {string} id - The post ID.
 * @returns {Promise<Object>} The post data.
 */

export async function getSinglePost(id) {
  const response = await fetch(API_POST_BY_ID(id), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch post: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
}
