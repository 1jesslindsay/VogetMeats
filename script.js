// Enable CSS transitions after initial paint (prevents dark mode flash on load)
document.documentElement.classList.add('ready');

// Keep footer copyright year current
const footerYear = document.getElementById('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// Back to top
const backToTop = document.createElement('button');
backToTop.type = 'button';
backToTop.className = 'back-to-top';
backToTop.id = 'back-to-top';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
document.body.appendChild(backToTop);
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.classList.toggle('open', isOpen);
});
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
    }
});

// Close mobile nav when tapping outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
    }
});

// Dark mode toggle (saves an explicit choice; otherwise the device setting is used)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    try { localStorage.setItem('theme', newTheme); } catch (e) {}
});

// Holiday banner: only shown October–December
const holidayBanner = document.getElementById('holiday-banner');
if (holidayBanner && new Date().getMonth() >= 9) {
    holidayBanner.hidden = false;
}

// FAQ: open the linked question when arriving via #anchor
const linked = window.location.hash && document.getElementById(window.location.hash.slice(1));
if (linked && linked.tagName === 'DETAILS') linked.open = true;

// Contact forms: submit to Formspree in the background and show the result inline
document.querySelectorAll('form[data-ajax]').forEach(form => {
    const status = form.querySelector('.form-status');
    const button = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        button.disabled = true;
        button.textContent = 'Sending…';
        status.hidden = true;
        status.classList.remove('form-status-error');

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' },
        })
            .then(r => {
                if (!r.ok) throw new Error('Request failed');
                form.reset();
                status.textContent = "Thanks! Your message was sent. We'll get back to you soon.";
            })
            .catch(() => {
                status.classList.add('form-status-error');
                status.innerHTML = 'Sorry, your message could not be sent. Please try again or call us at <a href="tel:+15039816271">(503) 981-6271</a>.';
            })
            .finally(() => {
                status.hidden = false;
                button.disabled = false;
                button.textContent = 'Send Message';
            });
    });
});

// Products page: fetch products and build grid + jump nav
const productContainer = document.getElementById('product-categories');
if (productContainer) {
    const categoryLabels = {
        'USDA Choice Beef Steaks and Roasts': 'Beef',
        'Pork Roasts Steaks and Chops': 'Pork',
        'Smoked Meats and Fresh Sausage': 'Smoked Meats & Sausage',
    };

    fetch('products.json')
        .then(r => {
            if (!r.ok) throw new Error('Request failed');
            return r.json();
        })
        .then(data => {
            const grouped = {};
            data.products.forEach(p => {
                const cat = p.category || 'Other';
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(p);
            });

            // Build jump nav dynamically
            const jumpNav = document.getElementById('products-jump-nav');
            if (jumpNav) {
                Object.keys(grouped).forEach(cat => {
                    const id = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    const label = categoryLabels[cat] || cat;
                    const a = document.createElement('a');
                    a.href = '#' + id;
                    a.className = 'jump-btn';
                    a.textContent = label;
                    jumpNav.appendChild(a);
                });
            }

            // Build product grid
            Object.entries(grouped).forEach(([cat, products]) => {
                const section = document.createElement('div');
                section.id = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                section.className = 'product-category-section' +
                    (cat === 'Pork Roasts Steaks and Chops' ? ' pork-section' : '') +
                    (cat === 'USDA Choice Beef Steaks and Roasts' ? ' beef-section' : '');
                section.innerHTML = `<h2 class="category-heading">${cat}</h2><div class="product-grid">${
                    products.map(p => `
                        <div class="product-card${p.available === false ? ' product-unavailable' : ''}">
                            ${p.available === false ? '<span class="unavailable-badge">Currently Unavailable</span>' : ''}
                            <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='images/Photo Coming Soon.webp'">
                            <div class="product-card-content">
                                <h3>${p.name}</h3>
                            </div>
                        </div>`).join('')
                }</div>`;
                productContainer.appendChild(section);
            });

            if (window.location.hash) {
                const target = document.querySelector(window.location.hash);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        })
        .catch(() => {
            const jumpNav = document.getElementById('products-jump-nav');
            if (jumpNav) jumpNav.style.display = 'none';
            productContainer.innerHTML = '<p class="products-error">Sorry, our product list didn\'t load. Please refresh the page, or call us at <a href="tel:+15039816271">(503) 981-6271</a> to ask about what we have in stock.</p>';
        });
}
