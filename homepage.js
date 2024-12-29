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
