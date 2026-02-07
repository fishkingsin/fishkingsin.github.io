document.addEventListener('DOMContentLoaded', () => {

    // --- Floating Contact Overlay Toggle ---
    const floatingContactButton = document.getElementById('floating-contact-button');
    const floatingContactOverlay = document.getElementById('floating-contact-overlay');
    const closeContactButton = floatingContactOverlay ? floatingContactOverlay.querySelector('.close-button') : null;

    if (floatingContactButton && floatingContactOverlay) {
        floatingContactButton.addEventListener('click', () => {
            floatingContactOverlay.style.display = 'flex'; // Show the overlay
        });
    }

    if (closeContactButton) {
        closeContactButton.addEventListener('click', () => {
            floatingContactOverlay.style.display = 'none'; // Hide the overlay
        });
    }

    // Optional: Close overlay if clicking outside the content
    if (floatingContactOverlay) {
        floatingContactOverlay.addEventListener('click', (event) => {
            // Check if the click target is the overlay itself (the dark background)
            if (event.target === floatingContactOverlay) {
                floatingContactOverlay.style.display = 'none';
            }
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to the target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Scrolls to the top of the element
                });
            }
        });
    });

    // --- Form Submission Handling (Basic Example) ---
    // This is a client-side example. For actual form submission,
    // you'd typically need a backend service or a service like Formspree.

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // In a real scenario, you would collect form data and send it
            // via AJAX (fetch API) to a backend or a service like Formspree.
            alert('Message sent! (This is a placeholder. Implement actual form submission.)');

            // Optionally clear the form after submission
            contactForm.reset();
            // You might also want to close the floating overlay if this form is used there
            if (floatingContactOverlay) {
                floatingContactOverlay.style.display = 'none';
            }
        });
    }
    
    // Handle form submission for the floating overlay as well
    const floatingContactForm = document.getElementById('floating-contact-form');
    if (floatingContactForm) {
        floatingContactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Message sent via floating form! (Placeholder. Implement actual submission.)');
            floatingContactForm.reset();
            if (floatingContactOverlay) {
                floatingContactOverlay.style.display = 'none';
            }
        });
    }

});
