import { API_PROFILE_SEARCH } from "../constants.js";
import { headers } from "../headers.js";

// search post by tag or author 

export async function searchPosts({ tag = "", author = "" }) {
  const url = new URL(API_PROFILE_SEARCH);

  if (tag) url.searchParams.append("_tag", tag);
  if (author) url.searchParams.append("_author", true); 

  const res = await fetch(url, {
    headers: headers(true),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const result = await res.json();

  if (author) {
    return result.data.filter(post =>
      post.author?.name?.toLowerCase().includes(author.toLowerCase())
    );
  }

  return result.data;
}
