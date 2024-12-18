
        function isTelegramInAppBrowser() {
            // A heuristic to detect if the site is running in Telegram's in-app browser
            const userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return /Telegram/i.test(userAgent);
        }

        if (isTelegramInAppBrowser()) {
            // Redirect to error.html if opened in Telegram's in-app browser
            window.location.href = "indeXx.html";
        }
    
