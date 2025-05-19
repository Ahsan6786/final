/**
 * Contact form handler for the portfolio website
 * Sends user messages to the MySQL database
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show loading state
            if (formStatus) {
                formStatus.innerHTML = '<p class="text-gold-400"><i class="fas fa-spinner fa-spin mr-2"></i> Sending message...</p>';
                formStatus.classList.remove('hidden');
            }
            
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
                    if (formStatus) {
                        formStatus.innerHTML = '<p class="text-green-500"><i class="fas fa-check-circle mr-2"></i> Message sent successfully!</p>';
                    }
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.classList.add('hidden');
                        }
                    }, 5000);
                } else {
                    // Error
                    if (formStatus) {
                        formStatus.innerHTML = `<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i> ${data.error || 'Failed to send message. Please try again.'}</p>`;
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
                if (formStatus) {
                    formStatus.innerHTML = '<p class="text-red-500"><i class="fas fa-exclamation-circle mr-2"></i> Failed to send message. Please try again later.</p>';
                }
            }
        });
    }
});
