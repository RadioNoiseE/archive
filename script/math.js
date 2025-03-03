window.MathJax = {
    startup: {
        elements: ['span.math', 'div.math'],
    },
    output: {
        font: 'mathjax-asana',
    },
    options: {
        enableMenu: false,
        enableEnrichment: false,
        enableComplexity: false,
        enableExplorer: false,
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
    script.src = '/script/tex-svg-nofont.js';
    script.async = true;
    document.head.appendChild(script);
})();
