export function setupThemeToggle(buttonId) {
    const toggleButton = document.getElementById(buttonId);
    const htmlElement = document.documentElement;
    const DARK_MODE = 'dark';
    const LIGHT_MODE = 'light';
    const darkModeEnabled = localStorage.getItem('dark-mode') === 'true';

    htmlElement.setAttribute('data-bs-theme', darkModeEnabled ? DARK_MODE : LIGHT_MODE);

    if (toggleButton) {
        toggleButton.textContent = darkModeEnabled ? 'Light Mode' : 'Dark Mode';

        const handleToggle = () => {
            const newTheme = htmlElement.getAttribute('data-bs-theme') === DARK_MODE ? LIGHT_MODE : DARK_MODE;
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('dark-mode', newTheme === DARK_MODE);
            toggleButton.textContent = newTheme === DARK_MODE ? 'Light Mode' : 'Dark Mode';
        };

        toggleButton.addEventListener('click', handleToggle);

        return () => {
            toggleButton.removeEventListener('click', handleToggle);
        };
    }
}
