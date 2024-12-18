

document.addEventListener('DOMContentLoaded', function() {
  // Get the referrer (the URL of the previous page)
  let referrer = document.referrer.toLowerCase();

  // List of social media domains or apps to check against
  const socialMediaDomains = [
    'facebook.com', 
    'fb.com', 
    'twitter.com', 
    'instagram.com', 
    'whatsapp.com', 
    't.co', 
    'telegram.org', 
    'linkedin.com', 
    'reddit.com'
  ];

  // Check if the referrer is a social media platform or a direct access (empty referrer)
  let isSocialMedia = socialMediaDomains.some(domain => referrer.includes(domain));
  

  if (isSocialMedia || isDirectAccess) {
    alert("You are using a social media web-browser or direct link to access the website. Kindly search 'afrahtafreeh site' on Google and use the website. Otherwise, you will be banned.");
  }
});
