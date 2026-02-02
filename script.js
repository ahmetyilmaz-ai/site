document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Mobile menu interaction
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if this is a dropdown toggle
            if (link.parentElement.classList.contains('dropdown')) {
                e.preventDefault(); // Prevent default link behavior
                link.parentElement.classList.toggle('active'); // Toggle dropdown visibility
            } else {
                // For regular links, close the menu
                navLinks.classList.remove('active');
                // Also close any open dropdowns when closing menu
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
            }
        });
    });

    // Simple fade-in animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    // Add fade-in classes to elements you want to animate
    // Example usage:
    // document.querySelectorAll('.card').forEach((el) => observer.observe(el));
});
