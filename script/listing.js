import { codeToHtml } from 'https://esm.sh/shiki@3.0.0';

const highlight = async listing => {
    const line = Array.from(listing.querySelectorAll('code'));
    const wrap = Array.from(Object.assign(document.createElement('div'), {
        innerHTML: await codeToHtml(line.map(line => line.textContent).join('\n'), {
            lang: listing.className.trim(),
            theme: 'github-light'
        })
    }).querySelectorAll('.line')).map(span => span.innerHTML);

    line.forEach((line, offset) => {
        line.replaceChildren(...Object.assign(document.createElement('template'), {
            innerHTML: wrap[offset]
        }).content.childNodes);
    });
};

document.addEventListener('DOMContentLoaded', () => document.querySelectorAll('pre').forEach(highlight));
