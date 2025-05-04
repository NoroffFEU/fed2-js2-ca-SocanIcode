import { getFollowing, unfollowUser } from "@/js/api/follow/following.js";


export async function renderFollowingList(username) {
  try {
    const { data: users } = await getFollowing(username);
    container.innerHTML = "";

    users.forEach(user => {
      const box = document.createElement("div");
      box.classList.add("follow-box");

      box.innerHTML = `
        <img src="${user.avatar?.url || '#'}" alt="${user.name}'s avatar" class="avatar" />
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
          renderFollowingList(username);
        }
      });
    });

  } catch (error) {
    container.innerHTML = "<p>Failed to load following list.</p>";
    console.error(error);
  }
}
