// Script para a Landing Page (Design focado no textos.pdf com efeitos extras)

// Função para Slider Visual via Hover (Mouse)
function sliderHover(event, element) {
    const rect = element.getBoundingClientRect();
    let x = event.clientX - rect.left; // Posição do mouse relativa ao container
    
    // Limita o X para não sair do container
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    
    const percentage = (x / rect.width) * 100 + '%';
    
    const imageAfter = element.querySelector('.image-after');
    const sliderVisual = element.querySelector('.slider-line-visual');
    
    if(imageAfter && sliderVisual) {
        imageAfter.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
        imageAfter.style.width = '100%'; /* Garante que a largura nunca diminua */
        sliderVisual.style.left = percentage;
    }
}

// Função para Slider Visual via Touch (Mobile)
function sliderHoverTouch(event, element) {
    const rect = element.getBoundingClientRect();
    let x = event.touches[0].clientX - rect.left;
    
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    
    const percentage = (x / rect.width) * 100 + '%';
    
    const imageAfter = element.querySelector('.image-after');
    const sliderVisual = element.querySelector('.slider-line-visual');
    
    if(imageAfter && sliderVisual) {
        imageAfter.style.clipPath = `polygon(${percentage} 0, 100% 0, 100% 100%, ${percentage} 100%)`;
        imageAfter.style.width = '100%'; /* Garante que a largura nunca diminua */
        sliderVisual.style.left = percentage;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll para os botões que levam à seção de preços (âncoras)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica do Accordion para o FAQ (Dúvidas Frequentes)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Fecha todos os outros
            faqItems.forEach(faq => faq.classList.remove('open'));
            
            // Se o clicado não estava aberto, abre ele
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Animação de Reveal no Scroll (Efeito Formação Design)
    const revealElements = document.querySelectorAll('.benefit-box, .objection-text, .before-after-slider, .feature-box, .module-card, .pricing-card, .guarantee-box, .stat, .authority-bio, .faq-item, .headline, .sub-headline');
    
    // Adiciona a classe base de reveal
    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Adiciona um pequeno delay baseado na posição se estiverem na mesma linha (grid)
        if (index % 4 === 1) el.classList.add('delay-1');
        if (index % 4 === 2) el.classList.add('delay-2');
        if (index % 4 === 3) el.classList.add('delay-3');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Opcional: Descomente a linha abaixo se quiser que a animação aconteça apenas uma vez
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Dispara quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});