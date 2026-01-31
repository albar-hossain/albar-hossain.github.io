// Intersection Observer for reveal animations
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

// Add revealing animation classes
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.expertise-card, .project-card, .timeline-item, .mission-body, .section-header, .tool-card, .section-header-centered');

    // Add initial styles for reveal
    const style = document.createElement('style');
    style.textContent = `
        .expertise-card, .project-card, .timeline-item, .mission-body, .section-header, .tool-card, .section-header-centered {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    revealElements.forEach(el => observer.observe(el));

    // Dynamic color shifting for neon aura (optional subtle effect)
    const aura = document.querySelector('.violet-aura');
    if (aura) {
        let hue = 270; // Start at purple
        setInterval(() => {
            hue = (hue + 1) % 360;
            // Limit to purple/violet range if desired: 260-310
            if (hue < 260 || hue > 310) hue = 260;
            aura.style.background = `radial-gradient(circle, hsla(${hue}, 90%, 60%, 0.4) 0%, transparent 70%)`;
        }, 100);
    }
});

// Counter animation for metrics
const metrics = document.querySelectorAll('.metric-number');
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const targetValue = parseInt(target.innerText.replace('+', ''));
            let current = 0;
            const increment = targetValue / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= targetValue) {
                    target.innerText = targetValue + (target.innerText.includes('+') ? '+' : '');
                    clearInterval(interval);
                } else {
                    target.innerText = Math.floor(current) + (target.innerText.includes('+') ? '+' : '');
                }
            }, 30);
            metricsObserver.unobserve(target);
        }
    });
}, revealOptions);

metrics.forEach(m => metricsObserver.observe(m));

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme);
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});
