const loadScript = source => new Promise((resolve, reject) =>
    Object.assign(document.head.appendChild(
        Object.assign(document.createElement('script'), { src: source })
    ), { onload: resolve, onerror: reject }));

const processListing = listing => {
    const raw = [...listing.querySelectorAll('code')];
    const lang = raw[0].className.match(/lang-(\w+)/)?.[1];
    const list = raw.map(line => line.textContent).join('\n');
    loadScript(`https://cdn.jsdelivr.net/npm/prismjs@1.30.0/components/prism-${lang}.min.js`)
        .then(() => {
            const lines = Prism.highlight(list, Prism.languages[lang], lang).split('\n');
            raw.forEach((line, index) => {
                const parent = line.parentNode;
                parent.innerHTML = parent.innerHTML.replace(line.outerHTML, `<code>${lines[index]}</code>`);
            });
        });
};

(async () => {
    await loadScript('https://cdn.jsdelivr.net/npm/prismjs@1.30.0/prism.min.js');
    document.querySelectorAll('pre').forEach(processListing);
})();
