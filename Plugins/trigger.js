document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.lecture-list');
    
    if (!container) {
        console.error('Lecture container not found!');
        return;
    }

    container.addEventListener('click', async (e) => {
        const item = e.target.closest('.lecture-item');
        if (!item) return;

        const telegramLink = item.dataset.telegramLink;
        const lectureName = item.textContent.trim();
        
        console.log(`Clicked: ${lectureName} (${telegramLink})`);
        
        // Show loading state
        item.innerHTML = '⏳ Generating link...';
        item.style.pointerEvents = 'none';

        try {
            // Send to backend
            console.log('Sending request to backend...');
            const response = await fetch('https://nextpulse-25b1b64df4e.herokuapp.com/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    telegram_link: telegramLink,
                    lecture_name: lectureName
                })
            });
            
            console.log('Received response:', response);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const { stream_link } = await response.json();
            console.log('Stream link:', stream_link);
            
            if (stream_link && stream_link !== "pending") {
                window.location.href = stream_link;
            } else {
                console.log('Polling for status update...');
                const poll = setInterval(async () => {
                    const statusResponse = await fetch(`https://nextpulse-25b1b64df4e.herokuapp.com/check-status/${encodeURIComponent(lectureName)}`);
                    console.log('Status response:', statusResponse);
                    
                    if (!statusResponse.ok) {
                        throw new Error(`HTTP error! Status: ${statusResponse.status}`);
                    }
                    
                    const { stream_link: updatedLink } = await statusResponse.json();
                    console.log('Updated link:', updatedLink);
                    
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
