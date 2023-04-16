import { Injectable } from '@nestjs/common';
import { Factory } from './factory';

@Injectable()
export class SeedService<T extends object = Record<string, Array<any>>> {
  seed(
    ...factories: Array<Factory<any>>
  ): (initialSeedResult?: Partial<T>) => Promise<T> {
    return (seedResult?: T): Promise<T> => {
      seedResult = seedResult ? { ...seedResult } : ({} as T);
      return factories.reduce(
        (promise, factory) => promise.then(factory.seed.bind(factory)),
        Promise.resolve(seedResult),
      );
    };
  }

  mergeSeedResults(...seedResults: Array<Partial<T>>): T {
    const mergedSeedResult = {} as T;
    const properties = Reflect.ownKeys(mergedSeedResult);

    properties.forEach((key) => {
      if (Array.isArray(mergedSeedResult[key])) {
        seedResults.forEach((seedResult) => {
          if (seedResult && seedResult[key]) {
            const uniqueValues = new Set([
              ...mergedSeedResult[key],
              ...seedResult[key],
            ]);
            mergedSeedResult[key] = Array.from(uniqueValues);
          }
        });
      }
    });

    return mergedSeedResult;
  }
}
