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
          window.location.href = "homepage.html"; // Redirect to a protected page
        } else {
          alert("Invalid username or password. Please try again.");
        }
      });
    }
  });
  // Signup

  // --------------- Protected Page Access Check ---------------
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("homepage.html")) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        alert("Unauthorized access! Please log in first.");
        window.location.href = "login.html";
      }
    }
  });

  // Redirect to signup page when clicking "SIGNUP" link on login page
document.addEventListener("DOMContentLoaded", function () {
    const signupLink = document.getElementById("signup-link");
  
    if (signupLink) {
      signupLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default behavior
        window.location.href = "Signup.html"; // Redirect to signup page
      });
    }
  });
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
        window.location.href = "login.html"; // Redirect to login page
      });
    }
  
    // Email validation function
    function validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });

  // Select elements
const accountElement = document.querySelector('.account');
const dropdownMenu = document.querySelector('.drop-down');
const recipeBoxes = document.querySelectorAll('.box');

// Toggle dropdown menu for account on hover
accountElement.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
});

accountElement.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
});

// Add click event listeners to recipe boxes
recipeBoxes.forEach((box) => {
    box.addEventListener('click', () => {
        const recipeCategory = box.querySelector('h2').textContent;
        const formattedCategory = recipeCategory.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `${formattedCategory}.html`;
    });
});

// Homepage

// Smooth navigation with HTML file redirection
const navLinks = document.querySelectorAll('.nav-description div');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        const targetSection = link.textContent.toLowerCase();
        switch (targetSection) {
            case 'home':
                window.location.href = 'home.html';
                break;
            case 'about us':
                window.location.href = 'about.html';
                break;
            case 'recipes':
                window.location.href = 'recipes.html';
                break;
            case 'contact':
                window.location.href = 'contact.html';
                break;
            default:
                alert('Page not found!');
        }
    });
});

  