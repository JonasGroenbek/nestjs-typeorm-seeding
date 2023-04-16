import { ModuleMetadata, Type } from '@nestjs/common';
import { SeedOptionsFactory } from './seed-options-factory.interface';
import { ModuleOptions } from './module-options.interface';

export interface SeedModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<SeedOptionsFactory>;
  useExisting?: Type<SeedOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<ModuleOptions> | ModuleOptions;
}
