// Main JavaScript file for the portfolio website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initThemeToggle();
    initChatbot();
    initMobileMenu();
    initAnimations();
    initScrollReveal();
    initSmoothScroll();
    initTypingEffect();
    initParallaxEffect();
    initTestimonialsCarousel();
    initSkillProgressAnimation();
    initCounterAnimation();
});

/**
 * Initializes the dark/light theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Always default to dark mode initially
    applyDarkMode();
    
    // Add event listener for the theme toggle button
    themeToggle.addEventListener('click', function() {
        // Toggle theme
        if (document.body.classList.contains('light-mode')) {
            // Switch to dark mode
            applyDarkMode();
        } else {
            // Switch to light mode
            applyLightMode();
        }
    });
    
    // Function to apply light mode styling
    function applyLightMode() {
        document.body.classList.add('light-mode');
        document.body.classList.remove('bg-black');
        document.body.classList.add('bg-gray-50');
        document.body.classList.remove('text-white');
        document.body.classList.add('text-gray-900');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        
        // Fix button styling in light mode
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.style.color = 'black';
            btn.style.fontWeight = '700';
        });
    }
    
    // Function to apply dark mode styling
    function applyDarkMode() {
        document.body.classList.remove('light-mode');
        document.body.classList.remove('bg-gray-50');
        document.body.classList.add('bg-black');
        document.body.classList.remove('text-gray-900');
        document.body.classList.add('text-white');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        
        // Reset button styling in dark mode
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.style.color = '';
            btn.style.fontWeight = '';
        });
    }
}

/**
 * Initializes the enhanced AI chatbot functionality
 */
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotPanel = document.getElementById('chatbot-panel');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
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
        messageDiv.className = 'user-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Function to append AI message
    function appendAIMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'ai-message';
        
        const text = document.createElement('span');
        text.textContent = 'Thinking';
        
        const dots = document.createElement('div');
        dots.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dots.appendChild(dot);
        }
        
        typingDiv.appendChild(text);
        typingDiv.appendChild(dots);
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
            appendAIMessage("Ahsan has experience developing various web applications and blockchain solutions. He focuses on creating elegant, efficient, and user-friendly applications. Would you like to know more about his specific projects?");
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

/**
 * Initializes mobile menu functionality
 */
