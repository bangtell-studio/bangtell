document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.classList.toggle('is-active'); // opsional untuk animasi X
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 2. SMOOTH REVEAL ON SCROLL (DIPERBAIKI)
    const revealItems = document.querySelectorAll('.portfolio-item, .product-card');
    
    if (revealItems.length > 0) {
        const observerOptions = {
            threshold: 0.15, // Ditingkatkan sedikit agar lebih sensitif
            rootMargin: '0px 0px 50px 0px' // Area deteksi diperluas ke bawah
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        revealItems.forEach(item => {
            // Kita pindahkan styling transisi ke CSS agar JS lebih ringan
            item.classList.add('reveal-item'); 
            observer.observe(item);
        });
    }

    // 3. ANIMASI SCROLL HALUS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                
                // Memberikan sedikit waktu jeda agar observer tidak kaget
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
});
