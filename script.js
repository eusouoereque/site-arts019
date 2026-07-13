// Script para a Landing Page (Design focado no textos.pdf com efeitos extras)

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

            faqItems.forEach(faq => {
                faq.classList.remove('open');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                item.classList.add('open');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Animação de Reveal no Scroll (Efeito Formação Design)
    const revealElements = document.querySelectorAll('.benefit-box, .objection-text, .showcase-video-wrap, .pricing-card, .guarantee-box, .stat, .authority-bio, .faq-item');
    
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
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15, // Dispara quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Meta Pixel: InitiateCheckout ao clicar nos botões que levam ao checkout da Kiwify
    const checkoutPlans = {
        'qNPivr8': { id: 'plano-mensal', value: 24.99 },
        '8eoAQaG': { id: 'plano-anual', value: 180.00 }
    };

    document.querySelectorAll('a[href*="pay.kiwify.com.br"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof fbq !== 'function') return;
            const plan = checkoutPlans[link.getAttribute('href').split('/').pop()];
            if (!plan) return;
            fbq('track', 'InitiateCheckout', {
                content_ids: [plan.id],
                value: plan.value,
                currency: 'BRL'
            });
        });
    });

    // Respeita a preferência de movimento reduzido: não dá autoplay nos vídeos
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Play/pause showcase videos com base na visibilidade (evita autoplay simultâneo fora da tela)
    const videoPlayObserver = new IntersectionObserver((entries) => {
        if (prefersReducedMotion) return;
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (!video) return;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.showcase-video-wrap').forEach(wrap => videoPlayObserver.observe(wrap));

    // Play/pause do vídeo de objeção com base na visibilidade
    const objectionVideo = document.querySelector('.objection-video');
    if (objectionVideo && !prefersReducedMotion) {
        const objectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    objectionVideo.play().catch(() => {});
                } else {
                    objectionVideo.pause();
                }
            });
        }, { threshold: 0.3 });
        objectionObserver.observe(objectionVideo);
    }

    // Play/pause do vídeo do logo (seção Autoridade) com base na visibilidade
    const authorVideo = document.querySelector('.author-video');
    if (authorVideo && !prefersReducedMotion) {
        const authorVideoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    authorVideo.play().catch(() => {});
                } else {
                    authorVideo.pause();
                }
            });
        }, { threshold: 0.3 });
        authorVideoObserver.observe(authorVideo);
    }
});