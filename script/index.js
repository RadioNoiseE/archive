const triggers = document.querySelectorAll('.toggle');
const overlay = document.getElementById('overlay');
const frame = document.getElementById('buffer');

const toggle = show => {
        overlay.style.display = show ? 'block' : 'none';
        frame.style.display = show ? 'block' : 'none';
        document.body.classList.toggle('idle', show);
};

const transform = file => {
        Promise.all([
                fetch(file).then(response => response.text()),
                fetch('/build/atom.xsl').then(response => response.text())
        ]).then(([xml, xsl]) => {
                const parser = new DOMParser();
                const processor = new XSLTProcessor();
                processor.importStylesheet(parser.parseFromString(xsl, 'application/xml'));
                frame.srcdoc =
                        new XMLSerializer().serializeToString(
                                processor.transformToDocument(parser.parseFromString(xml, 'application/xml'))
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

overlay.addEventListener('click', () => toggle(false));
