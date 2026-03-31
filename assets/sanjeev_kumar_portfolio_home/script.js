// Custom JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn?.querySelector('.material-symbols-outlined');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                // Open menu
                mobileMenu.classList.remove('hidden');
                // slight delay to allow display block to apply before opacity transition
                setTimeout(() => {
                    mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                    mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
                }, 10);
                if(mobileMenuIcon) mobileMenuIcon.textContent = 'close';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                // Close menu
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300); // match transition duration
                if(mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                if(mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
                document.body.style.overflow = '';
            });
        });
    }
});
