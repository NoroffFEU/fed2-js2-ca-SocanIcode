import { readPostById } from "@/js/api/post/edit.js";
import { fetchPostsBYId } from "../../api/post/update";


const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const form = document.getElementById("editPostForm");

if (!postId) {
  alert("Post ID missing");
  window.location.href = "/index.html";
}

async function initEditForm() {
  try {
    const post = await fetchPostsBYId(postId);

    form.title.value = post.title;
    form.body.value = post.body;
    form.tags.value = post.tags.join(", ");
    form.media.value = post.media?.url || "";
    form.mediaAlt.value = post.media?.alt || "";

  } catch (err) {
    alert(" Failed to load post");
    console.error(err);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedData = {
    title:form.title.value.trim(),
    body: form.body.value.trim(),
    tags: form.tags.value.split(",").map(tag => tag.trim()),
    media: {
      url: form.media.value.trim(),
      alt: form.mediaAlt.value.trim()
    }
  };

  try {
    await updatePost(postId, updatedData);
    alert(" Post updated!");
    window.location.href = "/index.html?updated=1";
  } catch (err) {
    console.error("failed to update:",err);
    alert(" Update failed");
    console.error(err);
  }
});

initEditForm();
