import { searchPosts } from "@/js/api/post/search.js";
import { loadNav } from "/src/js/ui/global/nav.js";
loadNav();

const params = new URLSearchParams(window.location.search);
const query = params.get("query");
const results = document.getElementById("searchResults");

async function runSearch(query) {
  if (!query) {
    results.innerHTML = "<p> Please  correct search .</p>";
    return;
  }

  const posts = await searchPosts({ tag: query, author: query });

  if (!posts.length) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post-box";
    div.innerHTML = `
      <h3>${post.title}</h3>
      <img src="${post.media?.url || "#"}" alt="${post.media?.alt || "image"}">
      <p>${post.body}</p>
      <small>By ${post.author.name} | Tags: ${post.tags.join(", ")}</small>
    `;
    results.appendChild(div);
  });
}

runSearch(query);
