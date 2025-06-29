document.addEventListener('DOMContentLoaded', function() {
    // Animación de scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Efecto parallax para las secciones hero
    const heroSection = document.querySelector('.about-us-hero');
    const futureSection = document.querySelector('.our-future');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    if (futureSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const futureOffset = futureSection.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition > futureOffset - windowHeight) {
                futureSection.style.backgroundPositionY = (scrollPosition - futureOffset) * 0.3 + 'px';
            }
        });
    }

    // Animación de aparición de elementos al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.philosophy-item, .category-card, .member-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Establecer estado inicial para la animación
    document.querySelectorAll('.philosophy-item, .category-card, .member-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar al cargar y al hacer scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Efecto hover para las tarjetas de equipo
    const teamCards = document.querySelectorAll('.member-card');
    teamCards.forEach(card => {
        const img = card.querySelector('img');
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
            img.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
});
