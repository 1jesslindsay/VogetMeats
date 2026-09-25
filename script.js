// Back to top
const backToTop = document.getElementById('back-to-top');
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

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
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
        .then(r => r.json())
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
        });
}
