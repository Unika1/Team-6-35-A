document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.querySelector("form");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get values from input fields
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email")?.value.trim();
      const password = document.getElementById("password").value;

      // Input Validation
      if (!username || !email || !password) {
        alert("All fields are required!");
        return;
      }

      if (!validateEmail(email)) {
        alert("Invalid email format!");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      // Store user data in localStorage
      const userData = { username, email, password };
      localStorage.setItem("user", JSON.stringify(userData));

      alert("Signup successful! Redirecting to login page...");
      window.location.href = "index.html"; // Redirect to login page
    });
  }

  // Email validation function
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
