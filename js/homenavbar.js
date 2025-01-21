// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Search Bar Toggle
const searchIcon = document.getElementById('search-icon');
const searchContainer = document.getElementById('search-container');

searchIcon.addEventListener('click', () => {
  searchContainer.classList.toggle('active');
  navLinks.classList.remove('active'); // Hide nav links when search bar is active
});
