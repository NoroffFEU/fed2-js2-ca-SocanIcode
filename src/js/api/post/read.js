
// this handles all the delete post and comments 
import {API_POST_BY_ID} from "../constants.js";

import { headers } from "../headers.js";
/**
 * get a single post by its ID.
 * @param {string} id - The post ID.
 * @returns {Promise<Object>} The post data.
 */


export async function getPostById(id) { 
  if (!id) throw new Error("Post ID is missing");

  const url = `${API_POST_BY_ID}`;
    console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: {
      ...headers(true)
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { data } = await res.json();
  return data;
}
