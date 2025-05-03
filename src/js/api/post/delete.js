import { API_POST_BY_ID } from "../constants.js";

import { headers } from "../headers.js";

export async function deletePost(id) {
  const res = await fetch(API_POST_BY_ID(id), {
    method: "DELETE",
    headers: headers(true)
  });

  if (!res.ok) {
    throw new Error(`Failed to delete post: ${res.status}`);
  }

  return await res.json();
}

