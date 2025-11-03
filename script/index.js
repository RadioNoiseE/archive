const triggers = document.querySelectorAll('.toggle');
const overlay = document.getElementById('overlay');
const buffer = document.getElementById('buffer');

const toggle = show => {
    overlay.style.display = show ? 'block' : 'none';
    buffer.style.display = show ? 'block' : 'none';
    document.body.classList.toggle('idle', show);
};

const transform = file => {
    Promise.all([
        fetch(file).then(response => response.text()),
        fetch('/build/atom.xsl').then(response => response.text())
    ]).then(([xml, xsl]) => {
        const proc = new DOMParser();
        const xslt = new XSLTProcessor();
        xslt.importStylesheet(proc.parseFromString(xsl, 'application/xml'));
        buffer.srcdoc =
            new XMLSerializer().serializeToString(
                xslt.transformToDocument(proc.parseFromString(xml, 'application/xml'))
            );
    });
};

triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
        event.preventDefault();
        transform(trigger.getAttribute('href'));
        toggle(true);
    });
});

overlay.addEventListener('click', event => toggle(false));
