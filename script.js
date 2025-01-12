// script.js

document.addEventListener("DOMContentLoaded", function () {
  // ---------------- Login Functionality ----------------
  const loginForm = document.querySelector("form");

  if (loginForm && window.location.pathname.includes("login.html")) {
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
        window.location.href = "homepage.html"; // Redirect to a protected page
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });

    // Redirect to signup page when clicking "SIGNUP" link
    const signupLink = document.getElementById("signup");
    if (signupLink) {
      signupLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default behavior
        window.location.href = "Signup.html"; // Redirect to signup page
      });
    }
  }

  // ---------------- Signup Functionality ----------------
  const signupForm = document.querySelector("form");

  if (signupForm && window.location.pathname.includes("Signup.html")) {
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
      window.location.href = "login.html"; // Redirect to login page
    });

    // Email validation function
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  // ---------------- Protected Page Access Check ----------------
  if (window.location.pathname.includes("homepage.html")) {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      alert("Unauthorized access! Please sign up first.");
      window.location.href = "Signup.html";
    }
  }

  // ---------------- Homepage Functionality ----------------
  if (window.location.pathname.includes("homepage.html")) {
    // Dropdown menu functionality
    const accountElement = document.querySelector(".account");
    const dropdownMenu = document.querySelector(".drop-down");

    if (accountElement && dropdownMenu) {
      accountElement.addEventListener("mouseenter", () => {
        dropdownMenu.style.display = "block";
      });

      accountElement.addEventListener("mouseleave", () => {
        dropdownMenu.style.display = "none";
      });
    }

    // Recipe box navigation
    const recipeBoxes = document.querySelectorAll(".box");
    recipeBoxes.forEach((box) => {
      box.addEventListener("click", () => {
        const recipeCategory = box.querySelector("h2").textContent;
        const formattedCategory = recipeCategory.toLowerCase().replace(/\s+/g, "-");
        window.location.href = `${formattedCategory}.html`;
      });
    });

    // Navigation bar functionality
    const navLinks = document.querySelectorAll(".nav-description div");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const section = link.textContent.toLowerCase();
        if (section === "home") {
          window.location.href = "home.html";
        } else if (section === "about us") {
          window.location.href = "about.html";
        } else if (section === "recipes") {
          window.location.href = "recipes.html";
        } else if (section === "contact") {
          window.location.href = "contact.html";
        } else {
          alert("Page not found!");
        }
      });
    });

    // Footer quick links
    const footerLinks = document.querySelectorAll(".footer1 ul:nth-child(1) a");
    footerLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (index === 0) {
          window.location.href = "about.html";
        } else if (index === 1) {
          window.location.href = "terms.html";
        } else if (index === 2) {
          window.location.href = "privacy.html";
        }
      });
    });

    // Social media links
    const socialLinks = document.querySelectorAll(".footer1 ul:nth-child(2) a");
    socialLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (index === 0) {
          window.open("https://facebook.com", "_blank");
        } else if (index === 1) {
          window.open("https://instagram.com", "_blank");
        } else if (index === 2) {
          window.open("https://youtube.com", "_blank");
        }
      });
    });
  }
});
