import { API_BASE } from "../constants.js";

import { headers } from "../headers.js";

export async function searchPosts(query) {
  const response = await fetch(`${API_BASE}/social/posts?q=${query}`);

  if (!response.ok) throw new Error("Search failed");

  return await response.json();
}

// this for following list
import { API_PROFILE_BY_NAME } from "@/js/constants.js";
import { headers } from "@/js/headers.js";

export async function getFollowing(username) {
  const res = await fetch(`${API_PROFILE_BY_NAME(username)}/following`, {
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to fetch following list");
  return await res.json();
}

// unfollow a user 
export async function unfollowUser(username) {
  const res = await fetch(`${API_PROFILE_BY_NAME(username)}/unfollow`, {
    method: "PUT",
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to unfollow");
  return await res.json();
}

//write comments on a post
export async function commentOnPost(postId, comment) {
  const res = await fetch(`${API_POST_COMMENT(postId)}`, {
    method: "POST",
    headers: {
      ...headers(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ body: comment })
  });
  if (!res.ok) throw new Error("Failed to comment");
  return await res.json();
}
//React to a Post with Emoji
export async function reactToPost(postId, emoji) {
  const res = await fetch(`${API_POST_REACT(postId, emoji)}`, {
    method: "PUT",
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to react");
  return await res.json();
}




