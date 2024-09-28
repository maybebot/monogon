export type SupportedModule = 'json';

export interface Highlight {
  name: string;
  regex: RegExp;
  css: Partial<CSSStyleDeclaration>;
}
