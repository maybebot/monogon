export type SupportedModule = 'plaintext' | 'json' | 'yaml' | 'css';

export type Definition = {
  regex: RegExp;
  css: string;
};

export interface DefinitionMap {
  [key: string]: Definition;
}

export interface Module {
  definitions: DefinitionMap;
  format?: (content: string) => string;
}
