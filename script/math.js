window.MathJax = {
    startup: { elements: ['span.math', 'div.math'] },
    loader: { load: ['ui/lazy'] },
    output: { font: 'mathjax-modern' },
    options: {
        enableMenu: false,
        menuOptions: { settings: { enrich: false } }
    },
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: false,
        processEnvironments: false,
        processRefs: false
    },
    svg: {
        fontCache: 'global',
        mtextInheritFont: false,
        merrorInheritFont: false
    }
};

document.head.appendChild(Object.assign(document.createElement('script'), {
    src: 'https://cdn.jsdelivr.net/npm/mathjax/tex-svg-nofont.js',
    async: true
}));
