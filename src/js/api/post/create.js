import { API_POSTS_BASE } from "../constants.js";
import { headers } from "../headers.js";

export async function createPost(postData) {
  const res =await fetch(API_POSTS_BASE, {
    method: "POST",
    headers: headers(true), // required  auth  header
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Server error:", errorText);
    throw new Error(`Failed to create post: ${res.status}\n${errorText}`);
  }

  return await res.json();
}
