(function () {
    const page = window.location.pathname.split('/').pop() || 'index.html';

    const navItems = [
        { href: 'index.html',                  label: 'Home' },
        { href: 'about.html',                  label: 'About' },
        { href: 'products.html',               label: 'Products' },
        { href: 'custom-cutting.html',         label: 'Game Processing' },
        { href: 'custom-pork-processing.html', label: 'Pork Processing' },
        { href: 'faq.html',                    label: 'FAQ' },
        { href: 'contact.html',                label: 'Contact' },
    ];

    const fbSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>';
    const igSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>';

    // --- NAV ---
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
        <nav class="navbar">
            <div class="logo">
                <a href="index.html"><img src="images/Voget_Logo_Small.png" alt="Voget Meats Logo" width="111" height="70"></a>
            </div>
            <ul class="nav-links" id="nav-links">
                ${navItems.map(n => `<li><a href="${n.href}"${page === n.href ? ' class="active"' : ''}>${n.label}</a></li>`).join('\n                ')}
            </ul>
            <div class="navbar-right">
                <div class="social-links">
                    <a href="https://www.facebook.com/VogetMeats1" target="_blank" rel="noopener" aria-label="Facebook">${fbSvg}</a>
                    <a href="https://www.instagram.com/vogetmeats/" target="_blank" rel="noopener" aria-label="Instagram">${igSvg}</a>
                </div>
                <button type="button" class="hamburger" id="hamburger" aria-label="Toggle navigation" aria-expanded="false">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>`;
    }

    // --- FOOTER ---
    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-center">
                    <div class="footer-social">
                        <a href="https://www.facebook.com/VogetMeats1" target="_blank" rel="noopener" aria-label="Facebook">${fbSvg}</a>
                        <a href="https://www.instagram.com/vogetmeats/" target="_blank" rel="noopener" aria-label="Instagram">${igSvg}</a>
                    </div>
                    <p>&copy; ${new Date().getFullYear()} Voget Meats. All rights reserved.</p>
                </div>
                <div class="footer-right">
                    <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                        <svg class="moon-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <svg class="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <span class="theme-label-dark">Dark</span>
                        <span class="theme-label-light">Light</span>
                    </button>
                </div>
            </div>
        </div>`;
    }

    // --- BACK TO TOP ---
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top';
    btn.id = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
    document.body.appendChild(btn);
})();
