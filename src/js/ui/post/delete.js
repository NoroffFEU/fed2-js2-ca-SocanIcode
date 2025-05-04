import { deletePost} from "@/js/api/post/delete.js";

const form = document.getElementById("deletePostForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    alert(" No post ID found in URL.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  try {
    await deletePost(postId);
    alert(" Post deleted!");
    window.location.href = "/index.html";
  } catch (err) {
    console.error(" Failed to delete post:", err);
    alert("Failed to delete the post.");
  }
});


