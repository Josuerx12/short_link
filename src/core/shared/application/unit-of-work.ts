import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class UnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  async run<T>(
    isolationLevel: 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE',
    work: (manager: EntityManager) => Promise<T>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction(isolationLevel);

      const result = await work(queryRunner.manager);

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
