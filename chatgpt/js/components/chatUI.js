// Chat UI related functions
export const createMessageElement = (message, isIncoming = false) => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", isIncoming ? "incoming" : "outgoing");
  
  messageDiv.innerHTML = `
    <div class="icon material-symbols-rounded ${isIncoming ? "" : "hide"}">
      ${isIncoming ? "smart_toy" : "person"}
    </div>
    <div class="text"></div>
    <button class="copy-button material-symbols-rounded" title="Copy text">content_copy</button>
  `;

  // Add copy functionality
  const copyButton = messageDiv.querySelector(".copy-button");
  copyButton.addEventListener("click", () => {
    const textContent = messageDiv.querySelector(".text").textContent;
    navigator.clipboard.writeText(textContent).then(() => {
      copyButton.textContent = "check";
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.textContent = "content_copy";
        copyButton.classList.remove("copied");
      }, 2000);
    });
  });
  
  return messageDiv;
};

export const addSuggestionClickHandlers = (chatInput) => {
  const suggestions = document.querySelectorAll(".suggestion");
  suggestions.forEach(suggestion => {
    suggestion.addEventListener("click", () => {
      const text = suggestion.querySelector(".text").textContent;
      chatInput.value = text;
      chatInput.focus();
    });
  });
};
