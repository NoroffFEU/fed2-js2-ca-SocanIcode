import { API_POST_BY_ID } from "../constants.js";

import { headers } from "../headers.js";

export async function updatePost(id, data) {
  const res = await fetch(API_POST_BY_ID(id), {
    method: "PUT",
    headers: {
      ...headers(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
}

