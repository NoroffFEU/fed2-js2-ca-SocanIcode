import { updatePost} from "@/js/api/post/edit.js";
export async function fetchPostsBYId(id) {
  const res = await fetch(`${API_POST_BY_ID(id)}`, {
    headers: headers(true),
  });

  if (!res.ok) throw new Error("Failed to fetch post");
  return await res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${API_POST_BY_ID(id)}`, {
    method: "PUT",
    headers: headers(true),
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update post");
  return await res.json();
}
initEditForm();
