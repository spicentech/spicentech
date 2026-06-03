	//Clock : 
function updateClock() {
        const now = new Date();
        const options = { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        };
        document.getElementById('live-clock').innerText = now.toLocaleString('en-IN', options);
    }
    setInterval(updateClock, 1000);
    updateClock(); // Initial call
	
	
	//Cookies bar :
	function acceptCookies() {
    const banner = document.getElementById('cookie-banner');
    
    // Add the "going" animation class
    banner.classList.add('cookie-hide');

    // Wait for the animation to finish (500ms) before saving to storage
    setTimeout(() => {
        localStorage.setItem('spicen_cookies_accepted', 'true');
        banner.style.display = 'none';
    }, 500);
}

window.onload = function() {
    if (!localStorage.getItem('spicen_cookies_accepted')) {
        const banner = document.getElementById('cookie-banner');
        banner.classList.add('cookie-show');
    }
    // Ensure your clock still runs
    if (typeof updateClock === "function") {
        updateClock();
        setInterval(updateClock, 1000);
    }
};


	//Contact form :
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const status = document.getElementById('formStatus');
    const btn = e.target.querySelector('button');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwAAuStJ0preto2wY0UzULuHL_hDoZ6L9h09__GaRcxKUUZKqGe2ZrTvFc9jb6ZyKk/exec'; // Replace with your Google Apps Script URL

    // 1. Engineering Visual Feedback: Loading State
    btn.disabled = true;
    btn.innerText = 'TRANSMITTING...';
    status.style.display = 'block';
    status.style.color = 'var(--accent)';
    status.innerText = 'Establishing connection with Spicen Tech...';

    // 2. Data Preparation
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    // 3. Execution: Send to Google Sheet
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Apps Script cross-origin
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => {
        // 4. Success State
        status.innerText = 'Inquiry Received. We will reach out shortly.';
        status.style.color = '#4CAF50'; // Green for success
        this.reset();
        btn.innerText = 'MESSAGE SENT';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = 'SEND MESSAGE';
        }, 3000);
    })
    .catch(error => {
        // 5. Error Handling
        console.error('Error!', error.message);
        status.innerText = 'Connection failed. Please email us directly.';
        status.style.color = '#ff4d4d'; // Red for error
        btn.disabled = false;
        btn.innerText = 'RETRY SEND';
    });
});

	//Chat-Bot : 
// Get all necessary elements
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// 1. Toggle Chat Window
chatBtn.onclick = function() {
    if (chatBox.style.display === 'none' || chatBox.style.display === '') {
        chatBox.style.display = 'block';
    } else {
        chatBox.style.display = 'none';
    }
};

// 2. Logic for Bot Responses
function getBotResponse(input) {
    const userText = input.toLowerCase();
    
    if (userText.includes("hello") || userText.includes("hi")) {
        return "Hello! I am the Spicen Tech Assistant. How can I help you today?";
    }
    if (userText.includes("director") || userText.includes("nehal")  || userText.includes("CEO")  || userText.includes("ceo")) {
        return "Our CEO, Nehal Agarwal, achieved a prestigious AIR 291 in JEE Mains 2026. We apply that same elite engineering mindset to every project. To know more about him visit 'Our Legacy' page....";
    }
	if (userText.includes("founder") || userText.includes("navneet")  || userText.includes("legal director")) {
        return "Our founder, Navneet Garg, has great experience in management and leadership accounts alongside having a legal background!! To know more about him visit 'Our Legacy' page....";
    }
    if (userText.includes("service") || userText.includes("work")) {
        return "We specialize in Fintech solutions, Web Development, and Legal-Tech applications inspired by our legacy at Ajivika Finance LTD.  To know more, visit 'Portfolio' page....";
    }
    if (userText.includes("location") || userText.includes("ghaziabad") || userText.includes("office")) {
        return "We are based in Ghaziabad, UP, serving clients locally in Indirapuram and Raj Nagar, as well as globally all over India.....";
    }
    if (userText.includes("contact") || userText.includes("hire")) {
        return "You can reach us via the contact form on this page or the contact details given at the bottom of the website!  All inquiries are saved directly to our official database.";
    }
	if (userText.includes("about") || userText.includes("management") || userText.includes("staff")) {
        return "You can know about us in detail on clicking the 'Our Legacy' tab. Kindly check that out...";
    }
    
    return "That's a great question! For a detailed technical answer, please use our contact form to speak directly with our Director - Nehal Agarwal.";
}

