const trigger = document.getElementById('toggle');
const overlay = document.getElementById('overlay');
const memoir = document.getElementById('memoir');

const toggle = (show) => {
    overlay.style.display = show ? 'block' : 'none';
    memoir.style.display = show ? 'block' : 'none';
    document.body.classList.toggle('idle', show);
};

trigger.addEventListener('click', () => toggle(true));
overlay.addEventListener('click', () => toggle(false));
