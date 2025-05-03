import { fetchAllPosts } from "@/js/api/post/feed.js";
import { deletePost } from "@/js/api/post/delete.js"; // ✅ move this to the top

export async function renderFeed() {
  const container = document.getElementById("post-box");
  container.innerHTML = "";

  try {
    const posts = await fetchAllPosts();

    posts.forEach(post => {
      const card = document.createElement("div");
      card.classList.add("post-box");

      card.innerHTML = `
        <h3>${post.title}</h3>
        <img src="${post.media?.url}" alt="${post.media?.alt}" />
        <p>${post.body}</p>
        <button class="edit-post" data-id="${post.id}">Edit</button>
        <button class="delete-post" data-id="${post.id}">Delete</button>
      `;

      container.appendChild(card);
    });

    // this is section for handling renderCards for edit
    document.querySelectorAll(".edit-post").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        window.location.href = `/post/edit/index.html?id=${id}`;
      });
    });

    //  // this is section for handling renderCards for delete
    document.querySelectorAll(".delete-post").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id; 
        const confirmDelete = confirm("🗑 Are you sure you want to delete this post?");
        if (!confirmDelete) return;

        try {
          await deletePost(id);
          alert(" Post deleted!");
          renderFeed(); // I will check it later if this actually rendering 
        } catch (err) {
          alert(" Failed to delete post.");
          console.error(err);
        }
      });
    });

  } catch (err) {
    container.innerHTML = "<p> Failed to load posts</p>";
    console.error(err);
  }
}
