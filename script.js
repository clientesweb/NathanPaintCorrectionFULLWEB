document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMobileMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Top Banner Rotation
    const banner = document.getElementById('top-banner');
    const bannerContent = banner.querySelector('.banner-content');
    const bannerItems = banner.querySelectorAll('.banner-item');
    let currentBanner = 0;

    function rotateBanner() {
        currentBanner = (currentBanner + 1) % bannerItems.length;
        bannerContent.style.transform = `translateX(-${currentBanner * 100}%)`;
    }

    setInterval(rotateBanner, 5000);

    // Service Modal
    const serviceModal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalPrice = document.getElementById('modalPrice');
    const closeModal = document.getElementById('closeModal');
    const viewServiceButtons = document.querySelectorAll('.view-service');

    const serviceDetails = {
        wash: {
            title: "Premium Wash & Wax",
            description: "Our Premium Wash & Wax service is designed to give your vehicle a showroom-quality finish.",
            features: [
                "Thorough exterior wash",
                "Clay bar treatment",
                "High-quality wax application",
                "Tire and rim cleaning",
                "Interior vacuum and wipe-down"
            ],
            price: "From $49.99"
        },
        interior: {
            title: "Interior Detailing",
            description: "Our Interior Detailing service deep cleans and refreshes your vehicle's interior.",
            features: [
                "Thorough vacuuming",
                "Steam cleaning of upholstery",
                "Leather treatment (if applicable)",
                "Dashboard and console cleaning",
                "Window and mirror cleaning"
            ],
            price: "From $89.99"
        },
        paint: {
            title: "Paint Correction",
            description: "Our Paint Correction service removes imperfections and restores your vehicle's paint to its original glory.",
            features: [
                "Multi-stage polishing process",
                "Swirl and scratch removal",
                "Paint depth measurement",
                "High-gloss finish",
                "Protective sealant application"
            ],
            price: "From $199.99"
        },
        ceramic: {
            title: "Ceramic Coating",
            description: "Our Ceramic Coating service provides long-lasting protection and an unmatched shine for your vehicle.",
            features: [
                "Paint decontamination",
                "Single-stage paint correction",
                "Professional-grade ceramic coating application",
                "Hydrophobic properties",
                "UV protection"
            ],
            price: "From $299.99"
        }
    };

    viewServiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            const details = serviceDetails[service];
            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;
            modalFeatures.innerHTML = details.features.map(feature => `<li>${feature}</li>`).join('');
            modalPrice.textContent = details.price;
            serviceModal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => {
        serviceModal.classList.add('hidden');
    });

    // Gallery Modal
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImages = document.getElementById('galleryModalImages');
    const galleryModalTitle = document.getElementById('galleryModalTitle');
    const galleryModalDescription = document.getElementById('galleryModalDescription');
    const closeGalleryModal = document.getElementById('closeGalleryModal');
    const viewWorkButtons = document.querySelectorAll('.view-work');

    viewWorkButtons.forEach(button => {
        button.addEventListener('click', () => {
            const galleryItem = button.closest('.gallery-item');
            const images = JSON.parse(galleryItem.getAttribute('data-images'));
            const description = galleryItem.getAttribute('data-description');
            const title = galleryItem.querySelector('h3').textContent;

            galleryModalImages.innerHTML = images.map(image => `
                <div class="swiper-slide">
                    <img src="${image}" alt="${title}" class="w-full h-auto">
                </div>
            `).join('');

            galleryModalTitle.textContent = title;
            galleryModalDescription.textContent = description;
            galleryModal.classList.remove('hidden');

            // Initialize Swiper for gallery modal
            new Swiper('.gallery-swiper', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        });
    });

    closeGalleryModal.addEventListener('click', () => {
        galleryModal.classList.add('hidden');
    });

    // Gallery Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Initialize Swiper for About section
    new Swiper('.about-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // Booking Modal
    const bookNowBtn = document.getElementById('bookNowBtn');
    const bookingModal = document.getElementById('bookingModal');
    const closeBookingModal = bookingModal.querySelector('.close');

    bookNowBtn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
    });

    closeBookingModal.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        });
    });

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.display = 'none';
    });
});
