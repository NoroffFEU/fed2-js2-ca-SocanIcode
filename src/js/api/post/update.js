import { API_POST_BY_ID } from "../constants.js";

import { headers } from "../headers.js";

export async function fetchPostsBYId(id) {
  const res = await fetch(API_POST_BY_ID(id), {
        headers: headers(true),
    });

  }

export async function updatePost(id, updatedData) {
  const res = await fetch (API_POST_BY_ID(id),{
    method:"PUT",
    headers: {
      ...headers(true),
      "Content-Type": "application'json",

    },
    body:JSON.stringify(updatedData),
    

  });

  if (!res.ok) {
    throw new Error(`Failed to update post:${res.status}\n${text}`);
}
  return await res.json();
}


  

