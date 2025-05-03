import { getFollowing, unfollowUser } from "@/js/api/follow/following.js";

const username = JSON.parse(localStorage.getItem("user"))?.name;
const container = document.getElementById("followingContainer");

if (!username) {
  container.innerHTML = "<p>Please log in to see your following list.</p>";
} else {
  renderFollowingList(username);
}

async function renderFollowingList(username) {
  try {
    const users = await getFollowing(username);
    container.innerHTML = "";

    users.forEach(user => {
      const box = document.createElement("div");
      box.classList.add("follow-box");

      box.innerHTML = `
        <img src="${user.avatar}" alt="${user.name}'s avatar" class="avatar" />
        <span>${user.name}</span>
        <button class="unfollow-btn" data-username="${user.name}">Unfollow</button>
      `;

      container.appendChild(box);
    });

    document.querySelectorAll(".unfollow-btn").forEach(button => {
      button.addEventListener("click", async (e) => {
        const targetUser = e.target.dataset.username;
        if (confirm(`Unfollow ${targetUser}?`)) {
          await unfollowUser(targetUser);
          renderFollowingList(username); // Refresh
        }
      });
    });

  } catch (error) {
    container.innerHTML = "<p>Failed to load following list.</p>";
    console.error(error);
  }
}
