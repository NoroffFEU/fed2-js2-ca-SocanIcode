import { getPostById} from "@/js/api/post/read.js";
import {postComment, reactToPost } from "@/js/api/post/feed.js";



const container = document.getElementById("postDetail");
const commentsContainer = document.getElementById("commentsContainer");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");

function getIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }
  
  const id = new URLSearchParams(window.location.search).get("id");

export async function loadPostDetail() {
  if (!id) {
    container.innerHTML = "<p>Post ID is missing in URL</p>";
    return;
  }

  try {
    const post = await getPostById(id);

    container.innerHTML = `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      ${post.media?.url ? `<img src="${post.media.url}" alt="${post.media.alt || 'Post image'}" />` : ""}
    `;
  } catch (error) {
    console.error("Error loading post:", error.message);
    container.innerHTML = `
      <p>Failed to load post.</p>
      <p>Error: ${error.message}</p>
    `;
  }
}
    document.querySelectorAll(".reactions button").forEach(btn => {
      btn.addEventListener("click", async () => {
        try {
          await reactToPost(id, btn.dataset.emoji);
          btn.classList.add("reacted");
          alert("Reacted!");
        } catch (err) {
          console.error("Reaction failed", err);
        }
      });
    });
