
// mine
import { API_POST_BY_ID } from "../constants.js";

import { headers } from "../headers.js";

export async function readPostById(id) {
  const res = await fetch(API_POST_BY_ID(id), {
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
}

