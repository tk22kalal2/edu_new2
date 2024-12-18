// Ad Manager Configuration
const adConfig = {
  refreshInterval: 30000, // 30 seconds
  lazyLoadThreshold: 0.5, // 50% visibility
};

// Initialize Ad Slots
const adSlots = {
  topBanner: null,
  stickyAd: null,
  topContent: null,
  midContent: null,
  bottomContent: null,
  stickyBottom: null
};

// Lazy Loading Observer
const observerOptions = {
  root: null,
  rootMargin: '50px',
  threshold: adConfig.lazyLoadThreshold
};

const adObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadAd(entry.target.id);
      adObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Initialize Ad Slots
function initializeAds() {
  Object.keys(adSlots).forEach(slotId => {
    const adContainer = document.getElementById(slotId);
    if (adContainer) {
      adContainer.classList.add('loading');
      adObserver.observe(adContainer);
    }
  });
}

// Load Ad Content
function loadAd(slotId) {
  const adContainer = document.getElementById(slotId);
  if (!adContainer) return;

  // Remove loading state
  adContainer.classList.remove('loading');
  
  // Here you would typically integrate with your ad network's code
  // For example, with Google AdSense:
  /*
  (adsbygoogle = window.adsbygoogle || []).push({});
  */
}

// Refresh Ads Periodically
function setupAdRefresh() {
  setInterval(() => {
    Object.keys(adSlots).forEach(slotId => {
      if (isElementVisible(document.getElementById(slotId))) {
        loadAd(slotId);
      }
    });
  }, adConfig.refreshInterval);
}

// Utility: Check if element is visible
function isElementVisible(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeAds();
  setupAdRefresh();
});

// Handle Page Visibility Changes
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    Object.keys(adSlots).forEach(slotId => {
      if (isElementVisible(document.getElementById(slotId))) {
        loadAd(slotId);
      }
    });
  }
});