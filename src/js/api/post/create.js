import { API_POSTS_BASE } from "../constants.js";

import { headers } from "../headers.js";

export async function createPost(postData) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found — are you logged in?");
  }

  const res = await fetch("API_POST_BASE", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error("❌ Server error:", errorData);
    throw new Error("Failed to create post");
  }

  return await res.json();
}
