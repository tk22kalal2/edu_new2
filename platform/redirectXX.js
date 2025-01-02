// Select all buttons with the class 'custom-button'
document.querySelectorAll('.custom-button').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    
    let countdown = 15;
    const originalContent = this.innerHTML; // Store original content of the button
    const targetUrl = this.getAttribute('href'); // Get the href attribute of the <a>
    
    // Disable button to prevent multiple clicks and show countdown
    this.style.pointerEvents = 'none'; // Disable pointer events to prevent multiple clicks
    const buttonText = this.querySelector('.button-text');
    if (buttonText) {
      buttonText.innerHTML = `<h1>Redirecting in ${countdown}...</h1>`;
    }
    
    const countdownInterval = setInterval(() => {
      countdown--;
      if (buttonText) {
        buttonText.innerHTML = `<h1>Redirecting in ${countdown}...</h1>`;
      }
      
      // Once countdown reaches 0, stop the interval and redirect
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        window.location.href = targetUrl;
      }
    }, 1000);
  });
});
