// Obsługa akordeonu
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.style.display === 'block';
        content.style.display = isOpen ? 'none' : 'block';
        header.classList.toggle('active', !isOpen);
    });
});

// Płynne przewijanie z offsetem dla nawigacji i przycisku "Skontaktuj się"
document.querySelectorAll('nav a, .scroll-to-contact').forEach(anchor => {
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
                const targetPosition = target.offsetTop - headerHeight - 20;
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

// Sprawdź, czy użytkownik już zaakceptował ciasteczka
if (localStorage.getItem('cookiesAccepted')) {
    cookieBanner.style.display = 'none';
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.style.display = 'none';
});
