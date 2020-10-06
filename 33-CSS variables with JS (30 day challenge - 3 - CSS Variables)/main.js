const color = document.getElementById('color');
const spacing = document.getElementById('spacing');
const blur = document.getElementById('blur');
const root = document.documentElement;

color.addEventListener('change', (e) => {
    root.style.setProperty('--primary-color', e.target.value);
})

spacing.addEventListener('change', (e) => {
    root.style.setProperty('--spacing', `${e.target.value*2}px`);
})

blur.addEventListener('change', (e) => {
    root.style.setProperty('--blur', `blur(${e.target.value}px)`);
})