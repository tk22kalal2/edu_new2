// Teacher database
const teachers = [
  { name: 'Dr. Govind Rai Garg', subject: 'PHARMACOLOGY', page: 'Plugins/pharmacologycb.html' },
  { name: 'Dr. Deepak Mehrah', subject: 'MEDICINE', page: 'Plugins/medicinep6.html' }
];

// Search functionality
const searchBox = document.getElementById('searchBox');
const suggestionsContainer = document.createElement('div');
suggestionsContainer.className = 'search-suggestions';
searchBox.parentNode.appendChild(suggestionsContainer);

searchBox.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  if (query.length < 2) {
    suggestionsContainer.classList.remove('active');
    return;
  }

  const matches = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(query) || 
    teacher.subject.toLowerCase().includes(query)
  );

  if (matches.length > 0) {
    suggestionsContainer.innerHTML = matches.map(teacher => `
      <div class="suggestion-item" data-page="${teacher.page}">
        <div class="suggestion-name">${teacher.name}</div>
        <div class="suggestion-subject">${teacher.subject}</div>
      </div>
    `).join('');
    suggestionsContainer.classList.add('active');
  } else {
    suggestionsContainer.classList.remove('active');
  }
});

// Handle suggestion clicks
suggestionsContainer.addEventListener('click', (e) => {
  const suggestionItem = e.target.closest('.suggestion-item');
  if (suggestionItem) {
    const page = suggestionItem.dataset.page;
    window.location.href = page;
  }
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    suggestionsContainer.classList.remove('active');
  }
});

// Featured lectures data
const featuredLectures = [
  {
    title: 'Cardiovascular System Overview',
    platform: 'Marrow',
    duration: '45 mins'
  },
  {
    title: 'Neuroanatomy Basics',
    platform: 'PrepLadder',
    duration: '60 mins'
  },
  {
    title: 'Respiratory Physiology',
    platform: 'DAMS',
    duration: '55 mins'
  }
];

// Populate featured lectures
function displayFeaturedLectures() {
  const container = document.getElementById('featuredLectures');
  
  featuredLectures.forEach(lecture => {
    const lectureElement = document.createElement('div');
    lectureElement.className = 'platform-btn';
    lectureElement.innerHTML = `
      <h3>${lecture.title}</h3>
      <p>${lecture.platform} • ${lecture.duration}</p>
    `;
    container.appendChild(lectureElement);
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  displayFeaturedLectures();
});