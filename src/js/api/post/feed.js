import { API_POSTS_BASE } from "../constants.js";

import { headers } from "../headers.js";

export async function fetchAllPosts() {
  return fetch(`${API_POSTS_BASE}?_author=true&_comments=true&_reactions=true`, {
    headers: headers(true),
  }).then(res => res.json());
}
