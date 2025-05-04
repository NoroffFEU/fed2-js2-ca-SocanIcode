import { API_PROFILE_FOLLOW } from "../constants.js";
import { API_PROFILE_UNFOLLOW } from "../constants";
import { headers } from "../headers.js";

export async function getFollowing(users) {
  const res = await fetch(API_PROFILE_FOLLOW, {
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to get following list");
  return await res.json();
}


// this is for unfollower friend

export async function unfollowUser(users) {
  const res = await fetch(API_PROFILE_UNFOLLOW, {
    method: "PUT",
    headers: headers(true),
  });
  if (!res.ok) throw new Error("Failed to unfollow user");
  return await res.json();
}
