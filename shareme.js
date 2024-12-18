
  const shareBtn = document.querySelector("#shareBtn");
  const copyLinkBtn = document.querySelector("#copyLinkBtn");
  const linkToCopy = "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://afrahtafreeh.site/&ved=2ahUKEwi7wsD2zqGJAxXa0KACHcNlETIQFnoECAoQAQ&usg=AOvVaw2QQLPo-csS_03x2ILqJvke";

  // Web Share API for Share Button
  shareBtn.addEventListener("click", (event) => {
    if (navigator.share) {
      navigator.share({
        title: "Nextpulse Official Website",
        url: linkToCopy
      })
      .then(() => {
        console.log("Thanks for sharing");
      })
      .catch((err) => {
        console.log("Error using the Web Share API:");
        console.log(err);
      });
    } else {
      alert("Browser doesn't support this Web Share API");
    }
  });

  // Copy Link Functionality
  copyLinkBtn.addEventListener("click", (event) => {
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.log("Failed to copy the link:", err);
      });
  });
