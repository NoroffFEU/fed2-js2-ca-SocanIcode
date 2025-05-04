import { loginUser } from "../../api/auth/login.js";
handleLoginForm();

export function handleLoginForm() {
  const form = document.querySelector("#loginForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userInfo = Object.fromEntries(formData.entries());
    

    try {
      const result = await loginUser(userInfo);
      console.log("API response:", result);
      




      // Save access token and user to localStorage
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("user", JSON.stringify(result.data));

      alert("Login successful! Redirecting to your profile...");
  
        window.location.href = "/index.html";
    
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  });
}

handleLoginForm();
