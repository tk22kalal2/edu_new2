document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.lecture-item').forEach(item => {
        item.addEventListener('click', async (e) => {
            const telegramLink = e.currentTarget.dataset.telegramLink;
            const lectureName = e.currentTarget.textContent.trim();
            
            // Show loading state
            e.currentTarget.innerHTML = `${lectureName} <div class="loading"></div>`;
            
            try {
                // Send to backend for processing
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
                
                const { stream_link } = await response.json();
                
                if(stream_link) {
                    window.location.href = stream_link;
                }
            } catch (error) {
                console.error('Error:', error);
                e.currentTarget.innerHTML = `${lectureName} (Failed, try again)`;
            }
        });
    });
});
