
import { fetchAllPosts, postComment, reactToPost } from "@/js/api/post/feed.js";
import { deletePost,} from "@/js/api/post/delete.js";


/**
 * Renders  post card inside the specified container.
 * @param {Object} post - The post object to render.
 * @param {HTMLElement} container - The container element to append the card to.
 */

export function renderPostCard(post, container) {
  const card = document.createElement("div");
  card.classList.add("post-box");

  card.innerHTML = `
  <a href="/post/index.html?id=${post.id}" class="post-link">
    <h3>${post.title}</h3>
    <img src="${post.media?.url || "#"}" alt="${post.media?.alt || "image"}" />
    <p>${post.body}</p>
  </a>

  <button class="edit-post" data-id="${post.id}">Edit</button>
  <button class="delete-post" data-id="${post.id}">Delete</button>

  <form class="comment-form" data-id="${post.id}">
    <input type="text" placeholder="Add comment" />
    <button type="submit">send</button>
  </form>

  <div class="reaction-buttons" data-id="${post.id}">
    <button data-emoji="thumbsUp" class="emoji-btn thumbs-up">👍 <span class="count">${post._count?.reactions || 0}</span></button>
    <button data-emoji="thumbsDown" class="emoji-btn thumbs-down">👎 <span class="count">${post._count?.reactions || 0}</span></button>
    <button data-emoji="heart" class="emoji-btn heart">❤️ <span class="count">${post._count?.reactions || 0}</span></button>
    <button data-emoji="laugh" class="emoji-btn laugh">😂 <span class="count">${post._count?.reactions || 0}</span></button>
  </div>
  <button class="follow-toggle" data-username="${post.author?.name}">Follow</button>

    </a>
`;

  container.appendChild(card);
}
/**
 * Renders the entire post feed and attaches event listeners to each post card.
 * Also handles new post rendering and post interaction (edit, delete, comment, react, follow and unfollow).
 * @async
 */

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


    // Handle comments
    
document.querySelectorAll(".comment-form").forEach(form => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const postId = form.dataset.id;
    const input = form.querySelector("input");
    const text = input.value.trim();
    if (!text) return;

    try {
      await postComment(postId, text);
      alert("Comment posted!");
      input.value = "";
    } catch (err) {
      alert(" Failed comment.");
      console.error(err);
    }
  });
});



// Handling the  reactions
document.querySelectorAll(".reaction-buttons button").forEach(button => {
  button.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const emoji = btn.dataset.emoji;
    const postId = btn.closest(".reaction-buttons")?.dataset.id;

    if (!emoji || !postId) {
      console.warn("Missing emoji or postId", { emoji, postId });
      return;
    }

    try {
      await reactToPost(postId, emoji);  

      // Update count 
      const countSpan = btn.querySelector(".count");
      const currentCount = parseInt(countSpan.textContent) || 0;
      countSpan.textContent = currentCount + 1;

      btn.classList.toggle("active");
    } catch (err) {
      console.error("Failed to react:", err);
    }
  });
});
  } catch (err) {
    container.innerHTML = "<p> Failed to load posts</p>";
    console.error(err);
  }
  

}
