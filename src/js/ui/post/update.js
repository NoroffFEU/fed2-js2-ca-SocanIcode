import { getPostById, updatePost } from "/src/js/api/post/update.js";

/**
 * Handles editing post .
 * @param {Event} event - The form submit event.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#editPostForm");

  const titleInput = form.elements["title"];
  const bodyInput = form.elements["body"];
  const tagsInput = form.elements["tags"];
  const mediaInput = form.elements["media"];
  const mediaAltInput = form.elements["mediaAlt"];

  // Get ID from query string
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Missing post ID.");
    return;
  }

  // Fetch existing post and populate form
  try {
    const res = await fetch(`API_POST_BY_ID/${id}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.status}`);
    }
    const { data: post } = await res.json();

    titleInput.value = post.title || "";
    bodyInput.value = post.body || "";
    tagsInput.value = post.tags?.join(", ") || "";
    mediaInput.value = post.media?.url || "";
    mediaAltInput.value = post.media?.alt || "";
  } catch (err) {
    console.error("Failed to load post:", err);
    alert("Could not load the post.");
  }

  // Submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedPost = {
      title: titleInput.value,
      body: bodyInput.value,
      tags: tagsInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      media: {
        url: mediaInput.value,
        alt: mediaAltInput.value,
      },
    };

    try {
      await updatePost(id, updatedPost);
      alert("Post updated!");
      window.location.href = "/index/html";
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update the post.");
    }
  });
});
