/**
 * Database integration for the portfolio website
 * Handles contact form submissions and chatbot messages
 */

// Initialize contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            formStatus.innerHTML = '<p class="text-gold-400"><i class="fas fa-spinner fa-spin mr-2"></i> Sending message...</p>';
            formStatus.classList.remove('hidden');
            
            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // Success
                    formStatus.innerHTML = '<p class="text-green-500"><i class="fas fa-check-circle mr-2"></i> Message sent successfully!</p>';
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.classList.add('hidden');
                    }, 5000);
                } else {
                    // Error
                    formStatus.innerHTML = `<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i> ${data.error || 'Failed to send message. Please try again.'}</p>`;
                }
            } catch (error) {
                console.error('Error sending message:', error);
                formStatus.innerHTML = '<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i> Failed to send message. Please try again later.</p>';
            }
        });
    }
}

// Initialize chatbot with database integration
function initChatbotWithDB() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    if (!chatbotToggle || !chatbotPanel) return;
    
    // Clear existing messages
    chatbotMessages.innerHTML = '';
    
    // Add initial greeting
    appendAIMessage("Hello! 👋 I'm your AI assistant. How can I help you with Ahsan's portfolio today?");
    
    // Toggle chatbot visibility with animation
    chatbotToggle.addEventListener('click', function() {
        chatbotPanel.classList.toggle('hidden');
        if (!chatbotPanel.classList.contains('hidden')) {
            chatbotInput.focus();
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotPanel.classList.add('hidden');
    });
    
    // Handle send message
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            appendUserMessage(message);
            chatbotInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Save message to database
            fetch('/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            }).catch(error => console.error('Error saving chatbot message:', error));
            
            // Process the message and generate intelligent response
            setTimeout(() => {
                removeTypingIndicator();
                generateAIResponse(message);
            }, 1500);
        }
    }
    
    // Send message on click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Function to append user message
    function appendUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-end mb-4';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'bg-gold-500 text-black rounded-lg p-3 max-w-xs';
        
        const paragraph = document.createElement('p');
        paragraph.className = 'text-sm';
        paragraph.textContent = text;
        
        messageContent.appendChild(paragraph);
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to append AI message
    function appendAIMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start mb-4';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'bg-gray-800 rounded-lg p-3 max-w-xs';
        
        const paragraph = document.createElement('p');
        paragraph.className = 'text-sm';
        paragraph.textContent = text;
        
        messageContent.appendChild(paragraph);
        messageDiv.appendChild(messageContent);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'flex items-start mb-4';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'bg-gray-800 rounded-lg p-3';
        
        const text = document.createElement('div');
        text.className = 'flex items-center';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'text-sm mr-2';
        textSpan.textContent = 'Thinking';
        
        const dots = document.createElement('div');
        dots.className = 'flex space-x-1';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse';
            dot.style.animationDelay = `${i * 0.2}s`;
            dots.appendChild(dot);
        }
        
        text.appendChild(textSpan);
        text.appendChild(dots);
        typingContent.appendChild(text);
        typingDiv.appendChild(typingContent);
        chatbotMessages.appendChild(typingDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Generate intelligent AI response based on user input
    function generateAIResponse(userInput) {
        userInput = userInput.toLowerCase();
        
        // More intelligent response generation with better keyword detection
        if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey')) {
            appendAIMessage("Hello there! How can I assist you with Ahsan's portfolio today?");
        } 
        else if (userInput.includes('skills') || userInput.includes('tech stack') || userInput.includes('technologies') || userInput.includes('can') && userInput.includes('do')) {
            appendAIMessage("Ahsan is skilled in HTML, CSS, JavaScript, Java, MySQL, and various frameworks. He specializes in building responsive web applications and blockchain solutions.");
        } 
        else if (userInput.includes('project') || userInput.includes('work') || userInput.includes('portfolio')) {
            appendAIMessage("Ahsan has worked on several impressive projects including a Blockchain Dapp called Ahsanverse, a News Archive system, and this portfolio website. You can check them out in the Projects section!");
        } 
        else if (userInput.includes('blockchain') || userInput.includes('ahsanverse') || userInput.includes('dapp')) {
            appendAIMessage("Ahsanverse is a decentralized application built on blockchain technology. It features smart contracts and Web3 integration for a seamless user experience. You can visit it at ahsanverse.vercel.app");
        } 
        else if (userInput.includes('contact') || userInput.includes('reach') || userInput.includes('email') || userInput.includes('phone')) {
            appendAIMessage("You can contact Ahsan via email at ahsanimamkhan06@gmail.com or call at +91 9162248786. You can also connect with him on LinkedIn, Instagram, or Facebook. Check the Contact section for direct links!");
        } 
        else if (userInput.includes('education') || userInput.includes('study') || userInput.includes('college') || userInput.includes('university') || userInput.includes('degree')) {
            appendAIMessage("Ahsan is a B.Tech Computer Science student at MIT-WPU. He's passionate about coding and continuously learning new technologies.");
        } 
        else if (userInput.includes('experience') || userInput.includes('work history') || userInput.includes('job')) {
            appendAIMessage("Ahsan has 1.2 years of experience developing various web applications. He focuses on creating elegant, efficient, and user-friendly solutions. Would you like to know more about his specific projects?");
        } 
        else if (userInput.includes('location') || userInput.includes('where') || userInput.includes('live') || userInput.includes('from')) {
            appendAIMessage("Ahsan is based in Maharashtra, India.");
        } 
        else if (userInput.includes('social') || userInput.includes('instagram') || userInput.includes('facebook') || userInput.includes('linkedin') || userInput.includes('github')) {
            appendAIMessage("You can find Ahsan on: Instagram (@khan_ahsan_8055), LinkedIn (ahsan-imam-khan-9a0443328), Facebook, and GitHub (Ahsan6786). The links are available in the Contact section!");
        } 
        else if (userInput.includes('thank') || userInput.includes('thanks') || userInput.includes('appreciated')) {
            appendAIMessage("You're welcome! If you have any other questions about Ahsan's work or skills, feel free to ask.");
        }
        else if (userInput.includes('light mode') || userInput.includes('dark mode') || userInput.includes('theme')) {
            appendAIMessage("You can toggle between dark and light modes by clicking the sun/moon icon in the top right corner of the site. The theme preference will be saved for your next visit.");
        }
        else if (userInput.includes('age') || userInput.includes('old') || userInput.includes('young')) {
            appendAIMessage("Ahsan is a 20-year-old B.Tech Computer Science student with passion for programming and technology.");
        }
        else if (userInput.includes('services') || userInput.includes('offer') || userInput.includes('provide')) {
            appendAIMessage("Ahsan offers web development, responsive design, and database integration services. He specializes in creating modern, efficient, and user-friendly applications.");
        }
        else if (userInput.includes('responsive') || userInput.includes('mobile') || userInput.includes('device')) {
            appendAIMessage("Yes! This portfolio is fully responsive and works great on all devices including mobile phones, tablets, and desktops.");
        }
        else {
            appendAIMessage("I'm not sure I understand that question. Would you like to know about Ahsan's skills, projects, education, or how to contact him?");
        }
    }
}

// Export functions
window.initContactForm = initContactForm;
window.initChatbotWithDB = initChatbotWithDB;
