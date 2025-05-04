import {
  getFollowing,
  followUser,
  unfollowUser,
} from "@/js/api/follow/following.js";

export async function renderFriendList(currentUsername) {
  const container = document.querySelector("#friendsList");

  if (!container) {
    console.error("Container #friendsList not found.");
    return;
  }

  try {
    const { data: friends } = await getFollowing(currentUsername);

    const followingUsernames = friends.map((user) => user.name);
    container.innerHTML = "";

    friends.forEach((friend) => {
      const box = document.createElement("div");
      box.classList.add("friend-box");

      // Real status
      const isFollowing = followingUsernames.includes(friend.name);
      const buttonLabel = isFollowing ? "Unfollow" : "Follow";
      const buttonColor = isFollowing ? "#007bff" : "#ccc";
      const buttonTextColor = isFollowing ? "white" : "black";

      box.innerHTML = `
        <img src="${friend.avatar?.url || "#"}" alt="${friend.name}'s avatar" class="avatar" />
        <span>${friend.name}</span>
        <button 
          class="follow-toggle" 
          data-username="${friend.name}" 
          style="background-color: ${buttonColor}; color: ${buttonTextColor};">
          ${buttonLabel}
        </button>
      `;

      container.appendChild(box);
    });

    container.querySelectorAll(".follow-toggle").forEach((button) => {
      button.addEventListener("click", async () => {
        const targetUser = button.dataset.username;
        const isCurrentlyFollowing = button.textContent === "Unfollow";

        const confirmed = isCurrentlyFollowing
          ? confirm(`Are you sure you want to unfollow ${targetUser}?`)
          : true;

        if (!confirmed) return;

        button.disabled = true;
        button.textContent = "Please wait...";

        try {
          if (isCurrentlyFollowing) {
            await unfollowUser(targetUser);
            button.textContent = "Follow";
            button.style.backgroundColor = "#ccc";
            button.style.color = "black";
          } else {
            await followUser(targetUser);
            button.textContent = "Unfollow";
            button.style.backgroundColor = "#007bff";
            button.style.color = "white";
          }
        } catch (error) {
          console.error("Failed to toggle follow:", error);
          alert("Something went wrong. Try again.");
        } finally {
          button.disabled = false;
        }
      });
    });
  } catch (error) {
    container.innerHTML = "<p>Failed to load friend list.</p>";
    console.error(error);
  }
}
