import { ModuleOptions } from './module-options.interface';

export interface SeedOptionsFactory {
  createSeedOptions(): Promise<ModuleOptions> | ModuleOptions;
}
