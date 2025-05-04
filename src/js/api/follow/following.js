import { API_PROFILE_FOLLOW, API_PROFILE_UNFOLLOW } from "../constants.js";
import { headers } from "../headers.js";

export async function getFollowing(username) {
  const res = await fetch(API_PROFILE_FOLLOW(username), {
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to get following list");
  return await res.json();
}


// this is for follow/unfollower friend

export async function followUser(username) {
  const res = await fetch(API_PROFILE_FOLLOW(username), {
    method: "PUT",
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to follow user");
  return await res.json();
}

export async function unfollowUser(username) {
  const res = await fetch(API_PROFILE_UNFOLLOW(username), {
    method: "PUT",
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to unfollow user");
  return await res.json();
}
