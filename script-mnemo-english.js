// Obsługa akordeonu
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.style.display === 'block';
        
        // Zamknij inne otwarte elementy (opcjonalnie, dla lepszego UX)
        // document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
        // document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

        content.style.display = isOpen ? 'none' : 'block';
        header.classList.toggle('active', !isOpen);
    });
});

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
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
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
    section.classList.add('fade-in'); // Można usunąć z HTML i dodawać dynamicznie
    observer.observe(section);
});