function initMobileMenu() {
    // Create mobile menu elements
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden fixed top-4 right-16 z-50 bg-black p-3 rounded-full border border-gold-500/30 shadow-lg';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars text-gold-400 text-xl"></i>';
    mobileMenuButton.setAttribute('aria-label', 'Toggle mobile menu');
    document.body.appendChild(mobileMenuButton);
    
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-6 transform translate-x-full transition-transform duration-300 ease-in-out md:hidden';
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Get navigation links and add them to mobile menu
    const navLinks = document.querySelectorAll('nav .hidden.md\\:flex a');
    navLinks.forEach(link => {
        const newLink = link.cloneNode(true);
        newLink.className = 'text-xl font-bold text-white hover:text-gold-400 transition duration-300 py-3 px-6 rounded-lg hover:bg-black/30 w-4/5 text-center';
        mobileMenu.appendChild(newLink);
    });
    
    // Add brand/logo to mobile menu
    const brandLogo = document.createElement('div');
    brandLogo.className = 'text-3xl font-bold gradient-text mb-6 mt-4';
    brandLogo.innerHTML = '&lt;Ahsan/&gt;';
    mobileMenu.insertBefore(brandLogo, mobileMenu.firstChild);
    
    // Add social links to mobile menu
    const socialContainer = document.createElement('div');
    socialContainer.className = 'flex space-x-4 mt-6';
    
    const socialLinks = [
        { icon: 'github', url: 'https://github.com/Ahsan6786' },
        { icon: 'linkedin-in', url: 'https://www.linkedin.com/in/ahsan-imam-khan-9a0443328' },
        { icon: 'instagram', url: 'https://www.instagram.com/khan_ahsan_8055' },
        { icon: 'envelope', url: 'mailto:ahsanimamkhan06@gmail.com' }
    ];
    
    socialLinks.forEach(link => {
        const socialLink = document.createElement('a');
        socialLink.href = link.url;
        socialLink.target = '_blank';
        socialLink.className = 'w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-black transition duration-300';
        socialLink.innerHTML = `<i class="fab fa-${link.icon}"></i>`;
        if (link.icon === 'envelope') {
            socialLink.innerHTML = `<i class="far fa-envelope"></i>`;
        }
        socialContainer.appendChild(socialLink);
    });
    
    mobileMenu.appendChild(socialContainer);
    
    // Add a close button within the menu
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-6 right-6 text-white hover:text-gold-400 transition duration-300 p-3';
    closeButton.innerHTML = '<i class="fas fa-times text-2xl"></i>';
    closeButton.setAttribute('aria-label', 'Close mobile menu');
    mobileMenu.appendChild(closeButton);

    // Add overlay backdrop
    const menuBackdrop = document.createElement('div');
    menuBackdrop.className = 'absolute inset-0 bg-black opacity-80 -z-10';
    mobileMenu.appendChild(menuBackdrop);
    
    document.body.appendChild(mobileMenu);

    // Add swipe gesture support
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileMenu.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    mobileMenu.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        // Detect right to left swipe to close menu
        if (touchEndX < touchStartX - 50) {
            closeMenu();
        }
    }
    
    // Toggle menu visibility
    mobileMenuButton.addEventListener('click', function() {
        if (mobileMenu.classList.contains('translate-x-full')) {
            openMenu();
        } else {
            closeMenu();
        }
    });
    
    // Open menu function
    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuButton.innerHTML = '<i class="fas fa-times text-gold-400 text-xl"></i>';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        
        // Add animation to menu items
        const menuItems = mobileMenu.querySelectorAll('a, .gradient-text');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.transitionDelay = `${index * 0.1}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        });
    }
    
    // Close menu on close button click
    closeButton.addEventListener('click', closeMenu);
    
    // Close menu when clicking a navigation link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Function to close the menu
    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-gold-400 text-xl"></i>';
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Close menu on window resize (if desktop size reached)
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) { // md breakpoint
            closeMenu();
        }
    });

    // Add active state to current section in mobile menu
    window.addEventListener('scroll', function() {
        // Only update if mobile menu is visible
        if (!mobileMenu.classList.contains('translate-x-full')) {
            const scrollPosition = window.scrollY;
            const sections = document.querySelectorAll('section[id]');
            const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    mobileLinks.forEach(link => {
                        link.classList.remove('bg-black/30', 'text-gold-400');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('bg-black/30', 'text-gold-400');
                        }
                    });
                }
            });
        }
    });
}

/**
 * Initializes scroll-based animations
 */
function initAnimations() {
    // Add animations that trigger on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .service-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('animate-fade-in');
            }
        });
    };
    
    // Run once on initial load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
}

/**
 * Initializes scroll reveal animations for sections
 */
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.classList.add('transition-opacity', 'duration-1000', 'opacity-0');
        observer.observe(section);
    });
    
    // Add the CSS for revealed sections
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Handles the form submission
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

/**
 * Creates a typing animation effect for text elements
 */
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.glow-text');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
            }
        }, 100);
    }
});

/**
 * Adds particles background effect
 */
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'hidden';
        particlesContainer.style.zIndex = '0';
        
        // Add particles to the container
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('span');
            const size = Math.random() * 6 + 1;
            
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = 'rgba(212, 175, 55, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random animation duration between 10-20 seconds
            const animationDuration = Math.random() * 10 + 10;
            
            // Apply floating animation
            particle.style.animation = `float ${animationDuration}s linear infinite`;
            particle.style.opacity = Math.random() * 0.5;
            
            particlesContainer.appendChild(particle);
        }
        
        // Insert particles container at the beginning of hero section
        heroSection.insertBefore(particlesContainer, heroSection.firstChild);
    }
});

/**
 * Adds interactive cursor effect
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'var(--gold-primary)';
    cursor.style.pointerEvents = 'none';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'transform 0.1s ease, width 0.2s ease, height 0.2s ease, background-color 0.2s ease';
    
    const cursorBorder = document.createElement('div');
    cursorBorder.className = 'custom-cursor-border';
    cursorBorder.style.position = 'fixed';
    cursorBorder.style.width = '30px';
    cursorBorder.style.height = '30px';
    cursorBorder.style.borderRadius = '50%';
    cursorBorder.style.border = '1px solid rgba(212, 175, 55, 0.5)';
    cursorBorder.style.pointerEvents = 'none';
    cursorBorder.style.transform = 'translate(-50%, -50%)';
    cursorBorder.style.zIndex = '9998';
    cursorBorder.style.transition = 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorBorder);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        
        // Add lag effect to the border
        setTimeout(() => {
            cursorBorder.style.top = `${e.clientY}px`;
            cursorBorder.style.left = `${e.clientX}px`;
        }, 50);
    });
    
    // Change cursor style on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .social-icon');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.8)';
            cursorBorder.style.width = '40px';
            cursorBorder.style.height = '40px';
            cursorBorder.style.borderColor = 'rgba(212, 175, 55, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--gold-primary)';
            cursorBorder.style.width = '30px';
            cursorBorder.style.height = '30px';
            cursorBorder.style.borderColor = 'rgba(212, 175, 55, 0.5)';
        });
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Hide custom cursor when mouse leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorBorder.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
        cursorBorder.style.opacity = '1';
    });
});

/**
 * Initializes enhanced smooth scrolling for navigation links
 */
function initSmoothScroll() {
    // Select all links with hash (#) in href
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate header height for offset
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight - 20; // 20px extra padding
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash without causing a jump
                    history.pushState(null, null, targetId);
                    
                    // Close mobile menu if it's open
                    const mobileMenu = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-95.z-40');
                    if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                        const mobileMenuButton = document.querySelector('.md\\:hidden.fixed.top-4.right-16.z-50');
                        if (mobileMenuButton) {
                            mobileMenuButton.click();
                        }
                    }
                }
            }
        });
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // 100px offset for better UX
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-gold-400');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('text-gold-400');
                }
            }
        });
    });
}

/**
 * Initializes a dynamic typing effect for the hero section
 */
function initTypingEffect() {
    // Get the element to add the typing effect to
    const roleElement = document.querySelector('.role-text');
    if (!roleElement) return;
    
    // Array of roles/skills to display
    const roles = [
        'Software Developer',
        'Web Developer',
        'Frontend Developer',
        'Backend Developer',
        'Full Stack Developer',
        'Blockchain Developer'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    // Function to type text
    function typeText() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting text
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing text
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If finished typing the current role
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1500; // Wait before starting to delete
        } 
        // If finished deleting
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // Move to next role
            typingSpeed = 500; // Pause before typing next role
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start the typing effect
    typeText();
}

/**
 * Initializes parallax scrolling effect for background elements
 */
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.2;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Initializes the testimonials carousel
 */
function initTestimonialsCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.add('hidden'));
        
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active', 'bg-gold-500'));
        dots.forEach(dot => dot.classList.add('bg-gray-600'));
        
        // Show the current slide
        slides[index].classList.remove('hidden');
        
        // Add active class to current dot
        dots[index].classList.add('active', 'bg-gold-500');
        dots[index].classList.remove('bg-gray-600');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to show next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        showSlide(newIndex);
    }
    
    // Function to show previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newIndex);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // Add click event to next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            startSlideInterval();
        });
    }
    
    // Add click event to previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            startSlideInterval();
        });
    }
    
    // Function to start auto slide interval
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Show the first slide and start auto sliding
    showSlide(0);
    startSlideInterval();
}

/**
 * Initializes the skill progress animation when in viewport
 */
function initSkillProgressAnimation() {
    const progressBars = document.querySelectorAll('.skill-progress .bg-gradient-to-r');
    
    if (!progressBars.length) return;
    
    // Set initial width to 0 for animation
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.dataset.width = targetWidth;
        
        // Ensure visibility
        bar.style.opacity = '1';
        
        // Make sure elements have position relative
        if (bar.parentElement) {
            bar.parentElement.style.position = 'relative';
        }
    });
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the progress bar
                const bar = entry.target;
                const targetWidth = bar.dataset.width;
                
                // Pre-animation setup
                bar.style.transition = 'none';
                bar.style.width = '0%';
                
                // Force reflow to ensure the transition works
                void bar.offsetWidth;
                
                // Animate width from 0 to target over 1.5 seconds
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
                    bar.style.width = targetWidth;
                    
                    // Add a subtle flash effect when the animation completes
                    setTimeout(() => {
                        const flash = document.createElement('div');
                        flash.style.position = 'absolute';
                        flash.style.top = '0';
                        flash.style.left = '0';
                        flash.style.width = '100%';
                        flash.style.height = '100%';
                        flash.style.background = 'rgba(255, 255, 255, 0.3)';
                        flash.style.opacity = '0';
                        flash.style.transition = 'opacity 0.5s ease';
                        
                        bar.parentElement.appendChild(flash);
                        
                        // Show and then hide the flash
                        setTimeout(() => {
                            flash.style.opacity = '0.5';
                            setTimeout(() => {
                                flash.style.opacity = '0';
                                setTimeout(() => {
                                    if (flash.parentElement) {
                                        flash.parentElement.removeChild(flash);
                                    }
                                }, 500);
                            }, 200);
                        }, 100);
                    }, 1500);
                }, 200);
                
                // Stop observing once animation is done
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each progress bar
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

/**
 * Initializes number counter animation for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter-value');
    
    if (!counters.length) return;
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.target);
                const duration = 2500; // ms
                const stepTime = 20; // ms
                const totalSteps = duration / stepTime;
                const stepValue = target / totalSteps;
                let current = 0;
                let isDecimal = target % 1 !== 0;
                
                const updateCounter = () => {
                    current += stepValue;
                    if (current < target) {
                        if (isDecimal) {
                            counter.textContent = Math.min(current, target).toFixed(1);
                        } else {
                            counter.textContent = Math.round(current);
                        }
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.textContent = isDecimal ? target.toFixed(1) : target;
                        
                        // Add a small bounce effect after counting finishes
                        counter.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            counter.style.transform = 'scale(1)';
                        }, 200);
                    }
                };
                
                // Add visual effects to the counter parent
                const counterParent = counter.parentElement;
                counterParent.style.position = 'relative';
                counterParent.style.overflow = 'hidden';
                
                // Add glow effect when counter starts
                const glowEffect = document.createElement('div');
                glowEffect.style.position = 'absolute';
                glowEffect.style.inset = '0';
                glowEffect.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(0, 0, 0, 0) 70%)';
                glowEffect.style.opacity = '0';
                glowEffect.style.transition = 'opacity 0.5s ease';
                counterParent.appendChild(glowEffect);
                
                setTimeout(() => {
                    glowEffect.style.opacity = '1';
                    
                    // Fade out the glow effect after counting
                    setTimeout(() => {
                        glowEffect.style.opacity = '0';
                    }, duration);
                }, 100);
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each counter
    counters.forEach(counter => {
        observer.observe(counter);
    });
} 