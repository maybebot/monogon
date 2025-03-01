import type { Module, SupportedModule } from './types.ts';
import { monoLog } from './utils.js';

const supportedModules: SupportedModule[] = ['plaintext', 'json', 'css'];

const moduleMap: Record<SupportedModule, () => Promise<{ default: Module }>> = {
  plaintext: () => import('./modules/plaintext.js'),
  json: () => import('./modules/json.js'),
  css: () => import('./modules/css.js'),
};

export const getModule = async (name: string): Promise<Module> => {
  // @ts-expect-error - name is user-defined, can be any string
  if (!supportedModules.includes(name)) {
    monoLog(`Language "${name}" not found, unable to process. Select a supported lang param`, true);
    monoLog(`Supported: ${supportedModules.toString()}`, true);
    const plaintext = await moduleMap['plaintext']();
    return plaintext.default;
  }
  const module = await moduleMap[name as SupportedModule]();
  if (!module) {
    monoLog(`Language "${name}" not found`);
    const plaintext = await moduleMap['plaintext']();
    return plaintext.default;
  }
  return module.default;
};
