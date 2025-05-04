// this is what I added
import { getAllPosts } from "./feed.js";
getAllPosts();

const feedContainer = document.getElementById("#feed");

if (feedContainer) {
  getAllPosts(feedContainer);
}
const searchInput = document.getElementById("#searchInput");

if (feedContainer) {
  getAllPosts(feedContainer);
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    if (query.length > 2) {
      searchPosts(query);
    } else {
      getAllPosts(feedContainer);
    }
  });
}
