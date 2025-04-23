const trigger = document.getElementById('toggle');
const overlay = document.getElementById('overlay');
const memoir = document.getElementById('memoir');

const toggle = show => {
    overlay.style.display = show ? 'block' : 'none';
    memoir.style.display = show ? 'block' : 'none';
    document.body.classList.toggle('idle', show);
};

const transform = () => {
    Promise.all([
        fetch('/memoir.xml').then(response => response.text()),
        fetch('/build/atom.xsl').then(response => response.text())
    ]).then(([xml, xsl]) => {
        const proc = new DOMParser();
        const xslt = new XSLTProcessor();
        xslt.importStylesheet(proc.parseFromString(xsl, 'application/xml'));
        document.getElementById("memoir").srcdoc =
            new XMLSerializer().serializeToString(
                xslt.transformToDocument(proc.parseFromString(xml, 'application/xml'))
            );
    });
};

trigger.addEventListener('click', (event) => { event.preventDefault(); toggle(true); });
overlay.addEventListener('click', (event) => { event.preventDefault(); toggle(false); });
document.addEventListener('DOMContentLoaded', transform);
