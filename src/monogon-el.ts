import { transformModule } from './utils';
import { json } from './modules/json';
import type { SupportedModule } from './types';

class MonogonEl extends HTMLElement {
  static observedAttributes = ['content', 'lang'];

  constructor() {
    super();
  }

  connectedCallback() {
    /** Structure */
    const shadow = this.attachShadow({ mode: 'open' });

    const preEl = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.setAttribute('contenteditable', 'plaintext-only');
    codeEl.setAttribute('spellcheck', 'false');
    shadow.appendChild(preEl);
    preEl.appendChild(codeEl);

    codeEl.textContent = this.getAttribute('content');

    /** Module */
    const moduleName = (this.getAttribute('lang') as SupportedModule) ?? 'json';
    const moduleMap = {
      json: json,
    };
    const module = transformModule(moduleMap[moduleName], codeEl);
    const moduleCss = module.map((m) => m.css).join(' ');

    /** Style */
    const styleEl = document.createElement('style');
    const baseCss = `pre { margin: 0; background-color: #666; }`;
    styleEl.textContent = `${baseCss} ${moduleCss}`;

    shadow.appendChild(styleEl);

    /** Highlights */
    const applyHighlights = () => {
      module.forEach((highlight) => {
        highlight.apply();
      });
    };

    /** Listeners */
    codeEl.addEventListener('input', () => {
      applyHighlights();
    });
    applyHighlights();
  }
}

customElements.define('monogon-el', MonogonEl);
