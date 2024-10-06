import type { Module, SupportedModule } from './types';
import { monoLog } from './utils';

const supportedModules: SupportedModule[] = ['plaintext', 'json', 'css'];

const moduleMap: Record<SupportedModule, () => Promise<{ default: Module }>> = {
  plaintext: () => import('./modules/plaintext'),
  json: () => import('./modules/json'),
  css: () => import('./modules/css'),
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
