import { QueryRunner } from 'typeorm';
import { FactoryConfig } from './interfaces/factory-config.interface';

const initialConfig = {
  amount: 1,
  specificProperties: {},
} as const;

export abstract class Factory<E> {
  private config: FactoryConfig<E> = initialConfig;

  constructor() {
    this.config = { ...initialConfig };
  }

  reset(): Factory<E> {
    this.config = { ...initialConfig };
    return this;
  }

  configure(config: Partial<FactoryConfig<E>>): Factory<E> {
    this.config = Object.assign(this.config, config);
    return this;
  }

  getConfig(): FactoryConfig<E> {
    return this.config;
  }

  queryRunner(queryRunner: QueryRunner): Factory<E> {
    this.configure({ queryRunner });
    return this;
  }

  amount(amount: number): Factory<E> {
    this.configure({ amount });
    return this;
  }

  specificProperties(properties: Partial<Record<keyof E, any>>): Factory<E> {
    this.configure({ specificProperties: properties });
    return this;
  }

  getRandomIdFromArray(array: any[]) {
    if (!array?.length) return null;
    return array[Math.floor(Math.random() * array.length)].id;
  }

  assignOrMerge(array1: any[], array2?: any[]) {
    return array2 ? [...array1, ...array2] : array1;
  }

  /**
   * Should be overridden by subclasses
   * @param seedResult
   */
  make(): Array<E> {
    throw new Error('Not implemented');
  }

  async seed(seedResult: Partial<any> = {}): Promise<Partial<any>> {
    throw new Error('Not implemented');
  }
}
