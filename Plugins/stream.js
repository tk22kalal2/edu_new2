const API_ENDPOINT = 'https://nextpulse-25b1b64cdf4e.herokuapp.com/api/files';

document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.getElementById('loader');
    const container = document.getElementById('video-container');

    try {
        const response = await fetch(API_ENDPOINT);
        const files = await response.json();
        
        loader.style.display = 'none';
        
        files.forEach(file => {
            const div = document.createElement('div');
            div.className = 'video-item';
            div.innerHTML = file.file_name;
            div.onclick = () => handleVideoClick(file.file_name);
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading videos:', error);
        loader.style.display = 'none';
        container.innerHTML = '<p>Error loading videos. Please try again later.</p>';
    }
});

async function handleVideoClick(fileName) {
    try {
        const response = await fetch(`${API_ENDPOINT}/${encodeURIComponent(fileName)}`);
        const { stream_link } = await response.json();
        
        if(stream_link) {
            window.open(stream_link, '_blank');
        }
    } catch (error) {
        console.error('Error fetching stream link:', error);
        alert('Error generating stream link. Please try again.');
    }
}
