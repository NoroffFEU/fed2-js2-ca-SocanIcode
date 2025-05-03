import { API_PROFILE_BY_NAME } from "@/js/constants.js";
import { headers } from "@/js/headers.js";

export async function getFollowing(username) {
  const res = await fetch(`${API_PROFILE_BY_NAME(username)}/following`, {
    headers: headers(true)
  });
  if (!res.ok) throw new Error("Failed to get following list");
  return await res.json();
}

export async function unfollowUser(username) {
  const res = await fetch(`${API_PROFILE_BY_NAME(username)}/unfollow`, {
    method: "PUT",
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to unfollow user");
  return await res.json();
}
