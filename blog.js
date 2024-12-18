// Select all the buttons with the class 'read-more-btn'
const readMoreButtons = document.querySelectorAll('.read-more-btn');

// Add a click event listener for each button
readMoreButtons.forEach((button) => {
  button.addEventListener('click', function() {
    const contentWrapper = this.previousElementSibling; // Select the previous sibling which is the content wrapper
    const blogContent = contentWrapper.closest('.blog-content'); // Select the closest blog-content parent

    // Toggle the 'expanded' class on the content wrapper and blog content
    contentWrapper.classList.toggle('expanded');
    blogContent.classList.toggle('expanded');

    // Change button text based on expanded state
    if (contentWrapper.classList.contains('expanded')) {
      this.textContent = 'Show Less'; // Change button text to 'Show Less'
    } else {
      this.textContent = 'Read More...'; // Change button text to 'Read More'
    }
  });
});
