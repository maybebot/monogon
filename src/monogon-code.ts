import { transformModule } from './utils.js';
import type { SupportedModule } from './types.ts';
import { getModule } from './modules.js';
import { css } from './theme.js';

class MonogonCode extends HTMLElement {
  static observedAttributes = ['content', 'lang'];

  constructor() {
    super();
  }

  value = '';

  codeEl: HTMLElement | null = null;
  styleEl: HTMLStyleElement | null = null;

  applyHighlights = () => {};

  async connectedCallback() {
    this.prepare();
    this.refresh();
  }

  async attributeChangedCallback(oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue) {
      await this.refresh();
    }
  }

  async prepare() {
    const shadow = this.shadowRoot || this.attachShadow({ mode: 'open' });
    shadow.innerHTML = '';

    /** Style */
    const themeStyleEl = document.createElement('style');
    themeStyleEl.textContent = css;
    shadow.appendChild(themeStyleEl);

    const preEl = document.createElement('pre');
    const codeEl = document.createElement('code');
    codeEl.setAttribute('contenteditable', 'plaintext-only');
    codeEl.setAttribute('spellcheck', 'false');
    shadow.appendChild(preEl);
    preEl.appendChild(codeEl);

    /** Listeners */
    codeEl.addEventListener('input', () => {
      this.codeEl!.normalize();
      this.value = this.codeEl!.textContent ?? '';
      this.applyHighlights();
    });

    this.codeEl = codeEl;
    this.styleEl = themeStyleEl;
  }

  async refresh() {
    /** Module */
    const moduleName = this.getAttribute('lang') ?? 'plaintext';
    const module = await getModule(moduleName);
    const content = this.getAttribute('content') ?? '';
    this.value = content;

    this.codeEl!.textContent = module.format ? module.format(content) : content;

    const definitions = transformModule(module.definitions, this.codeEl!);
    const moduleCss = definitions.map((m) => m.css).join(' ');

    /** Highlights */
    this.styleEl!.textContent += `${moduleCss}`;

    this.applyHighlights = () => {
      definitions.forEach((highlight) => {
        highlight.apply();
      });
    };
    this.applyHighlights();
  }
}
if (!customElements.get('monogon-code')) customElements.define('monogon-code', MonogonCode);

// @ts-expect-error preact not existing
declare module 'preact/jsx-runtime' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'monogon-code': MonogonCodeProps;
    }
  }
}

export interface TargetValueEvent extends Event {
  target: HTMLInputElement;
  currentTarget: HTMLInputElement;
}
interface MonogonProps {
  content: string;
  lang: SupportedModule;
  onInput?: (e: TargetValueEvent) => void;
}
// @ts-expect-error JSX not existing
export interface MonogonCodeProps extends Omit<JSX.HTMLAttributes, keyof MonogonProps>, MonogonProps {}
