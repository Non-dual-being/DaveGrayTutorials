const initApp = () => {
    const hamburgerOpenMenuButton = document.getElementById('hamburger-button') ?? null;
    const mobileNavMenu = document.getElementById('mobile-menu') ?? null;

    const toggleMobileMenu = () => {

        mobileNavMenu.classList.toggle('hidden');
        mobileNavMenu.classList.toggle('flex');
        hamburgerOpenMenuButton.classList.toggle('toggle-btn');
     
    }

    hamburgerOpenMenuButton.addEventListener('click', () => {toggleMobileMenu();});
    mobileNavMenu.addEventListener('click', () => {toggleMobileMenu()});

}

document.addEventListener('DOMContentLoaded', () => {
    initApp();
})

