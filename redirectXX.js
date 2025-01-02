
  // Select all buttons with the class 'redirect-button'
  document.querySelectorAll('.redirect-button').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();  // Prevent default link behavior
      
      let countdown = 1;
      const originalText = this.innerHTML;
      const link = this.querySelector('a');  // Find the <a> element inside the button
      const targetUrl = link.getAttribute('href');  // Get the href attribute of the <a>
      
      // Disable button to prevent multiple clicks and show countdown
      this.disabled = true;
      this.innerHTML = `Redirecting in ${countdown}...`;
      
      const countdownInterval = setInterval(() => {
        countdown--;
        this.innerHTML = `Redirecting in ${countdown}...`;
        
        // Once countdown reaches 0, stop the interval and redirect
        if (countdown <= 0) {
          clearInterval(countdownInterval);
          window.location.href = targetUrl;
        }
      }, 1000);
    });
  });
