import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UnitOfWork {
  constructor(private readonly sequelize: Sequelize) {}
  async run<T>(
    work: (transaction: Transaction) => Promise<T>,
    isolationLevel: Transaction.ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS
      .SERIALIZABLE,
  ): Promise<T> {
    const transaction = await this.sequelize.transaction({ isolationLevel });
    try {
      const result = await work(transaction);
      await transaction.commit();
      return result;
    } catch (error: any) {
      await transaction.rollback();
      throw error;
    }
  }
}
