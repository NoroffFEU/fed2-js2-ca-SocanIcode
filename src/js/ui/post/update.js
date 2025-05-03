import { readPostById } from "@/js/api/post/read.js";
import { updatePost } from "@/js/api/post/update.js";

// Get post ID from URL
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const form = document.getElementById("editPostForm");

if (!postId) {
  alert("Post ID missing");
  window.location.href = "/index.html";
}

async function initEditForm() {
  try {
    const post = await readPostById(postId);

    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags.join(", ");
    form.media.value = post.media?.url || "";
    form.mediaAlt.value = post.media?.alt || "";

  } catch (err) {
    alert("❌ Failed to load post");
    console.error(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedPost = {
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    tags: form.tags.value.split(",").map(tag => tag.trim()),
    media: {
      url: form.media.value.trim(),
      alt: form.mediaAlt.value.trim()
    }
  };

  try {
    await updatePost(postId, updatedPost);
    alert(" Post updated!");
    window.location.href = "/index.html";
  } catch (err) {
    alert(" Update failed");
    console.error(err);
  }
});

initEditForm();
