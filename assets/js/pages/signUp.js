import { registerClient } from "../services/authService.js";
import { setupPasswordValidator } from "../animations/password_validator.js";

const registerForm = document.getElementById("registerForm");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

const isPasswordValid = setupPasswordValidator(passwordInput, confirmInput);

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isPasswordValid()) return;

  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = passwordInput.value;

  try {
    const res = await registerClient({ email, username, password });
    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Register sukses");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Register gagal");
    }
  } catch (err) {
    alert("Server tidak bisa diakses");
  }
});
