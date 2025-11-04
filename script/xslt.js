const userAgent = window.navigator.userAgent;
const ruleSet = [
        { vendor: 'Chrome', min: 0, max: Infinity, regex: /Chrome\/(\d+)/ },
        { vendor: 'Safari', min: 0, max: Infinity, regex: /Safari\/(\d+)/ },
        { vendor: 'Firefox', min: Infinity, regex: /Firefox\/(\d+)/ }
];

let match = ruleSet.map(rule => {
        const match = userAgent.match(rule.regex);
        return match ? { ...rule, version: +match[1] } : null;
}).find(Boolean);

if (!(match && match.version >= match.min && match.version <= match.max)) {
        const log = document.getElementById('warning');
        log.textContent = `Warning: ${match ? match.vendor + ' ' + match.version : 'unknown browser'} has known issues with XSLT.` +
                '\n\nLinks to articles have been redirected to their HTML mirrored versions.';

        document.querySelectorAll('a[href$=".xml"]').forEach(link => {
                const url = new URL(link.href, location.origin);
                if (url.pathname.startsWith('/article/')) {
                        url.hostname = 'cmp.' + url.hostname;
                        url.pathname = url.pathname.replace(/\.xml$/, '.html');
                        link.href = url.href;
                }
        })
}
