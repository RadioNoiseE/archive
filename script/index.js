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
        fetch('/memoir.xml').then(r => r.text()),
        fetch('/build/atom.xsl').then(r => r.text())
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

trigger.addEventListener('click', () => toggle(true));
overlay.addEventListener('click', () => toggle(false));
document.addEventListener('DOMContentLoaded', transform);
