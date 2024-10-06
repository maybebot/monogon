import type { Module, SupportedModule } from './types';
import { monoLog } from './utils';

const moduleMap: Record<SupportedModule, () => Promise<{ default: Module }>> = {
  plaintext: () => import('./modules/plaintext'),
  json: () => import('./modules/json'),
};

export const getModule = async (name: SupportedModule): Promise<Module> => {
  const module = await moduleMap[name]();
  if (!module) {
    monoLog(`Language "${name}" not found`);
    const plaintext = await moduleMap['plaintext']();
    return plaintext.default;
  }
  return module.default;
};
