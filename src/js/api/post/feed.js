import { API_POSTS_BASE } from "../constants.js";

import { headers } from "../headers.js";
export async function fetchAllPosts() {
  const res = await fetch(`${API_POSTS_BASE}?_author=true&_comments=true&_reactions=true`, {
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return await res.json();
}
