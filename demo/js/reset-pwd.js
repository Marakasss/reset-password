const form = document.getElementById("resetForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.textContent = "";
  successMsg.textContent = "";

  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    errorMsg.textContent = "Passwords do not match!";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error resetting password");
    }

    successMsg.textContent = "Password updated successfully!";
    form.reset();
  } catch (err) {
    errorMsg.textContent = err.message;
  }
});
