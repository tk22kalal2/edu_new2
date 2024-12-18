// Teacher data for search suggestions
const teachers = [
    { name: 'Dr. Govind Rai Garg', subject: 'PHARMACOLOGY', page: 'Plugins/pharmacologycb.html' },
    { name: 'Dr. Deepak Mehrah', subject: 'MEDICINE', page: 'Plugins/medicinep6.html' }
];

function showSuggestions() {
    const input = document.getElementById('teacherSearchInput').value.toLowerCase();
    const suggestionList = document.getElementById('teacherSuggestionList');
    suggestionList.innerHTML = ''; // Clear previous suggestions

    if (input) {
        teachers.forEach(teacher => {
            if (teacher.name.toLowerCase().includes(input)) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>${teacher.name}</strong>
                    <span>${teacher.subject}</span>
                `;
                listItem.onclick = () => {
                    window.location.href = teacher.page;
                };
                suggestionList.appendChild(listItem);
            }
        });
    }
}
