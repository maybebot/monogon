import { transformModule } from './utils';
import { json } from './modules/json';
import type { SupportedModule } from './types';

const baseCss = ` * { box-sizing: border-box; }
  :host { display: inline-grid; white-space: pre-line; }
  pre { width: 100%; height: 100%; padding: 1em; margin: 0; background-color: #1f1f1f; }
  code { width: 100%; height: 100%; display: inline-block; outline: none; width: 100%; white-space: pre-line; }
`;

class MonogonEl extends HTMLElement {
  static observedAttributes = ['content', 'lang'];

  constructor() {
    super();
  }

  value = '';

  connectedCallback() {
    /** Structure */
    const shadow = this.attachShadow({ mode: 'open' });

    const preEl = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.setAttribute('contenteditable', 'plaintext-only');
    codeEl.setAttribute('spellcheck', 'false');
    shadow.appendChild(preEl);
    preEl.appendChild(codeEl);

    /** Module */
    const moduleName = (this.getAttribute('lang') as SupportedModule) ?? 'json';
    const moduleMap = {
      json: json,
    };
    const module = moduleMap[moduleName];

    const content = this.getAttribute('content') ?? '';
    this.value = content;

    codeEl.textContent = module.format ? module.format(content) : content;

    const definitions = transformModule(module.definitions, codeEl);
    const moduleCss = definitions.map((m) => m.css).join(' ');

    /** Style */
    const styleEl = document.createElement('style');
    styleEl.textContent = `${baseCss} ${moduleCss}`;

    shadow.appendChild(styleEl);

    /** Highlights */
    const applyHighlights = () => {
      definitions.forEach((highlight) => {
        highlight.apply();
      });
    };

    /** Listeners */
    codeEl.addEventListener('input', () => {
      codeEl.normalize();
      this.value = codeEl.textContent ?? '';
      applyHighlights();
    });
    applyHighlights();
  }
}

customElements.define('monogon-el', MonogonEl);

// @ts-expect-error preact not existing
declare module 'preact/jsx-runtime' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'monogon-el': MonogonElProps;
    }
  }
}

export interface TargetValueEvent extends Event {
  target: HTMLInputElement;
  currentTarget: HTMLInputElement;
}
interface MonogonProps {
  content: string;
  onInput?: (e: TargetValueEvent) => void;
}
// @ts-expect-error JSX not existing
export interface MonogonElProps extends Omit<JSX.HTMLAttributes, keyof MonogonProps>, MonogonProps {}
