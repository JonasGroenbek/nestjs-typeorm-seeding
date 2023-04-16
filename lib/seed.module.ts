import { DynamicModule, Module, Provider } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { SeedService } from './seed.service';
import { ModuleOptions } from './interfaces/module-options.interface';
import { SEED_CONFIG, SEED_MODULE, SEED_MODULE_OPTIONS } from './constants';
import { SeedModuleAsyncOptions } from './interfaces/seed-module-asyn-options.interface';
import { SeedOptionsFactory } from './interfaces/seed-options-factory.interface';

@Module({
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {
  static register(config: ModuleOptions): DynamicModule {
    return {
      module: SeedModule,
      providers: [
        {
          provide: SEED_CONFIG,
          useValue: config,
        },
      ],
    };
  }

  static registerAsync(options: SeedModuleAsyncOptions): DynamicModule {
    return {
      module: SeedModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        {
          provide: SEED_CONFIG,
          useFactory: (config: SeedOptionsFactory) => config,
          inject: [SEED_MODULE_OPTIONS],
        },
        {
          provide: SEED_MODULE,
          useValue: randomStringGenerator(),
        },
      ],
    };
  }

  private static createAsyncProviders(
    options: SeedModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: SeedModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: SEED_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: SEED_MODULE_OPTIONS,
      useFactory: async (optionsFactory: SeedOptionsFactory) =>
        optionsFactory.createSeedOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
