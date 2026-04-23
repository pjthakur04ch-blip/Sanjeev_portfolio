document.addEventListener('DOMContentLoaded', () => {
    // 1. Define all your pages here. If you add a new page, just add it to this list!
    const pages = [
        { name: 'HOME', url: 'index.html' },
        { name: 'PROJECTS', url: 'project.html' },
        { name: 'CONTACT', url: 'contactus.html' }
    ];

    // Get the current page filename
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Helper function to generate the navigation links
    const generateLinks = () => {
        return pages.map(page => {
            // Determine if this is the active page
            const isActive = currentPath === page.url || (currentPath === '' && page.url === 'index.html');
            const activeClass = isActive ? 'active' : '';
            return `<a class="nav-link ${activeClass}" href="${page.url}">${page.name}</a>`;
        }).join('\n            ');
    };

    // 2. Define the Header HTML
    const headerHTML = `
    <!-- TopNavBar -->
    <nav class="fixed top-0 w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 md:py-6 max-w-none bg-[#131313]/90 backdrop-blur-xl z-50 transition-all duration-300">
        <div class="text-lg sm:text-xl font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase z-50">SANJEEV_KUMAR</div>
        
        <div class="hidden md:flex items-center gap-6 lg:gap-10 font-['Epilogue'] font-bold tracking-tighter uppercase">
            ${generateLinks()}
        </div>
        
        <div class="flex items-center gap-4 z-50">
            <button class="hidden sm:inline-block btn-primary px-6 py-2.5 sm:px-8 sm:py-3">
                HIRE ME
            </button>
            <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center p-2 focus:outline-none">
                <span class="material-symbols-outlined text-3xl">menu</span>
            </button>
        </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div id="mobile-menu" class="fixed inset-0 bg-[#131313] z-40 hidden flex-col items-center justify-center gap-8 px-8 pt-[120px] opacity-0 transition-opacity duration-300 backdrop-blur-lg bg-opacity-95">
        <div class="flex flex-col items-center gap-8 font-['Epilogue'] text-3xl font-black tracking-tighter uppercase w-full">
            ${generateLinks()}
            <button class="btn-primary w-full max-w-xs py-4 mt-8">
                HIRE ME
            </button>
        </div>
    </div>
    `;

    // 3. Inject the Header into the page
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // 4. Initialize Mobile Menu Interactivity
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const icon = btn.querySelector('.material-symbols-outlined');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            if(menu.classList.contains('hidden')){
                menu.classList.remove('hidden');
                setTimeout(() => {
                    menu.classList.remove('opacity-0', 'pointer-events-none');
                    menu.classList.add('opacity-100', 'flex');
                }, 10);
                icon.textContent = 'close';
                document.body.style.overflow = 'hidden';
            } else {
                menu.classList.remove('opacity-100');
                menu.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    menu.classList.add('hidden');
                    menu.classList.remove('flex');
                }, 300);
                icon.textContent = 'menu';
                document.body.style.overflow = 'auto';
            }
        });
        
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('opacity-100');
                menu.classList.add('opacity-0', 'pointer-events-none');
                setTimeout(() => {
                    menu.classList.add('hidden');
                    menu.classList.remove('flex');
                }, 300);
                icon.textContent = 'menu';
                document.body.style.overflow = 'auto';
            });
        });
    }
});
