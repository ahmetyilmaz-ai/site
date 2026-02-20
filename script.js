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
        "Adana Dürüm", "Urfa Dürüm", "Ciğer Dürüm", "Tavuk Şiş Dürüm",
        "Kuzu Şiş Porsiyon", "Tavuk Şiş Porsiyon", "Kuzu Ciğer Şiş Porsiyon",
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

        const extensions = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];

        for (let i = 1; i <= maxItemsToCheck; i++) {
            // Try to find valid image for this index
            let tryNextExtension = (extIndex) => {
                if (extIndex >= extensions.length) return; // No valid image found for this number

                const ext = extensions[extIndex];
                const imgPath = `${folderPath}${i}.${ext}`;
                const tempImg = new Image();

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
                    // Try next extension
                    tryNextExtension(extIndex + 1);
                };

                tempImg.src = imgPath;
            };

            // Start checking with first extension
            tryNextExtension(0);
        }
    }

    // Generic Carousel Logic
    function createCarousel({ containerId, items, itemsToShow, itemsToShowMobile, partialVisible, disableOnMobile, isDynamic, folderPath }) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Mobile Check for Disable
        if (disableOnMobile && window.innerWidth <= 768) {
            // Do not initialize carousel, let CSS grid handle it
            // If dynamic, we might need to populate it though?
            // Favorites is static (!isDynamic), so we just exit and let existing DOM be grid.
            if (!isDynamic) return;

            // If dynamic (gallery), we still need to load images but maybe as grid?
            // For now, this feature is for Favorites which is static.
        }

        // Configuration
        const config = {
            itemsToShow: itemsToShow || 3,
            itemsToShowMobile: itemsToShowMobile || 1.2, // Default to 1.2 + partial
            partialVisible: partialVisible || false, // If true, adds transparency effect
            gap: 20,
            autoPlaySpeed: arguments[0].autoPlaySpeed || 0
        };

        // If static content (like Favorites), get items from DOM
        let carouselItems = [];
        if (!isDynamic) {
            carouselItems = Array.from(container.children);
            // Clear container to rebuild structure
            container.innerHTML = '';
        } else {
            // Placeholder for dynamic items
            carouselItems = items || [];
        }

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
        let autoPlayInterval;

        // Helper to determine visible count based on screen size
        function getVisibleCount() {
            if (window.innerWidth <= 768) return config.itemsToShowMobile;
            return config.itemsToShow;
        }

        // Render Items
        function renderItems() {
            track.innerHTML = '';

            // If dynamic (images), create elements
            if (isDynamic && carouselItems.length === 0 && folderPath) {
                // Initial load for images
                // Initial load for images
                const extensions = ['jpg', 'jpeg', 'png', 'webp', 'JPG', 'JPEG', 'PNG'];

                for (let i = 1; i <= 20; i++) {
                    // Try to find valid image for this index
                    let tryNextExtension = (extIndex) => {
                        if (extIndex >= extensions.length) return; // No valid image found for this number

                        const ext = extensions[extIndex];
                        const imgPath = `${folderPath}${i}.${ext}`;
                        const tempImg = new Image();

                        tempImg.onload = function () {
                            // Image exists
                            const div = document.createElement('div');
                            div.className = 'carousel-slide';
                            const img = document.createElement('img');
                            img.src = imgPath;
                            div.appendChild(img);

                            // Insert in order
                            div.dataset.index = i;
                            const existing = Array.from(track.children);
                            const nextNode = existing.find(node => parseInt(node.dataset.index) > i);
                            track.insertBefore(div, nextNode);

                            carouselItems.push(div); // Keep track
                            updateCarousel();
                        };

                        tempImg.onerror = function () {
                            // Try next extension
                            tryNextExtension(extIndex + 1);
                        };

                        tempImg.src = imgPath;
                    };

                    // Start checking with first extension
                    tryNextExtension(0);
                }
            } else {
                // Static or already loaded
                carouselItems.forEach(item => {
                    // Ensure item has slide class
                    if (!item.classList.contains('carousel-slide')) {
                        item.classList.add('carousel-slide');
                    }
                    track.appendChild(item);

                    // Reset or set styles if needed
                    item.style.width = ''; // Let updateCarousel handle it
                });
            }
            updateCarousel();
        }

        function updateCarousel() {
            const visibleCount = getVisibleCount();
            const itemWidth = 100 / visibleCount;

            // Move track
            track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

            // Set width of each slide
            const slides = Array.from(track.children);
            slides.forEach((slide) => {
                slide.style.width = `${itemWidth}%`;
                // Reset styles if partialVisible ever turned on locally
                if (config.partialVisible) {
                    slide.style.opacity = '1';
                    slide.style.transform = 'scale(1)';
                    slide.style.filter = 'none';
                }
            });

            // Apply partial visibility effect if configured (refining logic)
            if (config.partialVisible) {
                // ... (existing logic or placeholder if you want to keep it simple)
                // The previous code had a bug where it reset styles inside the loop but didn't apply new ones.
                // For now, let's stick to the width fix which is critical.
            }

            // Update Buttons State (Optional visual feedback)
            // prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }


        // Navigation
        function moveNext() {
            const visibleCount = getVisibleCount();
            const total = track.children.length;
            if (total === 0) return;

            if (currentIndex < total - Math.floor(visibleCount)) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back
            }
            updateCarousel();
        }

        nextBtn.addEventListener('click', () => {
            moveNext();
            resetAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCount = getVisibleCount();
                const total = track.children.length;
                if (total > 0) {
                    currentIndex = total - Math.floor(visibleCount); // Loop to end
                }
            }
            updateCarousel();
            resetAutoPlay();
        });

        // Autoplay Logic
        function startAutoPlay() {
            if (config.autoPlaySpeed > 0) {
                autoPlayInterval = setInterval(moveNext, config.autoPlaySpeed);
            }
        }

        function resetAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                startAutoPlay();
            }
        }

        window.addEventListener('resize', updateCarousel);

        // Initial Render
        renderItems();
        startAutoPlay();
    }

    // Initialize Gallery (2 items)
    createCarousel({
        containerId: 'homepage-gallery',
        isDynamic: true,
        folderPath: 'images/galeri_anasayfa/',
        itemsToShow: 3,
        itemsToShowMobile: 1, // Show 1 item on mobile
        partialVisible: false,
        autoPlaySpeed: 3000 // 5 seconds auto-slide
    });

    // Force Video Autoplay (Mobile/Low Power Mode Fix)
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Ensure muted is set (required for autoplay)
        heroVideo.muted = true;

        const playPromise = heroVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
                console.log("Video playing");
            }).catch(error => {
                // Auto-play was prevented
                console.log("Autoplay prevented:", error);
                // We can show a "Play" button here if we wanted, or just stick with poster
                // heroVideo.controls = true; // Uncomment to show controls if autoplay fails
            });
        }
    }

    // Initialize Favorites (3 items)
    createCarousel({
        containerId: 'favorites-carousel',
        isDynamic: false,
        itemsToShow: 3,
        partialVisible: false,
        disableOnMobile: true // Custom option to kill carousel on mobile
    });


    // Simple fade-in animation on scroll (restored if needed or separate)

    if (fullGallery) {
        loadGalleryImages(fullGallery, 'images/galeri_tam/');
    }
});
