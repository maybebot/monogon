export type SupportedModule = 'plaintext' | 'json';

export interface Highlight {
  name: string;
  regex: RegExp;
  css: Partial<CSSStyleDeclaration>;
}

export interface Module {
  definitions: Highlight[];
  format?: (content: string) => string;
}