// 3. Function to Append Messages
function appendMessage(sender, text) {
    const msgWrapper = document.createElement('div');
    msgWrapper.style.margin = "10px 0";
    msgWrapper.style.textAlign = sender === 'user' ? 'right' : 'left';

    const msgBubble = document.createElement('span');
    msgBubble.style.padding = "8px 12px";
    msgBubble.style.borderRadius = "15px";
    msgBubble.style.display = "inline-block";
    msgBubble.style.maxWidth = "80%";
    msgBubble.style.fontSize = "0.85rem";
    
    if (sender === 'user') {
        msgBubble.style.background = "var(--accent)";
        msgBubble.style.color = "var(--primary)";
    } else {
        msgBubble.style.background = "#e9e9e9";
        msgBubble.style.color = "#333";
    }

    msgBubble.innerText = text;
    msgWrapper.appendChild(msgBubble);
    chatMessages.appendChild(msgWrapper);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 4. Send Action
function handleSend() {
    const message = chatInput.value.trim();
    if (message !== "") {
        appendMessage('user', message);
        chatInput.value = "";
        
        // Show "typing" delay for realism
        setTimeout(() => {
            const response = getBotResponse(message);
            appendMessage('bot', response);
        }, 800);
    }
}

	//Telemeter : 
// Event Listeners
sendBtn.onclick = handleSend;
chatInput.onkeypress = function(e) {
    if (e.key === 'Enter') handleSend();
};

window.addEventListener('load', () => {
    // Get precision timing data
    const [entry] = performance.getEntriesByType("navigation");
    const loadTime = entry ? (entry.duration / 1000).toFixed(2) : (performance.now() / 1000).toFixed(2);
    
    const speedText = document.getElementById('speed-value');
    const speedBar = document.getElementById('speed-bar');
    const statusText = document.getElementById('performance-status');

    // Smooth update to match Spicen Tech branding
    setTimeout(() => {
        speedText.innerText = loadTime + "s";
        speedBar.style.width = "100%";
        statusText.style.color = "var(--accent)";
        statusText.innerText = "● SYSTEM OPTIMIZED | CALCULATION COMPLETE";
    }, 800);
});

	
	//Voice Command functioning : 
// --- Updated VUI Logic for Spicen Tech ---
const vuiBtn = document.getElementById('vui-btn');
const vuiIcon = document.getElementById('vui-icon');
const vuiStatus = document.getElementById('vui-status');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false; // Only final results to avoid errors
    recognition.lang = 'en-IN'; // Set to Indian English for local Ghaziabad/Delhi accents

    vuiBtn.onclick = () => {
        try {
            recognition.start();
            vuiStatus.style.display = 'block';
            vuiStatus.innerText = "Listening for: 'Home', 'About', 'Services'...";
            vuiIcon.className = "fas fa-circle-notch fa-spin"; // Shows it is working
        } catch (e) {
            console.log("Recognition already started");
        }
    };

    recognition.onresult = (event) => {
    // Get the recognized text and clean it up
    const command = event.results[0][0].transcript.toLowerCase().trim();
    vuiStatus.innerText = `Interpreted: "${command}"`;

    // 1. Home / Index Command
    if (/\b(home|index|main|start)\b/.test(command)) {
        window.location.href = 'index.html';
    } 
    // 2. About Command
    else if (/\b(about|who|father|nehal|legacy|founder)\b/.test(command)) {
        window.location.href = 'about.html';
    } 
    // 3. Solutions Command
    else if (/\b(solution|solve|professional|retail|startup|mvp)\b/.test(command)) {
        window.location.href = 'solutions.html';
    } 
	// 4. Portfolio Command
    else if (/\b(portfolio|achievments|tasks)\b/.test(command)) {
        window.location.href = 'portfolio.html';
    } 
    // 5. Chat / Help Command
    else if (/\b(chat|help|support|bot|assistant)\b/.test(command)) {
        const chatBox = document.getElementById('chat-box');
        if (chatBox) {
            chatBox.style.display = 'block';
            // Optional: have the bot say hello when opened via voice
            appendMessage('bot', "Voice command recognized. How can Spicen Tech help you?");
        }
    }

    stopVUI();
};

    // Reset UI when listening stops
    recognition.onspeechend = () => { 
        recognition.stop();
        resetVUI();
    };

    recognition.onerror = (event) => {
        console.error("VUI Error: ", event.error);
        vuiStatus.innerText = "Error: " + event.error;
        resetVUI();
    };

    function resetVUI() {
        setTimeout(() => {
            vuiStatus.style.display = 'none';
            vuiIcon.className = "fas fa-microphone";
        }, 2500);
    }
}

