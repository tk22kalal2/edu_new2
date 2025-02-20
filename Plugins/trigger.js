document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.lecture-list');
    
    // Check if container exists
    if (!container) {
        console.error('Lecture container not found!');
        return;
    }

    // Event delegation for dynamic elements
    container.addEventListener('click', async (e) => {
        const item = e.target.closest('.lecture-item');
        
        // Check if clicked element is a lecture item
        if (!item) {
            console.error('Clicked element is not a lecture item!');
            return;
        }

        const telegramLink = item.dataset.telegramLink;
        const lectureName = item.textContent.trim();
        
        // Create loading element
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.innerHTML = '⏳ Generating link...';
        
        try {
            // Clear existing children and show loading
            item.innerHTML = '';
            item.appendChild(loading);
            item.style.pointerEvents = 'none';

            // Send to backend
            const response = await fetch('https://nextpulse-25b1b64cdf4e.herokuapp.com/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    telegram_link: telegramLink,
                    lecture_name: lectureName
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const { stream_link } = await response.json();
            
            if (stream_link && stream_link !== "pending") {
                window.location.href = stream_link;
            } else {
                // Poll for status update
                const poll = setInterval(async () => {
                    const statusResponse = await fetch(`https://nextpulse-25b1b64cdf4e.herokuapp.com/check-status/${encodeURIComponent(lectureName)}`);
                    
                    if (!statusResponse.ok) {
                        throw new Error(`HTTP error! Status: ${statusResponse.status}`);
                    }
                    
                    const { stream_link: updatedLink } = await statusResponse.json();
                    
                    if (updatedLink && updatedLink !== "pending") {
                        clearInterval(poll);
                        window.location.href = updatedLink;
                    }
                }, 3000); // Poll every 3 seconds
            }
        } catch (error) {
            console.error('Error:', error);
            item.innerHTML = `${lectureName} ❌ (Click to retry)`;
            item.style.pointerEvents = 'auto';
        }
    });
});
