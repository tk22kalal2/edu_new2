document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const referrer = document.referrer;
    const googleDomains = ["google.com", "google.co.in", "google.co.uk"];

    // Check if the user has visited from Google in this session
    const cameFromGoogle = sessionStorage.getItem("cameFromGoogle");

    // Determine if the referrer is from Google
    const fromGoogle = googleDomains.some((domain) => referrer.includes(domain));

    // Logic to manage session storage
    if (fromGoogle) {
        sessionStorage.setItem("cameFromGoogle", "true"); // Set session storage flag
    } else {
        // If not coming from Google and there's no session flag, show the popup
        if (!cameFromGoogle) {
            popup.classList.add("active"); // Show the pop-up
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    // Do not reset or remove the session storage flag; it will persist
});
