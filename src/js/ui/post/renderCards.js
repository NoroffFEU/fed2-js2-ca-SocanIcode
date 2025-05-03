
import { fetchAllPosts } from "@/js/api/post/feed.js";
import { deletePost } from "@/js/api/post/delete.js";




export function renderPostCard(post, container) {
  const card = document.createElement("div");
  card.classList.add("post-box");

  card.innerHTML = `
    <h3>${post.title}</h3>
    <img src="${post.media?.url || "#"}" alt="${post.media?.alt || "Post image"}" />
    <p>${post.body}</p>
    <button class="edit-post" data-id="${post.id}">Edit</button>
    <button class="delete-post" data-id="${post.id}">Delete</button>
  `;

  container.prepend(card);
}

export async function renderFeed() {
  const container = document.getElementById("post-box");
  container.innerHTML = "";

  // newPost 
  const newPostRaw = sessionStorage.getItem("newPost");
  if (newPostRaw) {
    const newPost = JSON.parse(newPostRaw);
    renderPostCard(newPost, container);
    sessionStorage.removeItem("newPost");
  }

  try {
    const { data: posts } = await fetchAllPosts();
     posts.forEach(post => renderPostCard(post, container));

    // Edit page 
    document.querySelectorAll(".edit-post").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        window.location.href = `/post/edit/index.html?id=${id}`;
      });
    });

    // delete post 
    document.querySelectorAll(".delete-post").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (!confirm("Are you sure you want to delete this post?")) return;
        try {
          await deletePost(id);
          alert("Post deleted!");
          renderFeed();
        } catch (err) {
          alert("Failed to delete post.");
          console.error(err);
        }
      });
    });

  } catch (err) {
    container.innerHTML = "<p> Failed to load posts</p>";
    console.error(err);
  }
  

}
