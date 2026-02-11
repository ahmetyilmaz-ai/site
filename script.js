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

    // Smart Back Button
    document.querySelectorAll('.back-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if there is a referrer and it matches our domain (simple check)
            // or just ensure we have history to go back to.
            // Using document.referrer is safer to ensure we don't go back to an empty page or different site if opened in new tab
            if (document.referrer.includes(window.location.hostname)) {
                e.preventDefault();
                history.back();
            }
            // If no internal referrer, let the default href="index.html" work
        });
    });
    // Search Autocomplete
    const menuItems = [
        "Adana Dürüm", "Urfa Dürüm", "Ciğer Şiş Dürüm", "Tavuk Şiş Dürüm",
        "Adana Porsiyon", "Tavuk Şiş Porsiyon", "Ciğer Porsiyon",
        "Ayran (Yayık)", "Kola", "Fanta", "Sprite", "Şalgam Suyu", "Su",
        "Haydari", "Acılı Ezme", "Patlıcan Ezme", "Humus"
    ];

    const searchInputs = document.querySelectorAll('.nav-search');

    searchInputs.forEach(input => {
        // Create suggestions container
        const suggestionsBox = document.createElement('div');
        suggestionsBox.className = 'search-suggestions';
        // Append to the parent (.nav-extras) to position correctly
        if (input.parentElement.classList.contains('nav-extras')) {
            input.parentElement.appendChild(suggestionsBox);
        }

        input.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            suggestionsBox.innerHTML = ''; // Clear previous suggestions

            if (query.length > 0) {
                const filteredItems = menuItems.filter(item => item.toLowerCase().includes(query));

                if (filteredItems.length > 0) {
                    filteredItems.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'suggestion-item';
                        div.textContent = item;
                        div.addEventListener('click', () => {
                            // Redirect to menu with specific item search
                            window.location.href = `menu.html?search=${encodeURIComponent(item)}`;
                        });
                        suggestionsBox.appendChild(div);
                    });
                    suggestionsBox.style.display = 'block';
                } else {
                    suggestionsBox.style.display = 'none';
                }
            } else {
                suggestionsBox.style.display = 'none';
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.style.display = 'none';
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = input.value.trim().toLowerCase();
                if (query) {
                    window.location.href = `menu.html?search=${encodeURIComponent(query)}`;
                    suggestionsBox.style.display = 'none';
                }
            }
        });
    });

    // Check for search parameter on page load (specifically for menu.html)
    if (window.location.pathname.includes('menu.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');

        if (searchQuery) {
            const term = searchQuery.toLowerCase();
            const items = document.querySelectorAll('.card, .menu-item');
            let found = false;

            items.forEach(item => {
                const title = item.querySelector('h4, h3')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('p')?.textContent.toLowerCase() || '';

                // Relaxed matching for "Ayran", "Tavuk" etc.
                if (title.includes(term) || desc.includes(term)) {
                    if (!found) {
                        // Scroll to first match
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        found = true;
                    }
                    // Highlight match
                    item.style.border = '2px solid var(--primary)';
                    item.style.boxShadow = '0 0 15px rgba(243, 156, 18, 0.5)';

                    // Remove highlight after a few seconds
                    setTimeout(() => {
                        item.style.border = '';
                        item.style.boxShadow = '';
                    }, 3000);
                }
            });
        }
    }



    // Folder-Based Gallery Logic
    const homepageGallery = document.getElementById('homepage-gallery');
    const fullGallery = document.getElementById('full-gallery');
    const maxItemsToCheck = 20; // Check for 1.jpg up to 20.jpg

    function loadGalleryImages(container, folderPath) {
        if (!container) return;
        container.innerHTML = ''; // Clear existing content

        for (let i = 1; i <= maxItemsToCheck; i++) {
            const imgPath = `${folderPath}${i}.jpg`;

            // Create a temp image to check if file exists
            const tempImg = new Image();
            tempImg.src = imgPath;

            tempImg.onload = function () {
                // Image exists, create DOM element
                const div = document.createElement('div');
                div.className = 'gallery-item';

                const img = document.createElement('img');
                img.src = imgPath;
                img.alt = `Galeri Görseli ${i}`;

                div.appendChild(img);
                container.appendChild(div);
            };

            tempImg.onerror = function () {
                // Image doesn't exist, do nothing
            };
        }
    }

    if (homepageGallery) {
        // loadGalleryImages(homepageGallery, 'images/galeri_anasayfa/');
        setupHomepageCarousel(homepageGallery, 'images/galeri_anasayfa/');
    }

    function setupHomepageCarousel(container, folderPath) {
        container.innerHTML = '';

        // Structure
        const trackContainer = document.createElement('div');
        trackContainer.className = 'carousel-track-container';

        const track = document.createElement('div');
        track.className = 'carousel-track';

        trackContainer.appendChild(track);
        container.appendChild(trackContainer);

        // Arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn prev';
        prevBtn.innerHTML = '&#10094;';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn next';
        nextBtn.innerHTML = '&#10095;';

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        // State
        let currentIndex = 0;
        let images = [];
        const itemsToShow = window.innerWidth <= 768 ? 1 : 2;

        // Load Images
        let loadedCount = 0;
        for (let i = 1; i <= 20; i++) {
            const imgPath = `${folderPath}${i}.jpg`;
            const tempImg = new Image();
            tempImg.src = imgPath;

            tempImg.onload = function () {
                images.push({ src: imgPath, index: i });
                images.sort((a, b) => a.index - b.index); // Ensure order
                renderCarousel();
            };

            tempImg.onerror = function () {
                // Stop checking after a few failures if needed, but simple loop is fine
            };
        }

        function renderCarousel() {
            track.innerHTML = '';
            images.forEach(imgData => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                const img = document.createElement('img');
                img.src = imgData.src;
                slide.alt = `Galeri Görseli ${imgData.index}`;
                slide.appendChild(img);
                track.appendChild(slide);
            });
            updateCarousel();
        }

        function updateCarousel() {
            const width = 100 / (window.innerWidth <= 768 ? 1 : 2);
            track.style.transform = `translateX(-${currentIndex * width}%)`;
        }

        // Arrow Listeners
        nextBtn.addEventListener('click', () => {
            const itemsVisible = window.innerWidth <= 768 ? 1 : 2;
            if (currentIndex < images.length - itemsVisible) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const itemsVisible = window.innerWidth <= 768 ? 1 : 2;
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = images.length - itemsVisible; // Loop to end
            }
            updateCarousel();
        });

        // Resize Listener
        window.addEventListener('resize', () => {
            updateCarousel();
        });
    }

    if (fullGallery) {
        loadGalleryImages(fullGallery, 'images/galeri_tam/');
    }
});
