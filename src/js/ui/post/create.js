import { createPost } from "@/js/api/post/create.js";

const form = document.getElementById("createPostForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();         // will fail if "title" doesn't exist
  const body = form.body.value.trim();
  const tags = form.tags.value.split(",").map(t => t.trim());
  const media = {
    url: form.media.value.trim(),
    alt: form.mediaAlt.value.trim()
  };



  try {
    await createPost({ title, body, tags, media });
    alert("✅ Post created!");
    window.location.href = "/index.html"; // redirect to feed
  } catch (err) {
    console.error(" Failed to create post:", err);
    alert("Post creation failed");
  }
});


