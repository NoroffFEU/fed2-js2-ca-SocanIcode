import { readProfile } from "@/js/api/profile/read.js";
import { updateProfile } from "@/js/api/profile/update.js";

/**
 * Main initializer for profile page.
 */
export async function setupProfileUpdate() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name;
  if (!username) return (window.location.href = "/auth/register.html/");

  try {
    const profile = await readProfile(username);
    renderProfile(profile);
    setupForm(profile, username);
  } catch (error) {
    console.error("Profile load error:", error);
    alert(error.message);
  }
}

/**
 * Renders user profile
 * @param {object} profile - Profile data from API.
 */
function renderProfile(profile) {
  const profileContainer = document.getElementById("profileContainer");
  const avatarContainer = document.getElementById("avatarContainer");
  const bannerContainer = document.getElementById("bannerContainer");
  const bannerUrl = "https://example.com/banner.jpg";
  bannerContainer.style.backgroundImage = `url("${bannerUrl}")`;

  // Update banner
  if (bannerContainer) {
    bannerContainer.innerHTML = `
      <img id="profileBanner" src="${profile.banner?.url || "#"}" alt="${profile.banner?.alt || "Banner"}">
    `;
  }

  // the image  is not diplayed as an avatar, I need to fix it
  if (avatarContainer) {
    avatarContainer.innerHTML = `
      <img id="profileAvatar" src="${profile.avatar?.url || "#"}" alt="${profile.avatar?.alt || "Avatar"}" class="avatar">
    `;
  }

  // Update text info
  if (profileContainer) {
    const heading = document.getElementById("username");
    if (heading) heading.textContent = profile.name;

    const bioInfo = document.getElementById("profileBio");
    if (bioInfo) bioInfo.textContent = profile.bio || "No bio provided";
  }
}

/**
 * Sets up the profile update .
 */
function setupForm(profile, username) {
  const form = document.getElementById("updateProfileForm");
  const editBtn = document.getElementById("editProfileBtn");

  if (!form || !editBtn) return;

  // Pre-fill form
  form.bio.value = profile.bio || "";
  form["avatar-url"].value = profile.avatar?.url || "";
  form["avatar-alt"].value = profile.avatar?.alt || "";
  form["banner-url"].value = profile.banner?.url || "";
  form["banner-alt"].value = profile.banner?.alt || "";

  // Hide form by default
  form.style.display = "none";

  editBtn.addEventListener("click", () => {
    form.style.display = "block";
    editBtn.style.display = "none";
  });

  // On submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updates = {
      bio: form.bio.value.trim(),
      avatar: {
        url: form["avatar-url"].value.trim(),
        alt: form["avatar-alt"].value.trim(),
      },
      banner: {
        url: form["banner-url"].value.trim(),
        alt: form["banner-alt"].value.trim(),
      },
    };

    try {
      await updateProfile(username, updates);
      alert(" Profile updated!");
      renderProfile({ ...profile, ...updates });
      form.style.display = "none";
      editBtn.style.display = "inline-block";
      location.reload();
    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "Failed to update profile.");
    }
  });
}

setupProfileUpdate();
