
import { createPost } from "@/js/api/post/create.js";

const form = document.getElementById("createPostForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const postData = {
    title: form.title.value.trim(),
    body: form.body.value.trim(),
    tags: form.tags.value.split(",").map(t => t.trim()),
    media: {
      url: form.media.value.trim(),
      alt: form.mediaAlt.value.trim(),
    },
  };

  try {
    const result = await createPost(postData);
    sessionStorage.setItem("newPost", JSON.stringify(result.data || result));
    window.location.href = "/index.html?new=1";
  } catch (err) {
    alert("Failed to create post");
    console.error(err);
  }
});