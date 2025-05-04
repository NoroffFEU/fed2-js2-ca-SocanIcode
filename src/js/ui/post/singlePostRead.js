import { getPostById } from "@/js/api/post/read.js";

document.addEventListener("DOMContentLoaded", async () => {
  const postContainer = document.querySelector("#postDetail");

  // Get post ID from query string
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    postContainer.innerHTML = "<p>Missing post ID in URL.</p>";
    return;
  }

  try {
    const response = await fetch(API_POST_BY_ID(postId));
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const { data: post } = await response.json();

    // Render post content
    postContainer.innerHTML = `
      <div class="post-card">
        <h1>${post.title}</h1>
        <p>${post.body}</p>
        ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || "Post media"}">` : ""}
        <p><strong>Tags:</strong> ${post.tags?.join(", ")}</p>
        <p><strong>Author:</strong> ${post.author?.name}</p>
      </div>
    `;
  } catch (error) {
    console.error("Error fetching post:", error);
    postContainer.innerHTML = `<p>Failed to load post. Please try again later.</p>`;
  }
});
