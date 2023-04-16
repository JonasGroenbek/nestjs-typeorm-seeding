import { Test } from '@nestjs/testing';
import { ModuleOptions } from './interfaces/module-options.interface';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

const options: ModuleOptions = {};

describe('SageIdModule', () => {
  describe('register', () => {
    describe('when the `register` option is used', () => {
      it('should provide the SageIdService', async () => {
        const module = await Test.createTestingModule({
          imports: [SeedModule.register(options)],
        }).compile();

        const sageClient = module.get<SeedModule>(SeedService);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(SeedService);
      });
    });
  });

  describe('registerAsync', () => {
    describe('when the `useFactory` option is used', () => {
      it('should provide the SageIdService', async () => {
        const module = await Test.createTestingModule({
          imports: [
            SeedModule.registerAsync({
              useFactory: () => options,
            }),
          ],
        }).compile();

        const sageClient = module.get<SeedService>(SeedService);
        expect(sageClient).toBeDefined();
        expect(sageClient).toBeInstanceOf(SeedService);
      });
    });
  });
});
