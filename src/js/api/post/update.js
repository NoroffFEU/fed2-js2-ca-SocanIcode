import { API_POST_BY_ID } from "../constants.js";
import { headers } from "../headers.js";

async function getPostById(id) {
  const res = await fetch(API_POST_BY_ID(id), {
    headers: headers(true),
  });

  const data = await res.json();
  return data;
}

export async function updatePost(id, updatedData) {
  const res = await fetch(API_POST_BY_ID(id), {
    method: "PUT",
    headers: {
      ...headers(true),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update post: ${res.status}\n${errorText}`);
  }

  return await res.json();
}