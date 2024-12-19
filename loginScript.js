document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("form");
  
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
  
        // Get values from input fields
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;
  
        // Retrieve stored user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem("user"));
  
        if (!storedUser) {
          alert("No account found! Please sign up first.");
          window.location.href = "Signup.html";
          return;
        }
  
        // Validate user credentials
        if (
          username === storedUser.username &&
          password === storedUser.password
        ) {
          alert("Login successful! Redirecting to the dashboard...");
          window.location.href = "dashboard.html"; // Redirect to a protected page
        } else {
          alert("Invalid username or password. Please try again.");
        }
      });
    }
  });
  
  // --------------- Protected Page Access Check ---------------
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("dashboard.html")) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        alert("Unauthorized access! Please log in first.");
        window.location.href = "index.html";
      }
    }
  });

  // Redirect to signup page when clicking "SIGNUP" link on login page
document.addEventListener("DOMContentLoaded", function () {
    const signupLink = document.getElementById("signup-link");
  
    if (signupLink) {
      signupLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default behavior
        window.location.href = "signup.html"; // Redirect to signup page
      });
    }
  });
  