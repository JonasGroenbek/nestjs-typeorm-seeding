import { QueryRunner } from 'typeorm';

export type FactoryConfig<T> = {
  amount: number;
  specificProperties: Partial<T>;
  queryRunner?: QueryRunner;
};
