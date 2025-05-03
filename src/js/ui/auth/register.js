import { registerUser} from "../../api/auth/register.js";
handleRegisterForm();

//  REGISTER
export function handleRegisterForm() {
  const form = document.querySelector("#registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userInfo = Object.fromEntries(formData.entries());
    

    try {
      const result = await registerUser(userInfo);
      console.log("API response:", result);
      
  
      if (res.ok) {
        alert("✅ Registered! Redirecting to login...");
        window.location.href = "/auth/login/index.html";
      } else {
        alert(result.errors?.[0]?.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong.");
    }
  });
}
handleRegisterForm();

