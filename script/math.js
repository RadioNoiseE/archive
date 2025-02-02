window.MathJax = {
    startup: {
        elements: ['span.math', 'div.math']
    },
    options: {
        enableMenu: false,
    },
    tex: {
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        processEscapes: false,
        processEnvironments: false,
        processRefs: false
    },
    svg: {
        fontCache: 'global'
    }
};(function () {
    var script = document.createElement('script');
    script.src = '/script/tex-svg.js';
    script.async = true;
    document.head.appendChild(script);
})();
