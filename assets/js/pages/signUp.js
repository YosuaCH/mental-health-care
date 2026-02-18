import { registerClient } from "../services/authService.js";
import { setupPasswordValidator } from "../animations/password_validator.js";

// Input elements
const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");

// Error spans
const emailError = document.getElementById("emailError");
const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmPasswordError");

const isPasswordValid = setupPasswordValidator(passwordInput, confirmInput);

const clearError = (input, errorSpan) => {
  input.classList.remove("ring-2", "ring-red-500", "focus:ring-red-500");
  if (errorSpan) {
    errorSpan.classList.add("hidden");
    errorSpan.innerText = "";
  }
};

const showError = (input, span, msg) => {
  input.classList.add("ring-2", "ring-red-500", "focus:ring-red-500");
  if (span) {
    span.innerText = msg;
    span.classList.remove("hidden");
  }
};

[
  [emailInput, emailError],
  [usernameInput, usernameError],
  [passwordInput, passwordError],
  [confirmInput, confirmError],
].forEach(([input, span]) => {
  input.addEventListener("input", () => clearError(input, span));
});

emailInput.addEventListener("invalid", (e) => {
  e.preventDefault();
  const msg = emailInput.validity.valueMissing
    ? "Email wajib diisi"
    : "Format email salah";
  showError(emailInput, emailError, msg);
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  [emailInput, usernameInput, passwordInput, confirmInput].forEach((input) => {
    input.classList.remove("ring-2", "ring-red-500", "focus:ring-red-500");
  });

  if (!isPasswordValid()) {
    showError(
      confirmInput,
      confirmError,
      "Syarat keamanan belum terpenuhi atau konfirmasi salah",
    );
    return;
  }

  try {
    const res = await registerClient({
      email: emailInput.value,
      username: usernameInput.value,
      password: passwordInput.value,
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message || "Registrasi Berhasil!");
      window.location.href = "login.html";
    } else {
      const message = data.message || "";
      if (message.toLowerCase().includes("email")) {
        showError(emailInput, emailError, message);
      } else if (message.toLowerCase().includes("username")) {
        showError(usernameInput, usernameError, message);
      } else if (message.toLowerCase().includes("password")) {
        showError(passwordInput, passwordError, message);
      } else {
        // alert("Terjadi kesalahan: " + message);
      }
    }
  } catch (err) {
    console.error(err);
    alert("Server tidak merespon, coba lagi nanti.");
  }
});
