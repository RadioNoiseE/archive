window.MathJax = {
    startup: {
        elements: ['span.math', 'div.math'],
    },
    loader: {
        load: ['ui/lazy'],
    },
    output: {
        font: 'mathjax-asana',
    },
    options: {
        enableMenu: false,
        menuOptions: {
            settings: {
                enrich: false,
            },
        },
    },
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: false,
        processEnvironments: false,
        processRefs: false,
    },
    svg: {
        fontCache: 'global',
        mtextInheritFont: false,
        merrorInheritFont: false,
    }
};(function () {
    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/tex-svg-nofont.js';
    script.async = true;
    document.head.appendChild(script);
})();
