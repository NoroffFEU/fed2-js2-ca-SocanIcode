/**
 * Dynamically loads the  nav bar into the pages.
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
        <a href="/follow/friends/following.html"><i class="fa-solid fa-user-group"></i> BFF Diary</a>
        <a href="/follow/friends/lockdairy.html"><i class="fa-solid fa-lock"></i> Lock Diary</a>
      </div>
      <div class="nav-right">
      <form id="navSearchForm">
      <input type="text" id="navSearchInput" placeholder="Search" />
      </form>
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
  const navForm = document.getElementById("navSearchForm");
  const navInput = document.getElementById("navSearchInput");

  if (
    currentPath === "/" ||
    currentPath === "/index.html" ||
    currentPath === "/index"
  ) {
    logo.addEventListener("click", () => {
      if (!localStorage.getItem("welcomeShown")) {
        alert("Welcome to Ingera Diary! Register to get started.");
        localStorage.setItem("welcomeShown", "true");
      }
      window.location.href = "/auth/index.html";
    });
  } else {
    logo.addEventListener("click", () => {
      window.location.href = "/feed/index.html";
    });

    navForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = navInput.value.trim();
      if (query) {
        window.location.href = `/search.html?query=${encodeURIComponent(query)}`;
      }
    });
  }
}
