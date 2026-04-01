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
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
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

// Zamknij banner po 10 sekundach jeśli użytkownik nie kliknie
setTimeout(() => {
    if (!localStorage.getItem('cookiesAccepted') && cookieBanner.style.display !== 'none') {
        cookieBanner.style.opacity = '1';
        cookieBanner.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            cookieBanner.style.opacity = '0';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 1000);
        }, 10000);
    }
}, 1000);