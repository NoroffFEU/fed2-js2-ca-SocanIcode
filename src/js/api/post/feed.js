import { API_POSTS_BASE } from "../constants.js";
import { API_POST_COMMENT } from "../constants.js";
import { API_DELETE_COMMENT } from "../constants.js";
import { API_POST_REACT } from "../constants.js";
import { headers } from "../headers.js";

export async function fetchAllPosts() {
  return fetch(`${API_POSTS_BASE}?_author=true&_comments=true&_reactions=true`, {
    headers: headers(true),
  }).then(res => res.json());
}


// Get all comments for a post
export async function fetchComments(postId) {
  const res = await fetch(API_POST_COMMENT(postId), {
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to fetch comments");
  const result = await res.json();
  return result.data;
}

// Post a new comment
export async function postComment(postId, body) {
  const res = await fetch(API_POST_COMMENT(postId), {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error("Failed to post comment");
  return await res.json();
}


// React with emoji
export async function reactToPost(postId, emoji) {
  const url = API_POST_REACT(postId, emoji);
  const res = await fetch(url, {
    method: "PUT",
    headers: headers(true), 
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Failed to react to post\n${res.status}: ${errorData}`);
  }

  return await res.json();
}