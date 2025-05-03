/**
 * Dynamically loads the main navigation bar into the page.
 * Redirects on logo click based on current page.
 */
export function loadNav() {
  const navTarget = document.getElementById("nav");
  if (!navTarget) return;

  const currentPath = window.location.pathname;

  navTarget.innerHTML = `
    <nav class="main-nav">
      <div class="nav-left">
        <img src="https://wudasi6951.live-website.com/wp-content/uploads/2025/05/Logo.png" alt="Ingera Dairy Logo" id="nav-logo" />
        <h1>Ingera Dairy</h1>
        <p>spilling all the spices</p>
      </div>
      <div class="nav-center">
        <a href="/index.html"><i class="fa-solid fa-home"></i> Home</a>
        <a href="/follow/following/bffdairy.html"><i class="fa-solid fa-user-group"></i> BFF Diary</a>
        <a href="/follow/following/lockdairy.html"><i class="fa-solid fa-lock"></i> Lock Diary</a>
      </div>
      <div class="nav-right">
        <a href="/post/create/index.html"><i class="fa-solid fa-plus"></i> Create Post</a>
        <a href="/messages/index.html"><i class="fa-solid fa-message"></i></a>
        <a href="/notifications/index.html"><i class="fa-solid fa-bell"></i></a>
        <a href="/settings/index.html"><i class="fa-solid fa-gear"></i></a>
        <a href="/profile/index.html">Profile</a>
        <a href="/auth/login/index.html">Logout</a>
      </div>
    </nav>
  `;

  const logo = document.getElementById("nav-logo");

  if (
    currentPath === "/" ||
    currentPath === "/index.html" ||
    currentPath === "/index"
  ) {
    logo.addEventListener("click", () => {
      alert("Welcome to SocialMedia! Register to get started.");
      window.location.href = "/auth/index.html";
    });
  } else {
    logo.addEventListener("click", () => {
      window.location.href = "/feed/index.html";
    });
  }
}
