// Płynne przewijanie z offsetem dla nawigacji i przycisków
document.querySelectorAll('nav a, .scroll-to-contact, .scroll-to-section').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('http') || href.startsWith('https') || href === '/') {
            return;
        }
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                let targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // DODATKOWE DOSTROJENIE dla konkretnych sekcji
                if (href === '#for-whom') {
                    targetPosition = targetPosition + 40;
                }
                if (href === '#business') {
                    targetPosition = targetPosition + 100;
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Obsługa ciasteczek
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');

if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
});

// Obsługa Karuzeli Opinii
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-next');
const prevButton = document.querySelector('.carousel-prev');

let currentIndex = 0;

const getSlidesToShow = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
};

const updateCarousel = () => {
    const slidesToShow = getSlidesToShow();
    const maxIndex = slides.length - slidesToShow;
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;
    
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
};

nextButton.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

// Automatyczne przewijanie
let autoPlay = setInterval(() => {
    currentIndex++;
    updateCarousel();
}, 3000);

// Zatrzymaj autoPlay po najechaniu myszką
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 3000);
    });
}

window.addEventListener('resize', updateCarousel);

// Animacja fade-in przy przewijaniu (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});